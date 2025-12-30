'use client'

import {Button} from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {BookOpen, ChevronDown, ExternalLink, Mail} from 'lucide-react'
import Link from 'next/link'
import {type FunctionComponent, useState} from 'react'
import {GitHubIcon, NpmIcon, PackagistIcon, RedditIcon, XIcon} from './Icons'

export const ContactSection: FunctionComponent = () => {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleToggle = (): void => {
		setIsExpanded(!isExpanded)
	}

	return (
		<section id="contact" className="py-16 md:py-20">
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
									href="mailto:contact@revotale.com"
									icon={<Mail className="size-5" />}
									title="Email"
									subtitle="contact@revotale.com"
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
								<Button
									variant="ghost"
									className="w-full gap-2"
									onClick={handleToggle}>
									<ChevronDown
										className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
									/>
									More ways to connect
								</Button>

								{isExpanded && (
									<div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
										<Separator />
										<div className="grid gap-4 sm:grid-cols-2">
											<ContactButton
												href="https://revotale.com"
												icon={
													<ExternalLink className="size-5" />
												}
												title="Website"
												subtitle="revotale.com"
												variant="ghost"
											/>
											<ContactButton
												href="https://revotale.com/blog"
												icon={
													<BookOpen className="size-5" />
												}
												title="Blog"
												subtitle="Tech notes & insights"
												variant="ghost"
											/>
											<ContactButton
												href="https://www.npmjs.com/~grisaia"
												icon={<NpmIcon />}
												title="npm"
												subtitle="~grisaia"
												variant="ghost"
											/>
											<ContactButton
												href="https://packagist.org/users/grisaia/"
												icon={<PackagistIcon />}
												title="Packagist"
												subtitle="grisaia"
												variant="ghost"
											/>
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Footer Quote */}
					<div className="mt-12 text-center">
						<p className="italic text-muted-foreground">
							&quot;Made with passion ❤️‍🔥&quot;
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

interface ContactButtonProps {
	href: string
	icon: React.ReactNode
	title: string
	subtitle: string
	variant?: 'outline' | 'ghost'
}

const ContactButton: FunctionComponent<ContactButtonProps> = ({
	href,
	icon,
	title,
	subtitle,
	variant = 'outline',
}) => {
	return (
		<Button
			asChild
			variant={variant}
			className="h-auto justify-start gap-3 p-4">
			<Link href={href} target="_blank" rel="noopener noreferrer">
				{icon}
				<div className="text-left">
					<div className="font-medium">{title}</div>
					<div className="text-xs text-muted-foreground">
						{subtitle}
					</div>
				</div>
				<ExternalLink className="ml-auto size-4 text-muted-foreground" />
			</Link>
		</Button>
	)
}
