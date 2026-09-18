import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PinSpacingDemo() {
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
        start: "800px center",
        end: "+=300",
        scrub: 1,
        pin: true,
        pinSpacing: false,
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="flex flex-col justify-end items-center w-full h-dvh bg-amber-200"
    >
      <p>
        Scroll pin-spacer sit on top of the next container/div and with element
        having the same background as current wrapper it gives an illusion of
        sticky for scroll-area
      </p>
      <h3 className="text-4xl font-bold   bg-amber-200 h-20">
        Demo of pinSpacing: false
      </h3>
    </div>
  );
}
