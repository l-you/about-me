import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '@/components/ui/card'
import {ExternalLink} from 'lucide-react'
import Link from 'next/link'
import type {FunctionComponent, ReactNode} from 'react'
import {StarIcon} from './Icons'

interface ProjectCardProps {
	title: string
	description: string
	stars?: number
	language?: string
	href: string
	icon?: ReactNode
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = ({
	title,
	description,
	stars,
	language,
	href,
	icon,
}) => {
	return (
		<article>
			<Link
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
				<Card className="group h-full transition-all hover:shadow-md hover:border-primary/50">
					<CardHeader className="pb-3">
						<div className="flex items-start justify-between">
							<h3 className="font-semibold leading-none text-lg transition-colors group-hover:text-primary">
								{title}
							</h3>
							<ExternalLink className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
						</div>
						<CardDescription>
							{description}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							{language && (
								<span className="flex items-center gap-1.5">
									<span className="h-3 w-3 rounded-full bg-blue-500" aria-hidden="true" />
									<span>{language}</span>
								</span>
							)}
							{stars !== undefined && (
								<span className="flex items-center gap-1">
									<StarIcon aria-hidden="true" />
									<span>{stars} stars</span>
								</span>
							)}
							{icon}
						</div>
					</CardContent>
				</Card>
			</Link>
		</article>
	)
}
