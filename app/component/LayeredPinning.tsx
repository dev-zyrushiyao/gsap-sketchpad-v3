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

export default function LayeredPinning() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });
      const layers = gsap.utils.toArray<HTMLDivElement>(".layer");

      gsap.set(layers, {
        backgroundColor: gsap.utils.wrap(layerColor),
        color: "white",
      });

      layers.forEach((layer, index) => {
        ScrollTrigger.create({
          trigger: layer,
          scrub: 1,
          pin: true,
          start: "top top",
          end: "+=2000",
          pinSpacing: false,
          markers: true,
        });
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div className="h-100 text-5xl text-center font-bold flex flex-col justify-center items-center bg-mist-400">
        Layered Pinning Demo <br />
        without animation
      </div>
      <div ref={container} className="layer-wrapper opacity-0">
        {Array.from({ length: layerColor.length }, (_, index) => {
          return (
            <div
              key={index}
              className="layer h-dvh text-5xl font-bold flex flex-col justify-center items-center"
            >
              Layer {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
