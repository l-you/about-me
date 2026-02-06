package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type runMode string

const (
	modeAll      runMode = "all"
	modeGenerate runMode = "generate"
	modeValidate runMode = "validate"
)

type options struct {
	mode          runMode
	offline       bool
	refreshRemote bool
}

type generator struct {
	root          string
	cfg           *contentConfig
	httpClient    *http.Client
	offline       bool
	refreshRemote bool
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "codegen failed: %v\n", err)
		os.Exit(1)
	}
}

func run() error {
	opts, err := parseOptions(os.Args[1:])
	if err != nil {
		return err
	}

	root, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("resolve working directory: %w", err)
	}

	cfg, err := loadContentConfig(filepath.Join(root, "config", "content.json"))
	if err != nil {
		return err
	}

	gen := &generator{
		root: root,
		cfg:  cfg,
		httpClient: &http.Client{
			Timeout: 20 * time.Second,
		},
		offline:       opts.offline,
		refreshRemote: opts.refreshRemote,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
	defer cancel()

	switch opts.mode {
	case modeGenerate:
		return gen.generate(ctx)
	case modeValidate:
		return gen.validate()
	case modeAll:
		if err := gen.generate(ctx); err != nil {
			return err
		}
		return gen.validate()
	default:
		return fmt.Errorf("unsupported mode %q", opts.mode)
	}
}

func parseOptions(args []string) (options, error) {
	opts := options{mode: modeAll}

	if len(args) > 0 {
		switch runMode(args[0]) {
		case modeAll, modeGenerate, modeValidate:
			opts.mode = runMode(args[0])
			args = args[1:]
		}
	}

	fs := flag.NewFlagSet("codegen", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	fs.BoolVar(&opts.offline, "offline", false, "disallow network fetches")
	fs.BoolVar(&opts.refreshRemote, "refresh-remote", false, "redownload icons and avatars even when present")

	if err := fs.Parse(args); err != nil {
		return options{}, usageError(err)
	}

	if fs.NArg() > 0 {
		return options{}, usageError(fmt.Errorf("unexpected arguments: %v", fs.Args()))
	}

	if opts.offline && opts.refreshRemote {
		return options{}, errors.New("cannot set both --offline and --refresh-remote")
	}

	return opts, nil
}

func usageError(cause error) error {
	return fmt.Errorf(
		"%w\nusage: go run ./scripts/codegen [all|generate|validate] [--offline] [--refresh-remote]",
		cause,
	)
}

func (g *generator) generate(ctx context.Context) error {
	if err := g.generateIcons(ctx); err != nil {
		return err
	}
	if err := g.downloadAvatars(ctx); err != nil {
		return err
	}
	if err := g.generateAssets(); err != nil {
		return err
	}
	return nil
}
