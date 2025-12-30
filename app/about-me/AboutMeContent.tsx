import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import contentConfig from '@/config/content.json'
import {
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
				<div className="container relative mx-auto px-4 py-16 md:py-24">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-6 flex justify-center">
							<div className="relative">
								<div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-accent/20 blur-md" />
								<div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-border bg-card text-4xl font-bold shadow-lg">
									👋
								</div>
							</div>
						</div>

						<h1 className="mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
							Hey, I&apos;m{' '}
							<span className="text-primary">l-you</span>
						</h1>

						<p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
							A {' '}
							<span className="font-semibold text-foreground">
								Full-Stack Developer
							</span>{' '}
							generating revenue since 2018.💸 <br/>
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
			<section className="border-t bg-muted/30 py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl">
						<h2 className="mb-12 text-center text-3xl font-bold">
							About Me
						</h2>

						<div className="grid gap-6 md:grid-cols-3">
							<AboutCard
								icon={<Lightbulb className="size-5" />}
								title="KISS Principle"
								description="Keeping the architecture simple, stupid. Ensuring low resource usage by utilizing the most appropriate technologies."
							/>
							<AboutCard
								icon={<Wrench className="size-5" />}
								title="UI/UX Focus"
								description="Crafting simple, eye-friendly UI and delivering a smooth UX. Every pixel matters. ❤️"
							/>
						
							<AboutCard
								icon={<Rocket className="size-5" />}
								title="Innovation Driven"
								description="I have an desire for innovation and improvement replacing outdated code with cutting-edge technologies 🚀"
							/>
							<AboutCard
								icon={<Zap className="size-5" />}
								title="Codebase Rescuer"
								description="Hardened by dealing with tons of legacy code. Solving problems nobody want to solve. ⚡"
							/>
							<AboutCard
								icon={<Rocket className="size-5" />}
								title="Details Matter"
								description="I enjoy paying attention to small details which, as practice shows, increase the conversion rate so good."
							/>
							<AboutCard
								icon={<BookOpen className="size-5" />}
								title="Lifestyle and software"
								description="I believe that learning a variety of information and skills in life creates conditions for our brain to produce better software."
							/>
						</div>

					</div>
				</div>
			</section>

			{/* Tech Stack Section */}
			<section className="py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-5xl">
						<h2 className="mb-4 text-center text-3xl font-bold">
							Technologies & Tools
						</h2>
						<p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
							Extensive experience with modern development stack
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
			<section className="border-t bg-muted/30 py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-5xl">
						<h2 className="mb-4 text-center text-3xl font-bold">
							Featured Projects
						</h2>
						<p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
							Personal projects, open-source libraries and tools I&apos;m building
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

						<div className="mt-8 text-center flex flex-col gap-2 max-w-full ">
							<p className="mx-auto max-w-2xl text-center text-muted-foreground text-base my-1">
								View open-sourced code on GitHub
							</p>
							<div className='flex gap-4 items-center justify-center flex-wrap'>
								<Button asChild variant="secondary" className="gap-2" >
								<Link
									href="https://github.com/RevoTale"
									target="_blank"
									rel="noopener noreferrer">
										<ArrowLeft className="size-3" />
									l-you&apos;s profile
					
								</Link>
							</Button>
							<Button asChild variant="secondary" className="gap-2">
								<Link
									href="https://github.com/RevoTale"
									target="_blank"
									rel="noopener noreferrer">
									RevoTale org
									<ArrowRight className="size-3" />
									
								</Link>
							</Button>
							</div>
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
