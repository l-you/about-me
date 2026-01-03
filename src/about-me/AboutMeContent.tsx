import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import contentConfig from '@/config/content.json'
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Code2,
	Database,
	HeartIcon,
	Lightbulb,
	Mail,
	MapPin,
	Monitor,
	Rocket,
	Server,
	Terminal,
	Wrench,
	Zap,
} from 'lucide-react'
import Link from 'next/link'
import type {FunctionComponent} from 'react'
import {ContactSection} from './components/ContactSection'
import {GitHubIcon, TechCategory} from './components/Icons'
import {FeaturedProjects} from './components/FeaturedProjects'
import Image from 'next/image'

const { site } = contentConfig;

const AboutMeContent = async () => {
	return (
		<>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
			>
				Skip to main content
			</a>
			<main id="main-content" className="min-h-screen bg-background">
				{/* Hero Section */}
				<section aria-labelledby="hero-heading" className="relative overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
				<div className="container relative mx-auto px-4 py-12 md:py-16">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-20 md:mb-10 flex justify-center overflow-visible">
							<div className="relative">
								<div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-accent/20 blur-md" />
								<div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-border bg-card overflow-hidden shadow-lg">
									<Image loading='eager'
								src={site.avatarThumbnailUrl}
								alt={`${site.nickname} avatar`}
								width={256}
								height={256}
										className="h-full w-full object-cover"
									/>
								</div>
								
								<div className="absolute h-min flex items-center -left-12 md:left-auto -bottom-14 md:-right-40 md:top-6 gap-2 md:gap-3 md:items-end md:flex-row flex-col">
									<ArrowDown className="size-5 text-muted-foreground animate-bounce md:rotate-70 rotate-215" />
									<p className="text-xs text-muted-foreground italic max-w-30 text-left">
										Yes, that&apos;s the real photo of myself. <span className='not-italic'>:)</span>
									</p>
								</div>
							</div>
						</div>

						<h1 id="hero-heading" className="mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
							Hey, I&apos;m{' '}
							<span className="text-primary">{site.nickname}</span>
						</h1>

						<p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
							A <span className="font-semibold text-foreground">{site.title}</span> generating revenue since <time dateTime="2018">2018</time>.<br/>
							Hardened by tons of legacy code.
						</p>

						<div className="mb-8 flex flex-wrap justify-center gap-2">
							<Badge
								variant="secondary"
								className="gap-1.5 px-3 py-1">
								<Zap className="size-3.5" />
								Open for Communication
							</Badge>
							<Badge
								variant="outline"
								className="gap-1.5 px-3 py-1">
								<MapPin className="size-3.5" />
								{site.location}
							</Badge>
							<Badge
								variant="outline"
								className="gap-1.5 px-3 py-1">
								<Rocket className="size-3.5" />
								{site.jobTitle}
							</Badge>
						</div>

						<div className="flex flex-wrap justify-center gap-3">
							<Button asChild size="lg" className="gap-2">
								<Link href="#contact">
									<Mail className="size-4" />
									Get in Touch
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="gap-2">
								<Link
									href={`https://github.com/${site.social.github}`}
									target="_blank"
									rel="noopener noreferrer">
									<GitHubIcon className="size-4" />
									GitHub
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section aria-labelledby="about-heading" className="border-t bg-muted/30 py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl">
						<h2 id="about-heading" className="mb-12 text-center text-3xl font-bold">
							About Me
						</h2>

						<div className="grid gap-6 md:grid-cols-3">
							<AboutCard
								icon={<Lightbulb className="size-5" />}
								title="KISS Principle"
								description="'Keep It Simple, Stupid!'. I'm building straightforward solutions that are easy to understand and maintain, avoiding unnecessary complexity."
							/>
							<AboutCard
								icon={<Wrench className="size-5" />}
								title="UI/UX Focus"
								description="Crafting simple, eye-friendly UI and delivering a smooth UX. Every pixel matters."
								endIcon={
									<HeartIcon className="size-4 inline mb-1 text-red-500 fill-red-500" />
								}
							/>
						
							<AboutCard
								icon={<Rocket className="size-5" />}
								title="Innovation Driven"
								description="I have a desire for innovation and improvement, replacing outdated code with cutting-edge technologies."
							/>
							<AboutCard
								icon={<Zap className="size-5" />}
								title="Codebase Rescuer"
								description="Hardened by dealing with tons of legacy code. Solving problems nobody wants to solve."
							/>
							<AboutCard
								icon={<Rocket className="size-5" />}
								title="Details Matter"
								description="I enjoy paying attention to small details which, as practice shows, increase the conversion rate significantly."
							/>
							<AboutCard
								icon={<BookOpen className="size-5" />}
								title="Lifestyle and software"
								description="I believe that learning a variety of skills in life enables the brain to create better software solutions."
							/>
						</div>

					</div>
				</div>
			</section>

			{/* Tech Stack Section */}
			<section aria-labelledby="tech-heading" className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-5xl">
						<h2 id="tech-heading" className="mb-4 text-center text-3xl font-bold">
							Technologies & Tools
						</h2>
						<p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
							Core technologies I prefer and use today
						</p>

						<TechCategory
							icon={<Code2 className="size-5" />}
							title="Programming Languages"
							techs={contentConfig.technologies.programmingLanguages}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Terminal className="size-5" />}
							title="Frontend Development"
							techs={contentConfig.technologies.frontend}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Server className="size-5" />}
							title="Backend Development"
							techs={contentConfig.technologies.backend}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Database className="size-5" />}
							title="Databases & Infrastructure"
							techs={contentConfig.technologies.infrastructure}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Monitor className="size-5" />}
							title="Operating Systems"
							techs={contentConfig.technologies.operatingSystems}
						/>
					</div>
				</div>
			</section>

			{/* Featured Projects */}
			<section aria-labelledby="projects-heading" className="border-t bg-muted/30 py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-5xl">
						<h2 id="projects-heading" className="mb-4 text-center text-3xl font-bold">
							Featured Projects
						</h2>
						<p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
							Personal projects, open-source libraries, and tools I&apos;m building
						</p>

						<FeaturedProjects />

						<div className="mt-8 text-center flex flex-col gap-2 max-w-full	items-center">
							<p className="mx-auto max-w-2xl text-center text-muted-foreground text-base my-1">
								View open-sourced code on GitHub
							</p>
							<div className='flex gap-4 items-center justify-center flex-wrap'>
								<Button asChild variant="secondary" className="gap-2" >
								<Link
									href={`https://github.com/${site.social.github}`}
									target="_blank"
									rel="noopener noreferrer">
										<GitHubIcon className='size-4'/><ArrowLeft className="size-3" /> 
									my profile 
					
								</Link>
							</Button>
							{site.social.githubOrg && (
								<Button asChild variant="secondary" className="gap-2">
									<Link
										href={`https://github.com/${site.social.githubOrg}`}
										target="_blank"
										rel="noopener noreferrer">
										{site.social.githubOrg} 
										<ArrowRight className="size-3" />
										<GitHubIcon className='size-4'/>
									</Link>
								</Button>
							)}
							</div>
								<p className="mt-6 text-sm text-muted-foreground">
									<Link
								href={`https://github.com/${site.social.github}/about-me`}
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-1 transition-colors underline-offset-3 hover:text-foreground">
								Explore source code
							</Link> of this web page
								</p>
						</div>
					</div>
				</div>
			</section>

				<ContactSection />
			</main>
		</>
	)
}

// About Card Helper Component
const AboutCard: FunctionComponent<{
	icon: React.ReactNode
	title: string
	description: string
	endIcon?: React.ReactNode
}> = ({icon, title, description, endIcon}) => (
	<Card className="group transition-all hover:shadow-md">
		<CardHeader className="">
			<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
				{icon}
			</div>
			<CardTitle className="text-lg">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-sm text-muted-foreground">{description}{endIcon}</p>
		</CardContent>
	</Card>
)

export default AboutMeContent
