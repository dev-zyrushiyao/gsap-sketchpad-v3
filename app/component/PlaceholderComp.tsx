import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PlaceholderComp() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const split = SplitText.create("h3", { type: "chars" });

      const tween = gsap.from(split.chars, {
        x: -900,
        duration: 5,
        opacity: 0,
        stagger: 0.05,
      });

      ScrollTrigger.create({
        id: "PlaceHolderComp-scroll",
        trigger: container.current,
        animation: tween,
        // markers: true,
        start: "center center",
        end: "bottom 30%",
        scrub: 1,
        pin: true,
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="flex flex-col justify-center items-center w-full h-dvh bg-amber-200"
    >
      <h3 className="text-4xl font-bold  ">This is a placeholder</h3>
    </div>
  );
}
