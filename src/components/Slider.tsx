import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Slider({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className={`w-full max-w-full ${className}`}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
