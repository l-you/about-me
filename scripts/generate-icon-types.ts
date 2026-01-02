#!/usr/bin/env bun

/**
 * Generates TypeScript types and fetches missing icons from devicon.dev/simpleicons.org
 */

import {existsSync, readdirSync, writeFileSync, mkdirSync} from 'fs'
import {join} from 'path'
import contentConfig from '../config/content.json'

const ICONS_DIR = join(process.cwd(), 'public', 'icons')
const OUTPUT_FILE = join(process.cwd(), 'src', 'types', 'icons.ts')

// Icon source URLs
const ICON_SOURCES = {
	devicon: (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`,
	simpleicons: (name: string) => `https://cdn.simpleicons.org/${name}`,
}

async function fetchIcon(name: string): Promise<boolean> {
	const iconPath = join(ICONS_DIR, `${name}.svg`)

	if (existsSync(iconPath)) {
		return true
	}

	console.log(`📥 Fetching missing icon: ${name}`)

	// Try devicon first
	try {
		const response = await fetch(ICON_SOURCES.devicon(name))
		if (response.ok) {
			const svg = await response.text()
			writeFileSync(iconPath, svg, 'utf-8')
			console.log(`✅ Downloaded from devicon: ${name}`)
			return true
		}
	} catch (e) {
		// Ignore and try next source
	}

	// Try simpleicons
	try {
		const response = await fetch(ICON_SOURCES.simpleicons(name))
		if (response.ok) {
			const svg = await response.text()
			writeFileSync(iconPath, svg, 'utf-8')
			console.log(`✅ Downloaded from simpleicons: ${name}`)
			return true
		}
	} catch (e) {
		// Ignore
	}

	console.warn(`⚠️  Could not fetch icon: ${name}`)
	return false
}

async function generateIconTypes() {
	try {
		// Ensure icons directory exists
		if (!existsSync(ICONS_DIR)) {
			mkdirSync(ICONS_DIR, {recursive: true})
		}

		// Collect all icon names from config
		const configIcons = new Set<string>()

		Object.values(contentConfig.technologies).forEach(techs => {
			techs.forEach(tech => configIcons.add(tech.icon))
		})

		contentConfig.featuredProjects.forEach(project => {
			if (project.icon) configIcons.add(project.icon)
		})

		// Fetch missing icons
		console.log(`🔍 Checking ${configIcons.size} icons from config...\n`)
		await Promise.all(Array.from(configIcons).map(fetchIcon))

		// Read all SVG files from icons directory
		const files = readdirSync(ICONS_DIR)
		const iconFiles = files.filter(file => file.endsWith('.svg'))

		if (iconFiles.length === 0) {
			console.warn('⚠️  No icon files found in /public/icons/')
			return
		}

		// Extract icon names
		const iconNames = iconFiles.map(file => file.replace('.svg', ''))

		// Generate TypeScript file
		const content = `/**
 * Auto-generated icon types from /public/icons directory
 * DO NOT EDIT MANUALLY - Run 'bun run generate:icons' to regenerate
 */

export const AVAILABLE_ICONS = [
${iconNames.map(name => `\t'${name}',`).join('\n')}
] as const

export type IconName = typeof AVAILABLE_ICONS[number]

export const iconMap: Record<IconName, string> = {
${iconNames.map(name => `\t${name}: '/icons/${name}.svg',`).join('\n')}
}

export function isValidIconName(name: string): name is IconName {
	return AVAILABLE_ICONS.includes(name as IconName)
}
`

		writeFileSync(OUTPUT_FILE, content, 'utf-8')

		console.log('\n✅ Generated icon types successfully!')
		console.log(`📦 Total icons: ${iconNames.length}`)

	} catch (error) {
		console.error('❌ Error generating icon types:', error)
		process.exit(1)
	}
}

generateIconTypes()
