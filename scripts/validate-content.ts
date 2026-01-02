#!/usr/bin/env bun

/**
 * Validates content.json configuration against available icons
 */

import contentConfig from '../config/content.json'
import {AVAILABLE_ICONS, type IconName} from '../src/types/icons'
import type {ContentConfig} from '../src/types/content'

const config = contentConfig as ContentConfig

let hasErrors = false

function validateIcon(iconName: string, context: string): boolean {
	if (!AVAILABLE_ICONS.includes(iconName as IconName)) {
		console.error(`❌ Invalid icon "${iconName}" in ${context}`)
		console.error(`   Icon file /public/icons/${iconName}.svg does not exist`)
		return false
	}
	return true
}

function validateContent() {
	console.log('🔍 Validating content configuration...\n')

	// Validate technology icons - read categories dynamically from config
	const techCategories = Object.entries(config.technologies).map(([key, data]) => ({
		name: key,
		data: data as {name: string; icon: string}[],
	}))

	techCategories.forEach(category => {
		category.data.forEach(tech => {
			if (!validateIcon(tech.icon, `technologies.${category.name}.${tech.name}`)) {
				hasErrors = true
			}
		})
	})

	// Validate project icons (optional)
	config.featuredProjects.forEach(project => {
		if (project.icon) {
			if (!validateIcon(project.icon, `project.${project.title}`)) {
				hasErrors = true
			}
		}
	})

	// Check for unused icons
	const usedIcons = new Set<string>()

	techCategories.forEach(category => {
		category.data.forEach(tech => usedIcons.add(tech.icon))
	})

	config.featuredProjects.forEach(project => {
		if (project.icon) usedIcons.add(project.icon)
	})

	const unusedIcons = AVAILABLE_ICONS.filter(icon => !usedIcons.has(icon))

	if (unusedIcons.length > 0) {
		console.log('⚠️  Unused icons found:')
		unusedIcons.forEach(icon => console.log(`   - ${icon}.svg`))
		console.log('')
	}

	// Summary
	if (hasErrors) {
		console.error('❌ Validation failed! Please fix the errors above.\n')
		process.exit(1)
	} else {
		console.log('✅ Content configuration is valid!\n')
		console.log(`📊 Summary:`)
		console.log(`   - ${config.featuredProjects.length} featured projects`)
		console.log(`   - ${techCategories.reduce((sum, cat) => sum + cat.data.length, 0)} technologies`)
		console.log(`   - ${AVAILABLE_ICONS.length} available icons`)
		console.log(`   - ${usedIcons.size} icons in use`)
	}
}

validateContent()
