'use client'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {
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
							A passionate{' '}
							<span className="font-semibold text-foreground">
								Full-Stack Developer
							</span>{' '}
							who has been increasing business revenue since 2018.
							💸
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
								127.0.0.1
							</Badge>
							<Badge
								variant="outline"
								className="gap-1.5 px-3 py-1">
								<Rocket className="size-3.5" />
								3,800+ Contributions/Year
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
								description="Hardened by dealing with tons of legacy code, I have an unbridled desire for innovation and improvement. 🚀"
							/>
						</div>

						<Card className="mt-8">
							<CardContent className="pt-6">
								<div className="flex items-start gap-4">
									<div className="rounded-lg bg-accent/50 p-3">
										<BookOpen className="size-6 text-primary" />
									</div>
									<div>
										<h3 className="mb-2 font-semibold">
											Continuous Learner
										</h3>
										<p className="text-muted-foreground">
											I love updating existing code with
											cutting-edge technologies. Learning
											as much information as possible
											about this world helps making better
											the ins and outs of the project. 📚
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
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
							techs={programmingLanguages}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Terminal className="size-5" />}
							title="Frontend Development"
							techs={frontendTechs}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Server className="size-5" />}
							title="Backend Development"
							techs={backendTechs}
						/>
						<Separator className="my-6" />
						<TechCategory
							icon={<Database className="size-5" />}
							title="Databases & Infrastructure"
							techs={infraTechs}
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
							Open-source libraries and tools I&apos;ve built
						</p>

						<div className="grid gap-6 md:grid-cols-2">
							<ProjectCard
								title="next-scroll-restorer"
								description="Scroll restoration for Next.js apps built with app directory. Fixed bugs that Next.js team do not fix."
								stars={107}
								language="TypeScript"
								href="https://github.com/RevoTale/next-scroll-restorer"
							/>
							<ProjectCard
								title="obsidian-folder-by-tags"
								description="Automatically group Obsidian notes into folders by tags specified in the note."
								stars={12}
								language="TypeScript"
								href="https://github.com/RevoTale/obsidian-folder-by-tags-distributor"
							/>
							<ProjectCard
								title="react-grecaptcha-v3"
								description="Performance-friendly integration of Google reCAPTCHA v3 into React. Keep your PageSpeed Insights high."
								stars={3}
								language="TypeScript"
								href="https://github.com/RevoTale/react-grecaptcha-v3"
							/>
							<ProjectCard
								title="Sea Battle Game"
								description="Browser Battleship with shareable link to play with others. Backend: Go; Frontend: Next.js."
								icon={<Gamepad2 className="size-4" />}
								href="https://revotale.com/sea-battle-game"
							/>
						</div>

						<div className="mt-8 text-center">
							<Button asChild variant="outline" className="gap-2">
								<Link
									href="https://github.com/RevoTale"
									target="_blank"
									rel="noopener noreferrer">
									View All Projects
									<ArrowRight className="size-4" />
								</Link>
							</Button>
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
		<CardHeader className="pb-3">
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

// Tech Stack Data
const programmingLanguages = [
	{name: 'TypeScript', icon: 'typescript'},
	{name: 'JavaScript', icon: 'javascript'},
	{name: 'Go', icon: 'go'},
	{name: 'PHP', icon: 'php'},
	{name: 'Rust', icon: 'rust'},
	{name: 'Bash', icon: 'bash'},
]

const frontendTechs = [
	{name: 'React', icon: 'react'},
	{name: 'Next.js', icon: 'nextjs'},
	{name: 'Tailwind CSS', icon: 'tailwindcss'},
	{name: 'HTML5', icon: 'html5'},
	{name: 'CSS3', icon: 'css3'},
	{name: 'Sass', icon: 'sass'},
]

const backendTechs = [
	{name: 'Node.js', icon: 'nodejs'},
	{name: 'Symfony', icon: 'symfony'},
	{name: 'GraphQL', icon: 'graphql'},
	{name: 'Payload CMS', icon: 'payloadcms'},
	{name: 'Gin', icon: 'go'},
]

const infraTechs = [
	{name: 'PostgreSQL', icon: 'postgresql'},
	{name: 'MySQL', icon: 'mysql'},
	{name: 'Redis', icon: 'redis'},
	{name: 'MongoDB', icon: 'mongodb'},
	{name: 'Docker', icon: 'docker'},
	{name: 'Nginx', icon: 'nginx'},
]

export default AboutMeContent
