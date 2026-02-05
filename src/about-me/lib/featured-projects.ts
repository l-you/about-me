import {cache} from 'react'
import contentConfig from '@/config/content.json'
import type {FeaturedProject} from '@/src/types/content'

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
			cache: 'force-cache',
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

export const getFeaturedProjects = cache(async (): Promise<FeaturedProject[]> => {
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

	return projects
})
