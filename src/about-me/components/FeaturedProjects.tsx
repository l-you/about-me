import {Gamepad2} from 'lucide-react'
import Image from 'next/image'
import {ProjectCard} from './ProjectCard'
import contentConfig from '@/config/content.json'

interface GitHubRepoData {
	stars: number
	language: string | null
}

/**
 * Extracts GitHub owner and repo from URL
 */
function parseGitHubUrl(url: string): {owner: string; repo: string} | null {
	const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
	if (!match) return null
	return {owner: match[1], repo: match[2]}
}

/**
 * Fetches repository data from GitHub API
 */
async function fetchRepoData(owner: string, repo: string): Promise<GitHubRepoData | null> {
	try {
		const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				...(process.env.GITHUB_TOKEN && {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}),
			},
			next: {revalidate: 3600}, // Cache for 1 hour
		})

		if (!response.ok) {
			console.warn(`⚠️ Failed to fetch ${owner}/${repo}: ${response.status}`)
			return null
		}

		const data = await response.json()
		return {
			stars: data.stargazers_count,
			language: data.language,
		}
	} catch (error) {
		console.error(`❌ Error fetching ${owner}/${repo}:`, error)
		return null
	}
}

/**
 * Server Component that fetches GitHub data at build time
 */
export async function FeaturedProjects() {
	const projects = await Promise.all(
		contentConfig.featuredProjects.map(async (project) => {
			const githubInfo = parseGitHubUrl(project.href)

			if (!githubInfo) {
				return project
			}

			const repoData = await fetchRepoData(githubInfo.owner, githubInfo.repo)

			if (repoData) {
				return {
					...project,
					stars: repoData.stars,
					language: repoData.language ?? project.language,
				}
			}

			return project
		})
	)

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{projects.map((project) => (
				<ProjectCard
					key={project.title}
					title={project.title}
					description={project.description}
					stars={project.stars}
					language={project.language}
					icon={
						project.icon === 'gamepad' ? (
							<Gamepad2 className="size-5" />
						) : project.icon === 'revotale' ? (
							<Image
								src="/icons/revotale.svg"
								alt="Revotale Logo"
								width={16}
								height={16}
								className="size-5"
							/>
						) : null
					}
					href={project.href}
				/>
			))}
		</div>
	)
}
