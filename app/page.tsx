import type { Metadata } from 'next'
import type { FunctionComponent } from 'react'
import AboutMeContent from '@/src/about-me/AboutMeContent'

export const metadata: Metadata = {
	title: 'About Me | l-you - Full-Stack Developer',
	description:
		'Full-Stack Developer since 2018. Specializing in TypeScript, Next.js, React, Go, and PHP. Open for collaboration and communication.',
	openGraph: {
		title: 'l-you - Full-Stack Developer',
		description:
			'Passionate full-stack developer increasing business revenue since 2018. Crafting simple, eye-friendly UI and delivering smooth UX.',
	},
	keywords: [
		'full-stack developer',
		'TypeScript',
		'Next.js',
		'React',
		'Go',
		'PHP',
		'web developer',
		'l-you',
		'RevoTale',
	],
}

const HomePage: FunctionComponent = () => {
	return <AboutMeContent />
}

export default HomePage
