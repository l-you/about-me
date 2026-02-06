package main

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
)

func (g *generator) validate() error {
	fmt.Println("[codegen] validating content configuration")

	iconsDir := filepath.Join(g.root, iconsDirRel)
	availableIcons, err := listIconNames(iconsDir)
	if err != nil {
		return err
	}

	availableSet := make(map[string]struct{}, len(availableIcons))
	for _, icon := range availableIcons {
		availableSet[icon] = struct{}{}
	}

	usedIcons := g.collectRequiredIcons()
	invalidRefs := g.findInvalidIconRefs(availableSet)
	unusedIcons := findUnusedIcons(availableIcons, usedIcons)

	if len(unusedIcons) > 0 {
		fmt.Println("[codegen] unused icons:")
		for _, icon := range unusedIcons {
			fmt.Printf("  - %s.svg\n", icon)
		}
	}

	if len(invalidRefs) > 0 {
		for _, ref := range invalidRefs {
			fmt.Fprintf(os.Stderr, "invalid icon %q in %s\n", ref.icon, ref.context)
		}
		return fmt.Errorf("validation failed with %d invalid icon references", len(invalidRefs))
	}

	fmt.Printf("[codegen] validation passed: projects=%d technologies=%d icons=%d used=%d\n",
		len(g.cfg.FeaturedProjects), countTechnologies(g.cfg.Technologies), len(availableIcons), len(usedIcons),
	)
	return nil
}

type invalidIconRef struct {
	icon    string
	context string
}

func (g *generator) findInvalidIconRefs(available map[string]struct{}) []invalidIconRef {
	refs := make([]invalidIconRef, 0)

	for category, technologies := range g.cfg.Technologies {
		for _, tech := range technologies {
			if tech.Icon == "" {
				continue
			}
			if _, ok := available[tech.Icon]; !ok {
				refs = append(refs, invalidIconRef{
					icon:    tech.Icon,
					context: fmt.Sprintf("technologies.%s.%s", category, tech.Name),
				})
			}
		}
	}

	for _, project := range g.cfg.FeaturedProjects {
		if project.Icon == "" {
			continue
		}
		if _, ok := available[project.Icon]; !ok {
			refs = append(refs, invalidIconRef{
				icon:    project.Icon,
				context: fmt.Sprintf("project.%s", project.Title),
			})
		}
	}

	return refs
}

func findUnusedIcons(availableIcons, usedIcons []string) []string {
	usedSet := make(map[string]struct{}, len(usedIcons))
	for _, icon := range usedIcons {
		usedSet[icon] = struct{}{}
	}

	unused := make([]string, 0)
	for _, icon := range availableIcons {
		if _, ok := usedSet[icon]; !ok {
			unused = append(unused, icon)
		}
	}
	sort.Strings(unused)
	return unused
}

func countTechnologies(categories map[string][]technologyItem) int {
	total := 0
	for _, items := range categories {
		total += len(items)
	}
	return total
}
