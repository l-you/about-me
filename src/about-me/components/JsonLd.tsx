import contentConfig from '@/config/content.json'

const { site } = contentConfig;

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
			'@id': `${site.domain}/#person`,
			name: site.nickname,
			alternateName: site.alternateName ?? [site.nickname],
			description: site.description,
			jobTitle: site.jobTitle,
			image: site.avatarUrl,
			url: site.domain,
			email: site.email,
			sameAs: [
				`https://github.com/${site.social.github}`,
				...(site.social.githubOrg ? [`https://github.com/${site.social.githubOrg}`] : []),
				`https://x.com/${site.social.twitter}`,
				`https://www.reddit.com/user/${site.social.reddit}`,
				...(site.websiteUrl ? [site.websiteUrl] : []),
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
				name: site.title,
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
				author: {'@id': `${site.domain}/#person`},
			})),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
		/>
	)
}
