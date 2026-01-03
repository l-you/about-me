import { writeFile } from 'fs/promises'
import { join } from 'path'
import contentConfig from '../config/content.json'

const { site } = contentConfig

async function downloadImage(url: string, outputPath: string): Promise<void> {
	console.log(`Downloading ${url}...`)

	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to download ${url}: ${response.statusText}`)
	}

	const arrayBuffer = await response.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	await writeFile(outputPath, buffer)
	console.log(`✓ Saved to ${outputPath}`)
}

async function main() {
	const publicDir = join(process.cwd(), 'public')

	// Download avatar (512px for high-quality OG image and JSON-LD)
	await downloadImage(
		site.avatarSourceUrl,
		join(publicDir, 'avatar.png')
	)

	// Download thumbnail (256px for page display)
	await downloadImage(
		site.avatarThumbnailSourceUrl,
		join(publicDir, 'avatar-thumbnail.png')
	)

	console.log('\n✓ All avatar images downloaded successfully')
}

main().catch((error) => {
	console.error('Error downloading avatar images:', error)
	process.exit(1)
})
