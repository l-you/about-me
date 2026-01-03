import contentConfig from '@/config/content.json'

/**
 * JSON-LD structured data for SEO
 * Implements ProfilePage schema with Person entity per Google's guidelines
 * @see https://developers.google.com/search/docs/appearance/structured-data/profile-page
 */
export function JsonLd() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		dateModified: new Date().toISOString(),
		mainEntity: {
			'@type': 'Person',
			'@id': 'https://l-you.revotale.com/#person',
			name: 'l-you',
			alternateName: ['l-you', 'RevoTale'],
			description:
				'Full-Stack Developer generating revenue since 2018. Specializing in Go, PHP, TypeScript, and React. Building scalable web applications with focus on clean architecture and great UX.',
			jobTitle: 'Senior Full-Stack Developer',
			image:
				'https://2.gravatar.com/avatar/eb7387f4ea2542d6d90e970a9180ea931ece91bf0e826ba175e46d6fc7ccb585?size=512',
			url: 'https://l-you.revotale.com',
			email: 'l-you@revotale.com',
			sameAs: [
				'https://github.com/l-you',
				'https://github.com/RevoTale',
				'https://x.com/x_l_you',
				'https://www.reddit.com/user/you-l-you',
				'https://revotale.com',
			],
			knowsAbout: [
				'Go',
				'PHP',
				'TypeScript',
				'JavaScript',
				'Rust',
				'React',
				'Next.js',
				'Node.js',
				'Symfony',
				'PostgreSQL',
				'MySQL',
				'Redis',
				'Docker',
				'Web Development',
				'Software Architecture',
				'UI/UX Design',
			],
			hasOccupation: {
				'@type': 'Occupation',
				name: 'Full-Stack Developer',
				occupationLocation: {
					'@type': 'VirtualLocation',
					name: 'Remote',
				},
				skills: [
					'Go',
					'PHP',
					'Symfony',
					'TypeScript',
					'JavaScript',
					'React',
					'Next.js',
					'Node.js',
					'Tailwind CSS',
					'PostgreSQL',
					'Docker',
				],
			},
		},
		hasPart: contentConfig.featuredProjects
			.filter((project) => project.href.includes('github.com'))
			.map((project) => ({
				'@type': 'SoftwareSourceCode',
				name: project.title,
				description: project.description,
				url: project.href,
				codeRepository: project.href,
				programmingLanguage: project.language ?? 'TypeScript',
				author: {'@id': 'https://l-you.dev/#person'},
			})),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
		/>
	)
}
