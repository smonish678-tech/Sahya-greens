"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  subtitle?: string;
  supportingText?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  subtitle,
  supportingText,
  scrollToExpand,
  textBlend,
  children
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (prefersReducedMotion) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        return;
      }

      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(newProgress);
        setShowContent(newProgress >= 1);
        if (newProgress >= 1) setMediaFullyExpanded(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (prefersReducedMotion) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        return;
      }

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * scrollFactor, 0), 1);
        setScrollProgress(newProgress);
        setShowContent(newProgress >= 1);
        if (newProgress >= 1) setMediaFullyExpanded(true);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, prefersReducedMotion]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const effectiveProgress = prefersReducedMotion ? 1 : scrollProgress;
  const mediaWidth = 290 + effectiveProgress * (isMobileState ? 650 : 1280);
  const mediaHeight = 390 + effectiveProgress * (isMobileState ? 260 : 460);
  const textTranslateX = effectiveProgress * (isMobileState ? 88 : 118);
  const [firstWord = "", ...rest] = title?.split(" ") ?? [];

  return (
    <div ref={sectionRef} className="overflow-x-hidden transition-colors duration-700">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - effectiveProgress * 0.88 }}
            transition={{ duration: 0.22 }}
          >
            <Image
              src={bgImageSrc}
              alt="Misty Wayanad landscape"
              width={1920}
              height={1080}
              className="h-screen w-screen object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-[#0c1710]/45"
              animate={{ opacity: 0.62 - effectiveProgress * 0.2 }}
            />
          </motion.div>

          <div className="container-lux relative z-10 flex flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/10"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "96vw",
                  maxHeight: "88vh",
                  boxShadow: "0 34px 110px rgba(5, 18, 12, 0.42)"
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                      controls={false}
                      disablePictureInPicture
                    />
                    <motion.div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(7,17,12,0.1),rgba(7,17,12,0.56))]"
                      initial={{ opacity: 0.72 }}
                      animate={{ opacity: 0.78 - effectiveProgress * 0.28 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image src={mediaSrc} alt={title || "Estate image"} fill className="object-cover" />
                    <motion.div
                      className="absolute inset-0 bg-[#09150e]/45"
                      initial={{ opacity: 0.72 }}
                      animate={{ opacity: 0.54 - effectiveProgress * 0.22 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>

              <motion.div
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center ${
                  textBlend ? "mix-blend-screen" : ""
                }`}
                initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {date ? (
                  <p
                    className="text-xs font-medium uppercase tracking-[0.5em] text-[#eadfc8]"
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {date}
                  </p>
                ) : null}
                <motion.h1
                  className="font-serif text-[16vw] font-medium leading-[0.72] tracking-normal text-[#f8f0df] drop-shadow-[0_18px_45px_rgba(0,0,0,0.18)] md:text-[11.6vw]"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h1
                  className="font-serif text-[16vw] font-medium leading-[0.72] tracking-normal text-[#f8f0df] drop-shadow-[0_18px_45px_rgba(0,0,0,0.18)] md:text-[11.6vw]"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {rest.join(" ")}
                </motion.h1>
                <motion.div
                  className="mt-7 grid max-w-3xl gap-4 px-4 text-[#f8f0df]"
                  animate={{
                    opacity: Math.max(0, 1 - effectiveProgress * 1.35),
                    y: effectiveProgress * 18
                  }}
                >
                  {subtitle ? (
                    <p className="font-serif text-3xl leading-none md:text-5xl">{subtitle}</p>
                  ) : null}
                  {supportingText ? (
                    <p className="mx-auto max-w-xl text-sm leading-7 text-[#f8f0df]/78 md:text-base">
                      {supportingText}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a href="#philosophy" className="luxury-button inline-flex h-12 items-center justify-center bg-[#f8f0df] px-7 text-sm font-semibold text-[#173b2f]">
                      Explore
                    </a>
                    <a href="#brochure" className="luxury-button inline-flex h-12 items-center justify-center border border-[#f8f0df]/35 px-7 text-sm font-semibold text-[#f8f0df] backdrop-blur-md">
                      Download Brochure
                    </a>
                    <a href="#contact" className="luxury-button inline-flex h-12 items-center justify-center bg-[#b88a44] px-7 text-sm font-semibold text-[#173b2f]">
                      Book a Site Visit
                    </a>
                  </div>
                </motion.div>
                {scrollToExpand ? (
                  <p
                    className="mt-8 text-xs font-medium uppercase tracking-[0.44em] text-[#eadfc8]"
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {scrollToExpand}
                  </p>
                ) : null}
              </motion.div>
              <div className="absolute bottom-9 left-1/2 z-20 h-px w-44 -translate-x-1/2 overflow-hidden bg-white/18">
                <motion.div
                  className="h-full bg-gold"
                  style={{ width: `${Math.max(8, effectiveProgress * 100)}%` }}
                />
              </div>
            </div>

            <motion.section
              className="flex w-full flex-col px-0 py-0"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{
                opacity: showContent ? 1 : 0,
                filter: showContent ? "blur(0px)" : "blur(10px)"
              }}
              transition={{ duration: 0.8 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
