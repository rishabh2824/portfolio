import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/utils/utils";
import { Button } from "./ui/button";

const SlideShow = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: images.length > 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Bumped by every manual navigation so the autoplay effect below tears
  // down and restarts its timer — otherwise a manual click could be
  // immediately overridden by an autoplay tick already in flight.
  const [autoplayTick, setAutoplayTick] = useState(0);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
    setAutoplayTick((t) => t + 1);
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
    setAutoplayTick((t) => t + 1);
  };

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    setAutoplayTick((t) => t + 1);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || images.length <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);

    return () => window.clearInterval(interval);
  }, [emblaApi, images.length, isPaused, autoplayTick]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="overflow-hidden px-12" ref={emblaRef}>
        <div className="flex gap-4">
          {images.map((image, idx) => (
            <div key={`${image}-${idx}`} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted/30">
                <Image
                  src={image}
                  alt="screenshot"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous screenshot"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 size-9 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next screenshot"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 size-9 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
          >
            <ChevronRight className="size-4" />
          </Button>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex gap-2">
              {images.map((image, idx) => (
                <button
                  key={`dot-${image}-${idx}`}
                  type="button"
                  aria-label={`Go to screenshot ${idx + 1}`}
                  onClick={() => scrollTo(idx)}
                  className={cn(
                    "size-2 rounded-full bg-muted-foreground/40 transition-colors",
                    selectedIndex === idx && "bg-foreground",
                  )}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setIsPaused((p) => !p)}
              className="size-6 rounded-full"
            >
              {isPaused ? (
                <Play className="size-3" />
              ) : (
                <Pause className="size-3" />
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default SlideShow;
