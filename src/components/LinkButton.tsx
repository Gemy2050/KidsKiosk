import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { memo } from "react";

interface IProps {
  children: React.ReactNode;
  to: string;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  rounded?: "default" | "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  fullWidth?: boolean;
  "data-aos"?: string;
}

function LinkButton({
  children,
  className,
  to,
  fullWidth,
  size = "default",
  variant = "default",
  rounded = "default",
  "data-aos": dataAos,
}: IProps) {
  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({
          size,
          variant,
          rounded,
          className,
          fullWidth,
        })
      )}
      data-aos={dataAos}
    >
      {children}
    </Link>
  );
}

export default memo(LinkButton);
