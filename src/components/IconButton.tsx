import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { memo } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  rounded?: "default" | "none" | "sm" | "md" | "lg" | "full";
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  "data-aos"?: string;
}

function LinkButton({
  children,
  variant,
  rounded = "md",
  size = "xs",
  className = "",
  "data-aos": dataAos,
}: IProps) {
  return (
    <span
      className={cn(buttonVariants({ className, size, rounded, variant }))}
      data-aos={dataAos}
    >
      {children}
    </span>
  );
}

export default memo(LinkButton);
