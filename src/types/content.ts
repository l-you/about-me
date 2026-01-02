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

export interface ContentConfig {
	featuredProjects: FeaturedProject[]
	technologies: TechnologyCategories
}
