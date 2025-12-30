'use client'
import {Separator} from '@/components/ui/separator'
import {BookOpen, ChevronDown, ExternalLink} from 'lucide-react'
import {useMemo, type FunctionComponent} from 'react'
import { NpmIcon, PackagistIcon} from './Icons'
import { Button } from '@/components/ui/button'
import { usePathname, useSearchParams } from 'next/navigation'
import ContactButton from './ContextButton'
import Link from 'next/link'
const MoreContactsSection:FunctionComponent = () => {
    const searchParams = useSearchParams()
    const isExpanded = searchParams.get('more_contacts') === '1'
    const pathname = usePathname()
 
        const toggledLink = useMemo(() => {
               const params = new URLSearchParams(searchParams.toString())
        if (isExpanded) {
             params.delete('more_contacts')
          
        } else {
             params.set('more_contacts', '1')
        }
            return `${pathname}?${params.toString()}`
        },[isExpanded, pathname, searchParams])
  
    return <div className="mt-6">
								<Button
									variant="ghost"
									className="w-full gap-2"
									 asChild>
									<Link href={toggledLink} scroll={false}>
                                    <ChevronDown
										className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
									/>
									More ways to connect
                                    </Link>
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
}
export default MoreContactsSection