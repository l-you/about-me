/**
 * Auto-generated icon types from /public/icons directory
 * DO NOT EDIT MANUALLY - Run 'go run ./scripts/codegen' to regenerate
 */

export const AVAILABLE_ICONS = [
	'apple',
	'bash',
	'docker',
	'gamepad',
	'github',
	'go',
	'graphql',
	'javascript',
	'linux',
	'macos',
	'mariadb',
	'mysql',
	'nextjs',
	'nginx',
	'nodejs',
	'npm',
	'packagist',
	'payloadcms',
	'php',
	'postgresql',
	'radixui',
	'react',
	'reddit',
	'redis',
	'revotale',
	'rust',
	'star',
	'symfony',
	'tailwindcss',
	'traefikproxy',
	'typescript',
	'x',
] as const

export type IconName = typeof AVAILABLE_ICONS[number]

export const iconMap: Record<IconName, string> = {
	'apple': '/icons/apple.svg',
	'bash': '/icons/bash.svg',
	'docker': '/icons/docker.svg',
	'gamepad': '/icons/gamepad.svg',
	'github': '/icons/github.svg',
	'go': '/icons/go.svg',
	'graphql': '/icons/graphql.svg',
	'javascript': '/icons/javascript.svg',
	'linux': '/icons/linux.svg',
	'macos': '/icons/macos.svg',
	'mariadb': '/icons/mariadb.svg',
	'mysql': '/icons/mysql.svg',
	'nextjs': '/icons/nextjs.svg',
	'nginx': '/icons/nginx.svg',
	'nodejs': '/icons/nodejs.svg',
	'npm': '/icons/npm.svg',
	'packagist': '/icons/packagist.svg',
	'payloadcms': '/icons/payloadcms.svg',
	'php': '/icons/php.svg',
	'postgresql': '/icons/postgresql.svg',
	'radixui': '/icons/radixui.svg',
	'react': '/icons/react.svg',
	'reddit': '/icons/reddit.svg',
	'redis': '/icons/redis.svg',
	'revotale': '/icons/revotale.svg',
	'rust': '/icons/rust.svg',
	'star': '/icons/star.svg',
	'symfony': '/icons/symfony.svg',
	'tailwindcss': '/icons/tailwindcss.svg',
	'traefikproxy': '/icons/traefikproxy.svg',
	'typescript': '/icons/typescript.svg',
	'x': '/icons/x.svg',
}

export function isValidIconName(name: string): name is IconName {
	return AVAILABLE_ICONS.includes(name as IconName)
}
