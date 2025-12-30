import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
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
		<Card className="group transition-all hover:shadow-md">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<CardTitle className="text-lg transition-colors group-hover:text-primary">
						{title}
					</CardTitle>
					<Link
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground transition-colors hover:text-foreground">
						<ExternalLink className="size-4" />
					</Link>
				</div>
				<CardDescription className="line-clamp-2">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					{language && (
						<span className="flex items-center gap-1.5">
							<span className="h-3 w-3 rounded-full bg-blue-500" />
							{language}
						</span>
					)}
					{stars !== undefined && (
						<span className="flex items-center gap-1">
							<StarIcon />
							{stars}
						</span>
					)}
					{icon}
				</div>
			</CardContent>
		</Card>
	)
}
