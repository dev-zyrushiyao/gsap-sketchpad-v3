import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollDemo() {
  const container = useRef<HTMLDivElement>(null);

  const sectionColor: string[] = [
    "#334155", // slate-700
    "#1d4ed8", // blue-700
    "#be123c", // rose-700
    "#b45309", // amber-700
  ];

  useGSAP(
    () => {
      gsap.set(".wrapper", { opacity: 1 });

      const sections = gsap.utils.toArray<HTMLDivElement>(".section");
      gsap.set(sections, { backgroundColor: gsap.utils.wrap(sectionColor) });

      const masterTl = gsap.timeline();

      sections.forEach((section, index) => {
        const sectionTween = gsap.to(section, {
          xPercent: -100 * index,
          ease: "none",
          duration: 1,
        });

        masterTl.add(sectionTween);
      });

      ScrollTrigger.create({
        trigger: container.current,
        animation: masterTl,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      });

      //   gsap.to(container.current, { xPercent: -50 });
    },
    { scope: container },
  );

  return (
    <div className="overflow-clip">
      <div className="bg-amber-400 h-dvh flex flex-col justify-center items-center">
        <h3 className="text-4xl font-bold">Horizontal Scroll Demo</h3>
      </div>
      <div ref={container}>
        <div className="wrapper w-fit flex flex-row opacity-0">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <div
                key={index}
                className="section h-dvh w-screen shrink-0 flex flex-col justify-center items-center text-5xl text-white font-bold"
              >
                section {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-slate-700 h-dvh flex flex-col justify-center items-center">
        <h3 className="text-4xl font-bold text-white">Section 5</h3>
      </div>
    </div>
  );
}
