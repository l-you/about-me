package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
)

func (g *generator) downloadAvatars(ctx context.Context) error {
	fmt.Println("[codegen] syncing avatar images")

	targets := []struct {
		sourceURL string
		output    string
	}{
		{sourceURL: g.cfg.Site.AvatarSourceURL, output: filepath.Join(g.root, "public", "avatar.png")},
		{sourceURL: g.cfg.Site.AvatarThumbnailSourceURL, output: filepath.Join(g.root, "public", "avatar-thumbnail.png")},
	}

	for _, target := range targets {
		if target.sourceURL == "" {
			return fmt.Errorf("avatar source URL is empty for %s", filepath.Base(target.output))
		}

		if !g.refreshRemote {
			if _, err := os.Stat(target.output); err == nil {
				continue
			} else if !errors.Is(err, os.ErrNotExist) {
				return fmt.Errorf("stat %s: %w", target.output, err)
			}
		}

		if g.offline {
			return fmt.Errorf("missing %s and --offline is set", filepath.Base(target.output))
		}

		data, err := g.fetchURL(ctx, target.sourceURL, 8<<20)
		if err != nil {
			return fmt.Errorf("download %s: %w", target.sourceURL, err)
		}

		if err := writeFileAtomically(target.output, data, 0o644); err != nil {
			return fmt.Errorf("write %s: %w", target.output, err)
		}

		fmt.Printf("[codegen] downloaded %s\n", filepath.Base(target.output))
	}

	return nil
}
