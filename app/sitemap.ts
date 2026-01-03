import type { MetadataRoute } from 'next'
import contentConfig from '@/config/content.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: contentConfig.site.domain,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]
}
