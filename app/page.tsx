import type { Metadata } from 'next'
import AboutMeContent from '@/src/about-me/AboutMeContent'
import { JsonLd } from '@/src/about-me/components/JsonLd'

export const metadata: Metadata = {
	title: 'About Me | Full-Stack Engineer',
	description:
		'Full-Stack Engineer since 2018. Expert in Go, PHP, TypeScript, and React. Building scalable web applications with clean architecture and exceptional UX.',
	openGraph: {
		title: 'l-you - Full-Stack Engineer',
		description:
			'Full-Stack Engineer since 2018. Expert in Go, PHP, TypeScript, and React. Building scalable web applications with clean architecture and exceptional UX.',
		type: 'profile',
		url: '/',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'l-you - Full-Stack Engineer',
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'l-you - Full-Stack Engineer',
		description:
			'Full-Stack Engineer since 2018. Expert in Go, PHP, TypeScript, and React. Building scalable web applications with clean architecture and exceptional UX.',
		images: ['/og-image.png'],
		creator: '@x_l_you',
	},
	keywords: [
		'full-stack engineer',
		'Go developer',
		'PHP developer',
		'TypeScript developer',
		'React developer',
		'Next.js developer',
		'Full-Stack Engineer',
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
