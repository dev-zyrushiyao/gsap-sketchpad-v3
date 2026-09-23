import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // const messageTl = gsap
      //   .timeline()
      //   .set(".message", { autoAlpha: 0 })
      //   .from(".message", { duration: 1, autoAlpha: 1, y: 200, ease: "back" });
      // ScrollTrigger.create({
      //   trigger: container.current,
      //   animation: messageTl,
      //   start: "75% bottom",
      //   // end: "bottom bottom",
      //   // markers: true,
      //   toggleActions: "play none none reverse",
      //   toggleClass: { targets: ".message", className: "active" },
      //   // fastScrollEnd: true,
      // });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="wrapper">
      <div
        id="top"
        className="text-5xl h-dvh w-full flex flex-col justify-center items-center text-center bg-green-300"
      >
        <h2>
          Demo of jumping to section and fixed CTA at the bottom with
          ScrollTrigger (open this component as solo because it can block bottom
          elements of other components) <br />
          Section 1
        </h2>
      </div>
      <div className="text-5xl h-dvh w-full flex flex-col justify-center items-center bg-yellow-300">
        <h2>Section 2</h2>
      </div>
      <div className="text-5xl h-dvh w-full flex flex-col justify-center items-center bg-pink-300">
        <h2>Section 3</h2>
      </div>
      <div className="text-5xl h-dvh w-full flex flex-col justify-center items-center bg-blue-300">
        <h2>Section 4</h2>
      </div>
      {/* <div className="flex flex-col items-center fixed bottom-0 w-full overflow-clip">
        <div className="message bg-orange-200 w-fit h-fit p-10 [&.active]:bg-green-500">
          <a href="#top" className="text-2xl">
            Back to the top
          </a>
        </div>
      </div> */}
    </div>
  );
}
