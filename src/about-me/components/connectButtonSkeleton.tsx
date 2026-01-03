import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { FunctionComponent } from "react";

const connectButtonClassName = cn(buttonVariants({variant: "ghost"}),'w-full gap-2')
export {connectButtonClassName};

const ConnectButtonContent:FunctionComponent<{isExpanded: boolean}> = ({isExpanded}) => {
    return <><ChevronDown
										className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
									/>
									More ways to connect</>
}
export {ConnectButtonContent}