
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {Mail, Heart} from 'lucide-react'
import {Suspense, type FunctionComponent} from 'react'
import {GitHubIcon, RedditIcon, XIcon} from './Icons'
import MoreContactsSection from './MoreContactsSection'
import ContactButton from './ContextButton'
import { connectButtonClassName, ConnectButtonContent } from './connectButtonSkeleton'
import contentConfig from '@/config/content.json'
import 'server-only'
const { site } = contentConfig;

export const ContactSection: FunctionComponent = () => {


	return (
		<section id="contact" aria-labelledby="contact-heading" className="py-12 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl">
					<Card className="overflow-hidden pt-0 pb-5">
						<CardHeader className="bg-linear-to-r from-primary/5 to-accent/5 py-6">
							<CardTitle id="contact-heading" className="text-center text-2xl">
								Let&apos;s Connect
							</CardTitle>
							<CardDescription className="text-center">
								Open for communication, opportunities, and collaboration
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							{/* Primary Contact Options */}
							<div className="grid gap-4 sm:grid-cols-2">
								<ContactButton
									href={`https://github.com/${site.social.github}`}
									icon={<GitHubIcon />}
									title="GitHub"
									subtitle={`@${site.social.github}`}
								/>
								<ContactButton
									href={`mailto:${site.email}`}
									icon={<Mail className="size-5" />}
									title="Email"
									subtitle={site.email}
								/>
								<ContactButton
									href={`https://x.com/${site.social.twitter}`}
									icon={<XIcon />}
									title="X (Twitter)"
									subtitle={`@${site.social.twitter}`}
								/>
								<ContactButton
									href={`https://www.reddit.com/user/${site.social.reddit}`}
									icon={<RedditIcon />}
									title="Reddit"
									subtitle={`u/${site.social.reddit}`}
								/>
							</div>

							{/* Expandable section */}
							<div className="mt-6">
							 <Suspense fallback={<div className={connectButtonClassName}><ConnectButtonContent isExpanded={false} /></div>}>
								<MoreContactsSection />
							 </Suspense>
							</div>
						</CardContent>
					</Card>

					{/* Footer Quote */}
					<div className="mt-12 text-center">
						<p className="italic text-muted-foreground flex items-center justify-center gap-1.5">
							&quot;Made with love <Heart className="size-4 fill-red-500 text-red-500 inline" />&quot;
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							Elegant solutions for challenging tasks
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

