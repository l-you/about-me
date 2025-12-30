import {cn} from '@/lib/utils'
import {Badge} from '@/components/ui/badge'
import type {FunctionComponent, ReactNode} from 'react'

type TechIconName =
	| 'typescript'
	| 'javascript'
	| 'go'
	| 'php'
	| 'rust'
	| 'bash'
	| 'react'
	| 'nextjs'
	| 'tailwindcss'
	| 'html5'
	| 'css3'
	| 'sass'
	| 'nodejs'
	| 'symfony'
	| 'graphql'
	| 'payloadcms'
	| 'postgresql'
	| 'mysql'
	| 'redis'
	| 'mongodb'
	| 'docker'
	| 'nginx'

const iconMap: Record<TechIconName, string> = {
	typescript:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
	javascript:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
	go: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
	php: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
	rust: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
	bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
	react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
	nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
	tailwindcss:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
	html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
	css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
	sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
	nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
	symfony:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/symfony/symfony-original.svg',
	graphql:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
	payloadcms:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
	postgresql:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
	mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
	redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
	mongodb:
		'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
	docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
	nginx: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
}

const isTechIconName = (name: string): name is TechIconName => {
	return name in iconMap
}

interface TechIconProps {
	name: string
	className?: string
}

export const TechIcon: FunctionComponent<TechIconProps> = ({
	name,
	className = 'size-4',
}) => {
	if (!isTechIconName(name)) {
		return null
	}

	const iconUrl = iconMap[name]

	return (
		// eslint-disable-next-line @next/next/no-img-element -- External CDN icons don't benefit from Next.js Image optimization
		<img
			src={iconUrl}
			alt={`${name} icon`}
			className={className}
			loading="lazy"
		/>
	)
}

// Social Icons as SVG components
export const GitHubIcon: FunctionComponent<{className?: string}> = ({
	className,
}) => (
	<svg
		className={cn('size-5', className)}
		viewBox="0 0 24 24"
		fill="currentColor">
		<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
	</svg>
)

export const XIcon: FunctionComponent<{className?: string}> = ({className}) => (
	<svg
		className={cn('size-5', className)}
		viewBox="0 0 24 24"
		fill="currentColor">
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
)

export const RedditIcon: FunctionComponent<{className?: string}> = ({
	className,
}) => (
	<svg
		className={cn('size-5', className)}
		viewBox="0 0 24 24"
		fill="currentColor">
		<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
	</svg>
)

export const NpmIcon: FunctionComponent<{className?: string}> = ({
	className,
}) => (
	<svg
		className={cn('size-5', className)}
		viewBox="0 0 24 24"
		fill="currentColor">
		<path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
	</svg>
)

export const PackagistIcon: FunctionComponent<{className?: string}> = ({
	className,
}) => (
	<svg
		className={cn('size-5', className)}
		viewBox="0 0 24 24"
		fill="currentColor">
		<path d="M13.214 23.975c-.057.008-.113.017-.172.022a12.104 12.104 0 0 1-2.784-.062c-.086-.013-.171-.029-.257-.043v-3.771c.251.091.491.205.752.265a5.78 5.78 0 0 0 1.724.168c.593-.033 1.171-.15 1.72-.377a4.32 4.32 0 0 0 1.486-.989c.43-.432.77-.936 1.01-1.505.26-.604.417-1.253.416-1.918v-.045a5.003 5.003 0 0 0-.365-1.869 4.633 4.633 0 0 0-.956-1.478 4.268 4.268 0 0 0-1.406-.96 4.299 4.299 0 0 0-1.735-.343c-.633.003-1.238.123-1.798.357a4.211 4.211 0 0 0-1.396.959 4.618 4.618 0 0 0-.967 1.484 5.066 5.066 0 0 0-.358 1.89v.055c.006.657.166 1.305.435 1.909.242.569.583 1.07 1.016 1.499.426.424.93.763 1.486.989.517.21 1.058.328 1.608.37v3.742Zm6.785-6.194c.009-.238.014-.477.013-.716a9.03 9.03 0 0 0-.55-3.123 8.58 8.58 0 0 0-1.521-2.6 8.646 8.646 0 0 0-2.347-1.918 8.788 8.788 0 0 0-2.985-1.082V4.621a12.04 12.04 0 0 1 2.977 1.025 12.615 12.615 0 0 1 3.501 2.698 12.59 12.59 0 0 1 2.325 3.72 12.022 12.022 0 0 1 .877 4.132c.012.45-.003.894-.046 1.323-.012.116-.028.232-.044.348v.012h-.001a11.993 11.993 0 0 1-2.199 5.32v-4.098ZM0 12c0 6.627 5.373 12 12 12 .338 0 .672-.016 1.003-.045v-3.742a5.538 5.538 0 0 1-1.555-.389 5.155 5.155 0 0 1-1.783-1.186 5.567 5.567 0 0 1-1.219-1.802 5.992 5.992 0 0 1-.437-2.282v-.066c.006-.787.164-1.563.468-2.282a5.542 5.542 0 0 1 1.209-1.79 5.09 5.09 0 0 1 1.787-1.186c.581-.253 1.197-.39 1.824-.415v-.027h-.006c.006 0 .012-.001.018-.001.597 0 1.178.095 1.723.272V4.62a11.92 11.92 0 0 0-2.029-.501A12.03 12.03 0 0 0 12 4C5.373 4 0 9.373 0 16c0-.663.027-1.322.079-1.975v-.05c.003-.03.005-.06.008-.091A11.932 11.932 0 0 1 0 12Z" />
	</svg>
)

export const StarIcon: FunctionComponent<{className?: string}> = ({
	className,
}) => (
	<svg
		className={cn('size-4', className)}
		fill="currentColor"
		viewBox="0 0 16 16">
		<path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
	</svg>
)

// Tech Category Component
interface TechCategoryProps {
	icon: ReactNode
	title: string
	techs: Array<{name: string; icon: string}>
}

export const TechCategory: FunctionComponent<TechCategoryProps> = ({
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
