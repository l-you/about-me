import {cn} from '@/lib/utils'
import {Badge} from '@/components/ui/badge'
import Image from 'next/image'
import {type FC, type ReactNode} from 'react'
import {iconMap, isValidIconName} from '@/src/types/icons'

interface TechIconProps {
	name: string
	className?: string
}

export const TechIcon: FC<TechIconProps> = ({
	name,
	className = 'size-4',
}) => {
	if (!isValidIconName(name)) {
		return null
	}

	const iconUrl = iconMap[name]

	return (
		<Image
			src={iconUrl} 
			loading='lazy'
			alt={`${name} icon`}
			width={16}
			height={16}
			className={className}
		/>
	)
}

// Social Icons as external SVG resources
export const GitHubIcon: FC<{className?: string}> = ({
	className,
}) => (
	<Image
		src="/icons/github.svg"
		loading='lazy'
		alt="GitHub"
		width={20}
		height={20}
		className={cn('size-5', className)}
	/>
)

export const XIcon: FC<{className?: string}> = ({className}) => (
	<Image
		src="/icons/x.svg"
		loading='lazy'
		alt="X (Twitter)"
		width={20}
		height={20}
		className={cn('size-5', className)}
	/>
)

export const RedditIcon: FC<{className?: string}> = ({
	className,
}) => (
	<Image
		src="/icons/reddit.svg"
		loading='lazy'
		alt="Reddit"
		width={20}
		height={20}
		className={cn('size-5', className)}
	/>
)

export const NpmIcon: FC<{className?: string}> = ({
	className,
}) => (
	<Image
		src="/icons/npm.svg"
		loading='lazy'
		alt="npm"
		width={20}
		height={20}
		className={cn('size-5', className)}
	/>
)

export const PackagistIcon: FC<{className?: string}> = ({
	className,
}) => (
	<Image
		src="/icons/packagist.svg"
		loading='lazy'
		alt="Packagist"
		width={20}
		height={20}
		className={cn('size-5', className)}
	/>
)

export const StarIcon: FC<{className?: string}> = ({
	className,
}) => (
	<Image
		src="/icons/star.svg"
		loading='lazy'
		alt="Star"
		width={16}
		height={16}
		className={cn('size-4', className)}
	/>
)

// Tech Category Component
interface TechCategoryProps {
	icon: ReactNode
	title: string
	techs: Array<{name: string; icon: string}>
}

export const TechCategory: FC<TechCategoryProps> = ({
	icon,
	title,
	techs,
}) => {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<div className="text-primary">{icon}</div>
				<h3 className="font-semibold">{title}</h3>
			</div>
			<div className="flex flex-wrap gap-3">
				{techs.map(tech => (
					<Badge
						key={tech.name}
						variant="secondary"
						className="gap-2 px-3 py-1.5 text-sm">
						<TechIcon name={tech.icon} />
						{tech.name}
					</Badge>
				))}
			</div>
		</div>
	)
}
