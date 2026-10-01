import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const layerColor: string[] = [
  "#334155", // slate-700
  "#1d4ed8", // blue-700
  "#be123c", // rose-700
  "#b45309", // amber-700
  "#6b21a8", // purple-700
];

export default function LayeredPinningReverse() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });
      const layers = gsap.utils.toArray<HTMLDivElement>(".layer");

      gsap.set(layers, {
        backgroundColor: gsap.utils.wrap(layerColor),
        color: "white",
      });

      const layerTween = gsap.to(".layer:not(:last-child)", {
        yPercent: -100,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: container.current,
          scrub: 1,
          pin: true,
          start: "top top",
          end: "+=5000",
          markers: true,
        },
      });

      layers.forEach((layer, index) => {
        gsap.set(layer, { zIndex: layerColor.length - index });
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div className="h-100 text-5xl text-center font-bold flex flex-col justify-center items-center bg-blue-400">
        Layered Pinning Demo - REVERSE <br />
      </div>

      <div
        ref={container}
        className="layer-wrapper h-dvh w-full relative overflow-hidden opacity-0"
      >
        {Array.from({ length: layerColor.length }, (_, index) => {
          return (
            <div
              key={index}
              className="layer h-full w-full text-5xl font-bold flex flex-col justify-center items-center absolute"
            >
              Layer {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
