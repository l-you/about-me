import type { Metadata } from 'next'
import AboutMeContent from '@/src/about-me/AboutMeContent'
import { JsonLd } from '@/src/about-me/components/JsonLd'

export const metadata: Metadata = {
	title: 'About Me | Full-Stack Developer',
	description:
		'Full-Stack Developer generating revenue since 2018. Specializing in Go, PHP, TypeScript, and React. Building scalable web applications with focus on clean architecture and great UX.',
	openGraph: {
		title: 'l-you - Full-Stack Developer',
		description:
			'Full-Stack Developer since 2018. Building scalable web applications with Go, PHP, TypeScript, and React. Expert in legacy code modernization and UI/UX optimization.',
		type: 'profile',
		url: '/',
		images: [
			{
				url: 'https://2.gravatar.com/avatar/eb7387f4ea2542d6d90e970a9180ea931ece91bf0e826ba175e46d6fc7ccb585?size=512',
				width: 512,
				height: 512,
				alt: 'l-you - Full-Stack Developer',
			},
		],
	},
	twitter: {
		card: 'summary',
		title: 'l-you - Full-Stack Developer',
		description:
			'Full-Stack Developer since 2018. Go, PHP, TypeScript, React. Open for collaboration.',
		images: ['https://2.gravatar.com/avatar/eb7387f4ea2542d6d90e970a9180ea931ece91bf0e826ba175e46d6fc7ccb585?size=512'],
		creator: '@x_l_you',
	},
	keywords: [
		'full-stack developer',
		'Go developer',
		'PHP developer',
		'TypeScript developer',
		'React developer',
		'Next.js developer',
		'web developer',
		'software engineer',
		'l-you',
		'RevoTale',
		'freelance developer',
		'senior engineer',
	],
	alternates: {
		canonical: '/',
	},
}

export default async function HomePage() {
	return (
		<>
			<JsonLd />
			<AboutMeContent />
		</>
	)
}
