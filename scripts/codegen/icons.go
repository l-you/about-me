package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

const (
	iconsDirRel       = "public/icons"
	iconsTypeFileRel  = "src/types/icons.ts"
	maxSVGDownloadLen = 4 << 20
)

func (g *generator) generateIcons(ctx context.Context) error {
	fmt.Println("[codegen] generating icons and icon types")

	iconsDir := filepath.Join(g.root, iconsDirRel)
	if err := os.MkdirAll(iconsDir, 0o755); err != nil {
		return fmt.Errorf("create icons directory: %w", err)
	}

	requiredIcons := g.collectRequiredIcons()
	if err := g.ensureIcons(ctx, iconsDir, requiredIcons); err != nil {
		return err
	}

	availableIcons, err := listIconNames(iconsDir)
	if err != nil {
		return err
	}
	if len(availableIcons) == 0 {
		return fmt.Errorf("no icons found in %s", iconsDirRel)
	}

	content := renderIconTypes(availableIcons)
	if err := writeFileAtomically(filepath.Join(g.root, iconsTypeFileRel), []byte(content), 0o644); err != nil {
		return fmt.Errorf("write icon types file: %w", err)
	}

	fmt.Printf("[codegen] icon types updated (%d icons)\n", len(availableIcons))
	return nil
}

func (g *generator) collectRequiredIcons() []string {
	seen := make(map[string]struct{})

	for _, technologies := range g.cfg.Technologies {
		for _, tech := range technologies {
			icon := strings.TrimSpace(tech.Icon)
			if icon != "" {
				seen[icon] = struct{}{}
			}
		}
	}

	for _, project := range g.cfg.FeaturedProjects {
		icon := strings.TrimSpace(project.Icon)
		if icon != "" {
			seen[icon] = struct{}{}
		}
	}

	icons := make([]string, 0, len(seen))
	for icon := range seen {
		icons = append(icons, icon)
	}
	sort.Strings(icons)
	return icons
}

func (g *generator) ensureIcons(ctx context.Context, iconsDir string, icons []string) error {
	for _, icon := range icons {
		iconPath := filepath.Join(iconsDir, icon+".svg")
		if !g.refreshRemote {
			if _, err := os.Stat(iconPath); err == nil {
				continue
			} else if !errors.Is(err, os.ErrNotExist) {
				return fmt.Errorf("stat icon %q: %w", icon, err)
			}
		}

		if g.offline {
			return fmt.Errorf("missing icon %q and --offline is set", icon)
		}

		fmt.Printf("[codegen] fetching icon: %s\n", icon)
		svgData, err := g.fetchIconSVG(ctx, icon)
		if err != nil {
			return err
		}
		if err := writeFileAtomically(iconPath, svgData, 0o644); err != nil {
			return fmt.Errorf("write icon %q: %w", icon, err)
		}
	}
	return nil
}

func (g *generator) fetchIconSVG(ctx context.Context, icon string) ([]byte, error) {
	urls := []string{
		fmt.Sprintf("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/%s/%s-original.svg", icon, icon),
		fmt.Sprintf("https://cdn.simpleicons.org/%s", icon),
	}

	var lastErr error
	for _, url := range urls {
		data, err := g.fetchURL(ctx, url, maxSVGDownloadLen)
		if err != nil {
			lastErr = err
			continue
		}
		if !isLikelySVG(data) {
			lastErr = fmt.Errorf("response from %s is not svg", url)
			continue
		}
		return data, nil
	}

	if lastErr == nil {
		lastErr = fmt.Errorf("no icon source available")
	}
	return nil, fmt.Errorf("fetch icon %q: %w", icon, lastErr)
}

func listIconNames(iconsDir string) ([]string, error) {
	entries, err := os.ReadDir(iconsDir)
	if err != nil {
		return nil, fmt.Errorf("read icons directory: %w", err)
	}

	icons := make([]string, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		name := entry.Name()
		if !strings.HasSuffix(name, ".svg") {
			continue
		}
		icons = append(icons, strings.TrimSuffix(name, ".svg"))
	}

	sort.Strings(icons)
	return icons, nil
}

func renderIconTypes(iconNames []string) string {
	var b strings.Builder

	b.WriteString("/**\n")
	b.WriteString(" * Auto-generated icon types from /public/icons directory\n")
	b.WriteString(" * DO NOT EDIT MANUALLY - Run 'go run ./scripts/codegen' to regenerate\n")
	b.WriteString(" */\n\n")

	b.WriteString("export const AVAILABLE_ICONS = [\n")
	for _, icon := range iconNames {
		b.WriteString(fmt.Sprintf("\t'%s',\n", icon))
	}
	b.WriteString("] as const\n\n")

	b.WriteString("export type IconName = typeof AVAILABLE_ICONS[number]\n\n")
	b.WriteString("export const iconMap: Record<IconName, string> = {\n")
	for _, icon := range iconNames {
		b.WriteString(fmt.Sprintf("\t'%s': '/icons/%s.svg',\n", icon, icon))
	}
	b.WriteString("}\n\n")

	b.WriteString("export function isValidIconName(name: string): name is IconName {\n")
	b.WriteString("\treturn AVAILABLE_ICONS.includes(name as IconName)\n")
	b.WriteString("}\n")

	return b.String()
}

func (g *generator) fetchURL(ctx context.Context, url string, limit int64) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	resp, err := g.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status %d", resp.StatusCode)
	}

	reader := io.LimitReader(resp.Body, limit)
	data, err := io.ReadAll(reader)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func isLikelySVG(data []byte) bool {
	trimmed := bytes.TrimSpace(data)
	if len(trimmed) == 0 {
		return false
	}
	return bytes.Contains(bytes.ToLower(trimmed), []byte("<svg"))
}
