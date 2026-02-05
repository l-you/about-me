import {Gamepad2} from 'lucide-react'
import Image from 'next/image'
import {ProjectCard} from './ProjectCard'
import {getFeaturedProjects} from '@/src/about-me/lib/featured-projects'

/**
 * Server Component that fetches GitHub data at build time
 */
export async function FeaturedProjects() {
	const projects = await getFeaturedProjects()

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
							<Image loading='lazy'
								src="/icons/revotale.svg"
								alt="Revotale Logo"
								width={16}
								height={16}
								className="size-5 theme-adaptive-icon"
							/>
						) : null
					}
					href={project.href}
				/>
			))}
		</div>
	)
}
