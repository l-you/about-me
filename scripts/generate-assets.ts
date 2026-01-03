#!/usr/bin/env bun
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import contentConfig from '../config/content.json'

const { site } = contentConfig

// Register bundled fonts for text rendering
const fontsDir = join(process.cwd(), 'assets', 'fonts')
GlobalFonts.registerFromPath(join(fontsDir, 'DejaVuSans.ttf'), 'DejaVu Sans')
GlobalFonts.registerFromPath(join(fontsDir, 'DejaVuSans-Bold.ttf'), 'DejaVu Sans')

/**
 * Resize image to specified dimensions using canvas
 */
async function resizeImage(inputBuffer: Buffer, width: number, height: number): Promise<Buffer> {
	const image = await loadImage(inputBuffer)
	const canvas = createCanvas(width, height)
	const ctx = canvas.getContext('2d')

	// Draw image scaled to canvas size
	ctx.drawImage(image, 0, 0, width, height)

	return canvas.toBuffer('image/png')
}

/**
 * Neutral Color Palette for OG Image
 * Matches project's shadcn/ui "neutral" base with monochromatic design
 *
 * Based on globals.css oklch values converted to hex:
 * - Background: oklch(1 0 0) = #ffffff
 * - Primary/Foreground: oklch(0.205 0 0) = #343434
 * - Muted foreground: oklch(0.556 0 0) = #8a8a8a
 * - Border: oklch(0.922 0 0) = #ebebeb
 * - Secondary: oklch(0.97 0 0) = #f7f7f7
 *
 * Contrast ratios (WCAG):
 * - Primary text (#171717) on white: 14.5:1 ✓ AAA
 * - Muted text (#737373) on white: 4.8:1 ✓ AA
 * - Border (#e5e5e5) visible on white: sufficient for decorative use
 */
const ogPalette = {
	// Background - clean whites and subtle grays (neutral scale)
	bg: {
		base: '#ffffff', // pure white - matches --background
		subtle: '#fafafa', // neutral-50
		muted: '#f5f5f5', // neutral-100
	},
	// Text colors - high contrast neutrals
	text: {
		primary: '#171717', // neutral-900 - matches --foreground
		secondary: '#404040', // neutral-700
		muted: '#737373', // neutral-500 - matches --muted-foreground
	},
	// Border and decorative elements
	border: {
		default: '#e5e5e5', // neutral-200 - matches --border
		strong: '#d4d4d4', // neutral-300
		subtle: '#f5f5f5', // neutral-100
	},
	// Shadows - pure black with varying opacity for depth
	shadow: {
		soft: 'rgba(0, 0, 0, 0.06)',
		medium: 'rgba(0, 0, 0, 0.1)',
		strong: 'rgba(0, 0, 0, 0.15)',
	},
	// Single accent for tech pills - subtle blue (from ProjectCard language indicator)
	accent: {
		bg: '#f5f5f5', // neutral-100 as pill background
		dot: '#3b82f6', // blue-500 - matches project card language dot
	},
}

/**
 * Generate Open Graph image (1200x630) with profile info
 */
async function generateOGImage() {
	console.log('Generating Open Graph image (1200×630)...')

	const avatarPath = join(process.cwd(), 'public', 'avatar.png')
	const ogPath = join(process.cwd(), 'public', 'og-image.png')

	// Load avatar and create OG image canvas
	const avatarBuffer = await readFile(avatarPath)
	const avatar = await loadImage(avatarBuffer)

	// Create 1200x630 canvas for OG image
	const canvas = createCanvas(1200, 630)
	const ctx = canvas.getContext('2d')

	// Background - clean white with subtle radial gradient for depth
	ctx.fillStyle = ogPalette.bg.base
	ctx.fillRect(0, 0, 1200, 630)

	// Subtle radial gradient overlay for visual interest
	const radialGradient = ctx.createRadialGradient(240, 315, 0, 240, 315, 600)
	radialGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
	radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.03)')
	ctx.fillStyle = radialGradient
	ctx.fillRect(0, 0, 1200, 630)

	// Draw avatar on left side (circular with shadow)
	const avatarSize = 320
	const avatarX = 240
	const avatarY = 315

	// Multi-layered shadow for depth - neutral shadows
	ctx.save()
	ctx.shadowColor = ogPalette.shadow.strong
	ctx.shadowBlur = 40
	ctx.shadowOffsetY = 12
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2)
	ctx.fillStyle = ogPalette.bg.base
	ctx.fill()
	ctx.restore()

	// Secondary softer shadow layer
	ctx.save()
	ctx.shadowColor = ogPalette.shadow.soft
	ctx.shadowBlur = 60
	ctx.shadowOffsetY = 4
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2 - 4, 0, Math.PI * 2)
	ctx.fillStyle = ogPalette.bg.base
	ctx.fill()
	ctx.restore()

	// Clip to circle and draw avatar
	ctx.save()
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2 - 10, 0, Math.PI * 2)
	ctx.closePath()
	ctx.clip()
	ctx.drawImage(
		avatar,
		avatarX - (avatarSize / 2 - 10),
		avatarY - (avatarSize / 2 - 10),
		avatarSize - 20,
		avatarSize - 20
	)
	ctx.restore()

	// Draw border around avatar - clean neutral border (matches --border)
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2 - 10, 0, Math.PI * 2)
	ctx.strokeStyle = ogPalette.border.strong
	ctx.lineWidth = 3
	ctx.stroke()

	// Text on right side
	const textStartX = 520
	const textStartY = 200

	// Set text baseline for consistent rendering
	ctx.textBaseline = 'top'
	ctx.textAlign = 'left'

	// Name - large and bold, pure dark neutral
	ctx.fillStyle = ogPalette.text.primary
	ctx.font = 'bold 84px "DejaVu Sans"'
	ctx.fillText(site.nickname, textStartX, textStartY)

	// Title - secondary text color
	ctx.fillStyle = ogPalette.text.secondary
	ctx.font = '42px "DejaVu Sans"'
	ctx.fillText(site.title, textStartX, textStartY + 100)

	// Horizontal line separator - clean neutral border
	ctx.strokeStyle = ogPalette.border.default
	ctx.lineWidth = 2
	ctx.beginPath()
	ctx.moveTo(textStartX, textStartY + 165)
	ctx.lineTo(textStartX + 520, textStartY + 165)
	ctx.stroke()

	// Tech stack - unified neutral pill styling
	ctx.font = 'bold 26px "DejaVu Sans"'
	const techStackRow1 = ['Go', 'PHP', 'React']
	const techStackRow2 = ['TypeScript']
	const techY = textStartY + 200
	const techSpacing = 145
	const rowSpacing = 55

	// Draw pill helper - consistent neutral style
	const drawPill = (tech: string, x: number, y: number) => {
		const textWidth = ctx.measureText(tech).width
		const dotSize = 8
		const dotMarginLeft = 12
		const dotMarginRight = 8
		const textPaddingRight = 14
		const pillWidth = dotMarginLeft + dotSize + dotMarginRight + textWidth + textPaddingRight
		const pillHeight = 40

		// Pill background with subtle shadow
		ctx.save()
		ctx.shadowColor = ogPalette.shadow.soft
		ctx.shadowBlur = 8
		ctx.shadowOffsetY = 2
		ctx.fillStyle = ogPalette.accent.bg
		ctx.beginPath()
		ctx.roundRect(x, y, pillWidth, pillHeight, 20)
		ctx.fill()
		ctx.restore()

		// Pill border
		ctx.strokeStyle = ogPalette.border.default
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.roundRect(x, y, pillWidth, pillHeight, 20)
		ctx.stroke()

		// Blue dot indicator - vertically centered in pill
		ctx.fillStyle = ogPalette.accent.dot
		ctx.beginPath()
		ctx.arc(x + dotMarginLeft + dotSize / 2, y + pillHeight / 2, dotSize / 2, 0, Math.PI * 2)
		ctx.fill()

		// Tech name - vertically centered in pill
		const textX = x + dotMarginLeft + dotSize + dotMarginRight
		const textY = y + (pillHeight - 26) / 2 // 26 is approximate font height for bold 26px
		ctx.fillStyle = ogPalette.text.secondary
		ctx.fillText(tech, textX, textY)
	}

	// First row: Go, PHP, React
	techStackRow1.forEach((tech, i) => {
		drawPill(tech, textStartX + i * techSpacing, techY)
	})

	// Second row: TypeScript
	techStackRow2.forEach((tech, i) => {
		drawPill(tech, textStartX + i * techSpacing, techY + rowSpacing)
	})

	// Domain at bottom with card-like styling
	const domainY = 525
	const domainText = site.domain.replace('https://', '')
	ctx.font = 'bold 28px "DejaVu Sans"'
	const domainWidth = ctx.measureText(domainText).width

	// Card background with shadow
	ctx.save()
	ctx.shadowColor = ogPalette.shadow.medium
	ctx.shadowBlur = 16
	ctx.shadowOffsetY = 4
	ctx.fillStyle = ogPalette.bg.base
	ctx.beginPath()
	ctx.roundRect(textStartX - 16, domainY - 10, domainWidth + 32, 50, 10)
	ctx.fill()
	ctx.restore()

	// Card border - matches --border
	ctx.strokeStyle = ogPalette.border.default
	ctx.lineWidth = 1
	ctx.beginPath()
	ctx.roundRect(textStartX - 16, domainY - 10, domainWidth + 32, 50, 10)
	ctx.stroke()

	// Domain text - primary color for emphasis
	ctx.fillStyle = ogPalette.text.primary
	ctx.fillText(domainText, textStartX, domainY + 3)

	// Save OG image
	const ogBuffer = canvas.toBuffer('image/png')
	await writeFile(ogPath, ogBuffer)

	console.log('✓ Generated og-image.png (1200×630)')
}

/**
 * Generate favicon suite from avatar with proper resizing
 * Sizes: 16x16, 32x32, 180x180, 192x192, 512x512, 150x150
 */
async function generateFavicons() {
	console.log('Generating favicon suite...')

	const avatarPath = join(process.cwd(), 'public', 'avatar.png')
	const avatarBuffer = await readFile(avatarPath)

	const sizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'android-chrome-192x192.png', size: 192 },
		{ name: 'android-chrome-512x512.png', size: 512 },
		{ name: 'mstile-150x150.png', size: 150 },
	]

	for (const { name, size } of sizes) {
		const resized = await resizeImage(avatarBuffer, size, size)
		const outputPath = join(process.cwd(), 'public', name)
		await writeFile(outputPath, resized)
		console.log(`  ✓ ${name} (${size}×${size})`)
	}

	console.log('✓ All favicons generated with proper sizing')
}

/**
 * Generate Safari pinned tab SVG
 * Should be monochrome SVG
 */
async function generateSafariPinnedTab() {
	console.log('Generating Safari pinned tab SVG...')

	// Simple monochrome "L" letter as placeholder
	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#000"/>
  <path d="M 150 100 L 230 100 L 230 380 L 370 380 L 370 460 L 150 460 Z" fill="#FFF"/>
</svg>`

	const outputPath = join(process.cwd(), 'public', 'safari-pinned-tab.svg')
	await writeFile(outputPath, svg)

	console.log('✓ Generated safari-pinned-tab.svg (simple "L" monogram)')
	console.log('   TODO: Design better monogram matching site branding')
}

async function main() {
	console.log('🎨 Generating visual assets...\n')

	await generateOGImage()
	await generateFavicons()
	await generateSafariPinnedTab()

	console.log('\n✅ Asset generation complete!')
	console.log('\n📝 Next steps:')
	console.log('   1. Design custom 1200×630 OG image with branding')
	console.log('   2. Design proper favicon set (simple monogram)')
	console.log('   3. Replace placeholders with final designs')
}

main().catch((error) => {
	console.error('Error generating assets:', error)
	process.exit(1)
})
