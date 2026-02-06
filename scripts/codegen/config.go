package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type contentConfig struct {
	Site             siteConfig                  `json:"site"`
	FeaturedProjects []featuredProject           `json:"featuredProjects"`
	Technologies     map[string][]technologyItem `json:"technologies"`
}

type siteConfig struct {
	Domain                   string       `json:"domain"`
	Nickname                 string       `json:"nickname"`
	Title                    string       `json:"title"`
	AvatarSourceURL          string       `json:"avatarSourceUrl"`
	AvatarThumbnailSourceURL string       `json:"avatarThumbnailSourceUrl"`
	Social                   socialConfig `json:"social"`
}

type socialConfig struct {
	GitHub    string `json:"github"`
	Reddit    string `json:"reddit"`
	Twitter   string `json:"twitter"`
	Npm       string `json:"npm"`
	Packagist string `json:"packagist"`
}

type featuredProject struct {
	Title string `json:"title"`
	Icon  string `json:"icon"`
}

type technologyItem struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
}

func loadContentConfig(path string) (*contentConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read content config: %w", err)
	}

	var cfg contentConfig
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("decode content config: %w", err)
	}

	if err := validateConfigBasics(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

func validateConfigBasics(cfg *contentConfig) error {
	if cfg.Site.Domain == "" {
		return fmt.Errorf("content config: site.domain is required")
	}
	if cfg.Site.Nickname == "" {
		return fmt.Errorf("content config: site.nickname is required")
	}
	if cfg.Site.Title == "" {
		return fmt.Errorf("content config: site.title is required")
	}
	if cfg.Site.AvatarSourceURL == "" {
		return fmt.Errorf("content config: site.avatarSourceUrl is required")
	}
	if cfg.Site.AvatarThumbnailSourceURL == "" {
		return fmt.Errorf("content config: site.avatarThumbnailSourceUrl is required")
	}
	return nil
}
