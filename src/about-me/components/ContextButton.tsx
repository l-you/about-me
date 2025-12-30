import {Button} from '@/components/ui/button'

import { ExternalLink} from 'lucide-react'
import Link from 'next/link'
import {type FunctionComponent} from 'react'
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

export default ContactButton