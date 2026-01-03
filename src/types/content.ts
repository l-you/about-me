/**
 * TypeScript types for content configuration
 */

export interface Technology {
	name: string
	icon: string
}

export type TechnologyCategories = Record<string, Technology[]>

export interface FeaturedProject {
	title: string
	description: string
	stars?: number
	language?: string
	icon?: string
	href: string
}

export interface SocialLinks {
	github: string
	githubOrg?: string
	twitter: string
	reddit: string
	npm?: string
	packagist?: string
}

export interface SiteConfig {
	domain: string
	nickname: string
	alternateName?: string[]
	email: string
	avatarUrl: string
	avatarThumbnailUrl: string
	title: string
	description: string
	jobTitle: string
	location: string
	websiteUrl?: string
	blogUrl?: string
	social: SocialLinks
}

export interface ContentConfig {
	site: SiteConfig
	featuredProjects: FeaturedProject[]
	technologies: TechnologyCategories
}
