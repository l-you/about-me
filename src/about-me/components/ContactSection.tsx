
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

export const ContactSection: FunctionComponent = () => {


	return (
		<section id="contact" className="py-12 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl">
					<Card className="overflow-hidden pt-0 pb-5">
						<CardHeader className="bg-linear-to-r from-primary/5 to-accent/5 py-6">
							<CardTitle className="text-center text-2xl">
								Let&apos;s Connect
							</CardTitle>
							<CardDescription className="text-center">
								I&apos;m open for communication, offers and
								collaboration
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							{/* Primary Contact Options */}
							<div className="grid gap-4 sm:grid-cols-2">
								<ContactButton
									href="https://github.com/l-you"
									icon={<GitHubIcon />}
									title="GitHub"
									subtitle="@l-you"
								/>
								<ContactButton
									href="mailto:l-you@revotale.com"
									icon={<Mail className="size-5" />}
									title="Email"
									subtitle="l-you@revotale.com"
								/>
								<ContactButton
									href="https://x.com/x_l_you"
									icon={<XIcon />}
									title="X (Twitter)"
									subtitle="@x_l_you"
								/>
								<ContactButton
									href="https://www.reddit.com/user/you-l-you"
									icon={<RedditIcon />}
									title="Reddit"
									subtitle="u/you-l-you"
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
							&quot;Made with passion <Heart className="size-4 fill-red-500 text-red-500 inline" />&quot;
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

