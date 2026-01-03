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

	// Background gradient - subtle
	const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
	gradient.addColorStop(0, '#fafafa')
	gradient.addColorStop(1, '#f5f5f5')
	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, 1200, 630)

	// Draw avatar on left side (circular with shadow)
	const avatarSize = 320
	const avatarX = 240
	const avatarY = 315

	// Shadow
	ctx.save()
	ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
	ctx.shadowBlur = 30
	ctx.shadowOffsetY = 10
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2)
	ctx.fillStyle = '#ffffff'
	ctx.fill()
	ctx.restore()

	// Clip to circle and draw avatar
	ctx.save()
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2 - 8, 0, Math.PI * 2)
	ctx.closePath()
	ctx.clip()
	ctx.drawImage(
		avatar,
		avatarX - (avatarSize / 2 - 8),
		avatarY - (avatarSize / 2 - 8),
		avatarSize - 16,
		avatarSize - 16
	)
	ctx.restore()

	// Draw border around avatar
	ctx.beginPath()
	ctx.arc(avatarX, avatarY, avatarSize / 2 - 8, 0, Math.PI * 2)
	ctx.strokeStyle = '#e5e5e5'
	ctx.lineWidth = 3
	ctx.stroke()

	// Text on right side
	const textStartX = 520
	const textStartY = 200

	// Set text baseline for consistent rendering
	ctx.textBaseline = 'top'
	ctx.textAlign = 'left'

	// Name - large and bold
	ctx.fillStyle = '#0a0a0a'
	ctx.font = 'bold 84px "DejaVu Sans"'
	ctx.fillText(site.nickname, textStartX, textStartY)

	// Title - medium
	ctx.fillStyle = '#525252'
	ctx.font = '42px "DejaVu Sans"'
	ctx.fillText(site.title, textStartX, textStartY + 100)

	// Horizontal line separator
	ctx.strokeStyle = '#d4d4d4'
	ctx.lineWidth = 2
	ctx.beginPath()
	ctx.moveTo(textStartX, textStartY + 165)
	ctx.lineTo(textStartX + 520, textStartY + 165)
	ctx.stroke()

	// Tech stack - two rows layout
	ctx.font = '28px "DejaVu Sans"'
	const techStackRow1 = ['Go', 'PHP', 'React']
	const techStackRow2 = ['TypeScript']
	const techY = textStartY + 200
	const techSpacing = 140
	const rowSpacing = 50

	// First row: Go, PHP, React
	techStackRow1.forEach((tech, i) => {
		// Draw bullet point
		ctx.fillStyle = '#a3a3a3'
		ctx.beginPath()
		ctx.arc(textStartX + i * techSpacing, techY + 12, 4, 0, Math.PI * 2)
		ctx.fill()

		// Draw tech name
		ctx.fillStyle = '#737373'
		ctx.fillText(tech, textStartX + i * techSpacing + 15, techY)
	})

	// Second row: TypeScript
	techStackRow2.forEach((tech, i) => {
		// Draw bullet point
		ctx.fillStyle = '#a3a3a3'
		ctx.beginPath()
		ctx.arc(textStartX + i * techSpacing, techY + rowSpacing + 12, 4, 0, Math.PI * 2)
		ctx.fill()

		// Draw tech name
		ctx.fillStyle = '#737373'
		ctx.fillText(tech, textStartX + i * techSpacing + 15, techY + rowSpacing)
	})

	// Domain at bottom with improved styling
	const domainY = 530
	const domainText = site.domain.replace('https://', '')
	ctx.font = '26px "DejaVu Sans"'
	const domainWidth = ctx.measureText(domainText).width

	// Background for domain - more prominent
	ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
	ctx.fillRect(textStartX - 12, domainY - 8, domainWidth + 24, 42)

	// Add subtle border
	ctx.strokeStyle = '#e5e5e5'
	ctx.lineWidth = 1
	ctx.strokeRect(textStartX - 12, domainY - 8, domainWidth + 24, 42)

	// Domain text - darker for better readability
	ctx.fillStyle = '#737373'
	ctx.fillText(domainText, textStartX, domainY)

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
