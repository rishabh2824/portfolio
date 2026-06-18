import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const SlideShow = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: images.length > 1,
  });
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

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
    if (!emblaApi || images.length <= 1 || selectedImage) return;

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);

    return () => window.clearInterval(interval);
  }, [emblaApi, images.length, selectedImage]);

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden px-12" ref={emblaRef}>
          <div className="flex gap-4">
            {images.map((image, idx) => (
              <div key={`${image}-${idx}`} className="min-w-0 flex-[0_0_100%]">
                <motion.button
                  className="relative block w-full cursor-zoom-in"
                  onClick={() => {
                    setSelectedImage(image);
                  }}
                  initial="idle"
                  whileHover="hover"
                  whileFocus="hover"
                >
                  <Image
                    src={image}
                    alt="screenshot"
                    width={1000}
                    height={1000}
                    className="h-auto w-full rounded-lg"
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 text-sm text-white/90 backdrop-blur-[2px]"
                    variants={{
                      idle: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Click to zoom
                  </motion.div>
                </motion.button>
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
            <div className="mt-4 flex justify-center gap-2">
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
          </>
        )}
      </div>
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage("")}>
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent"
          onClick={() => setSelectedImage("")}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Screenshot</DialogTitle>
            <DialogDescription>Zoomed screenshot</DialogDescription>
          </DialogHeader>
          <motion.div>
            <Image
              src={selectedImage || ""}
              alt="screenshot"
              width={1080}
              height={1080}
              className="h-auto max-h-[90vh] w-full rounded-lg"
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SlideShow;
