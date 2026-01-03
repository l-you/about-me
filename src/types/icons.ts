/**
 * Auto-generated icon types from /public/icons directory
 * DO NOT EDIT MANUALLY - Run 'bun run generate:icons' to regenerate
 */

export const AVAILABLE_ICONS = [
	'packagist',
	'javascript',
	'rust',
	'github',
	'bash',
	'npm',
	'x',
	'symfony',
	'docker',
	'nextjs',
	'nodejs',
	'php',
	'typescript',
	'star',
	'reddit',
	'tailwindcss',
	'redis',
	'react',
	'mysql',
	'graphql',
	'nginx',
	'go',
	'postgresql',
	'revotale',
	'gamepad',
] as const

export type IconName = typeof AVAILABLE_ICONS[number]

export const iconMap: Record<IconName, string> = {
	packagist: '/icons/packagist.svg',
	javascript: '/icons/javascript.svg',
	rust: '/icons/rust.svg',
	github: '/icons/github.svg',
	bash: '/icons/bash.svg',
	npm: '/icons/npm.svg',
	x: '/icons/x.svg',
	symfony: '/icons/symfony.svg',
	docker: '/icons/docker.svg',
	nextjs: '/icons/nextjs.svg',
	nodejs: '/icons/nodejs.svg',
	php: '/icons/php.svg',
	typescript: '/icons/typescript.svg',
	star: '/icons/star.svg',
	reddit: '/icons/reddit.svg',
	tailwindcss: '/icons/tailwindcss.svg',
	redis: '/icons/redis.svg',
	react: '/icons/react.svg',
	mysql: '/icons/mysql.svg',
	graphql: '/icons/graphql.svg',
	nginx: '/icons/nginx.svg',
	go: '/icons/go.svg',
	postgresql: '/icons/postgresql.svg',
	revotale: '/icons/revotale.svg',
	gamepad: '/icons/gamepad.svg',
}

export function isValidIconName(name: string): name is IconName {
	return AVAILABLE_ICONS.includes(name as IconName)
}
