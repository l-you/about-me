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
	Gamepad2,
	Lightbulb,
	Mail,
	MapPin,
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
import {ProjectCard} from './components/ProjectCard'
import Image from 'next/image'

const AboutMeContent: FunctionComponent = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
				<div className="container relative mx-auto px-4 py-12 md:py-16">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-20 md:mb-10 flex justify-center overflow-visible">
							<div className="relative">
								<div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-accent/20 blur-md" />
								<div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-border bg-card overflow-hidden shadow-lg">
									<Image
										src="https://2.gravatar.com/avatar/eb7387f4ea2542d6d90e970a9180ea931ece91bf0e826ba175e46d6fc7ccb585?size=256"
										alt="l-you avatar"
										width={128}
										height={128}
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

						<h1 className="mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
							Hey, I&apos;m{' '}
							<span className="text-primary">l-you</span>
						</h1>

						<p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
							A <span className="font-semibold text-foreground">Full-Stack Developer</span> generating revenue since 2018.<br/>
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
								Web
							</Badge>
							<Badge
								variant="outline"
								className="gap-1.5 px-3 py-1">
								<Rocket className="size-3.5" />
								Senior Engineer
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
									href="https://github.com/l-you"
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
			<section className="border-t bg-muted/30 py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl">
						<h2 className="mb-12 text-center text-3xl font-bold">
							About Me
						</h2>

						<div className="grid gap-6 md:grid-cols-3">
							<AboutCard
								icon={<Lightbulb className="size-5" />}
								title="KISS Principle"
								description="Keeping the architecture simple and stupid (KISS). Ensuring low resource usage by utilizing the most appropriate technologies."
							/>
							<AboutCard
								icon={<Wrench className="size-5" />}
								title="UI/UX Focus"
								description="Crafting simple, eye-friendly UI and delivering a smooth UX. Every pixel matters. ❤️"
							/>
						
							<AboutCard
								icon={<Rocket className="size-5" />}
								title="Innovation Driven"
								description="I have a desire for innovation and improvement, replacing outdated code with cutting-edge technologies 🚀"
							/>
							<AboutCard
								icon={<Zap className="size-5" />}
								title="Codebase Rescuer"
								description="Hardened by dealing with tons of legacy code. Solving problems nobody wants to solve. ⚡"
							/>
							<AboutCard
								icon={<Rocket className="size-5" />}
								title="Details Matter"
								description="I enjoy paying attention to small details which, as practice shows, increase the conversion rate significantly."
							/>
							<AboutCard
								icon={<BookOpen className="size-5" />}
								title="Lifestyle and software"
								description="I believe that learning a variety of information and skills in life enables the brain to produce better software."
							/>
						</div>

					</div>
				</div>
			</section>

			{/* Tech Stack Section */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-5xl">
						<h2 className="mb-4 text-center text-3xl font-bold">
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
					</div>
				</div>
			</section>

			{/* Featured Projects */}
			<section className="border-t bg-muted/30 py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-5xl">
						<h2 className="mb-4 text-center text-3xl font-bold">
							Featured Projects
						</h2>
						<p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
							Personal projects, open-source libraries, and tools I&apos;m building
						</p>

						<div className="grid gap-6 md:grid-cols-2">
							{contentConfig.featuredProjects.map((project) => (
								<ProjectCard
									key={project.title}
									title={project.title}
									description={project.description}
									stars={project.stars}
									language={project.language}
									icon={project.icon === 'gamepad' ? <Gamepad2 className="size-5" /> : project.icon === 'revotale'? <Image src="/icons/revotale.svg" alt="Revotale Logo" width={16} height={16} className="size-5"/> : null}
									href={project.href}
								/>
							))}
						</div>

						<div className="mt-8 text-center flex flex-col gap-2 max-w-full	items-center">
							<p className="mx-auto max-w-2xl text-center text-muted-foreground text-base my-1">
								View open-sourced code on GitHub
							</p>
							<div className='flex gap-4 items-center justify-center flex-wrap'>
								<Button asChild variant="secondary" className="gap-2" >
								<Link
									href="https://github.com/RevoTale"
									target="_blank"
									rel="noopener noreferrer">
										<GitHubIcon className='size-4'/><ArrowLeft className="size-3" /> 
									my profile 
					
								</Link>
							</Button>
							<Button asChild variant="secondary" className="gap-2">
								<Link
									href="https://github.com/RevoTale"
									target="_blank"
									rel="noopener noreferrer">
									RevoTale 
									<ArrowRight className="size-3" />
									<GitHubIcon className='size-4'/>
								</Link>
							</Button>
							</div>
								<p className="mt-6 text-sm text-muted-foreground">
									<Link
								href="https://github.com/l-you/about-me"
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-1 underline-offset-2 transition-colors underline-offset-3 hover:text-foreground">
								Explore source code
							</Link> of this web page
								</p>
						</div>
					</div>
				</div>
			</section>

			<ContactSection />
		</div>
	)
}

// About Card Helper Component
const AboutCard: FunctionComponent<{
	icon: React.ReactNode
	title: string
	description: string
}> = ({icon, title, description}) => (
	<Card className="group transition-all hover:shadow-md">
		<CardHeader className="">
			<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
				{icon}
			</div>
			<CardTitle className="text-lg">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-sm text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
)

export default AboutMeContent
