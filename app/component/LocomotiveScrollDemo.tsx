import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function LocomotiveScrollDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const heading = container.current?.querySelector("h3");
      if (!heading) return;

      const split = SplitText.create(heading, { type: "chars" });

      const tween = gsap.from(split.chars, {
        y: 500,
        opacity: 0,
        ease: "back",
        stagger: 0.05,
      });

      // //instance of locomotive
      // //on locomotiveScroll v5 there is no need to sync it with scrollerProxy.
      // //locomotiveScroll can be used as is using lenisOptions
      // const locomotiveScroll = new LocomotiveScroll({
      //   lenisOptions: {
      //     wrapper: window, // The browser window itself
      //     content: document.documentElement, // The entire page HTML
      //     lerp: 0.08,
      //     duration: 2,
      //     smoothWheel: true,
      //   },
      //   initCustomTicker: (render) => {
      //     gsap.ticker.add(render);
      //   },
      //   destroyCustomTicker: (render) => {
      //     gsap.ticker.remove(render);
      //   },
      // });

      // //OPTIONAL - sync the locomotive and scroll trigger
      // //if you use initCustomTicker and DestroyCustomTicker of lenisOption you don't necessary need this.
      // locomotiveScroll.lenisInstance?.on("scroll", ScrollTrigger.update);
      // gsap.ticker.lagSmoothing(0);

      // //scroll Trigger instance
      ScrollTrigger.create({
        trigger: ".heading-wrapper",
        animation: tween,
        // markers: true,
        start: "center center",
        end: "+=500",
        scrub: true,
        pin: true,
      });

      // ScrollTrigger.refresh();

      // //clean up
      // return () => {
      //   split.revert();
      //   locomotiveScroll.destroy();
      // };
    },
    { scope: container },
  );

  return (
    <div ref={container} className="scroll-wrapper w-full h-fit overflow-clip">
      <div className="w-full h-dvh bg-amber-200 flex justify-center items-center">
        <p className="text-5xl inline">
          Demo using Locomotive Scroll Dependency + Scroll Trigger and sync them
          using ScrollTrigger.scrollerProxy()
        </p>
      </div>
      <div className="w-full h-fit p-20 flex flex-col gap-20">
        <h2 className="text-7xl font-bold">Title</h2>
        <div className="paragraph-wrapper text-2xl flex flex-col gap-10">
          {Array.from({ length: 7 }, (_, index) => {
            return (
              <p key={index}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                repudiandae temporibus cumque? Natus nobis reiciendis impedit
                optio odit. Dicta libero aperiam iure eveniet dolores harum
                officiis quae neque itaque deserunt? Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Accusamus est velit similique sit
                accusantium qui, vero cum repellat adipisci enim nobis, omnis
                error voluptatum eius officiis! Consequuntur animi magnam
                obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Qui quos tempora illo temporibus magnam ducimus quibusdam
                iusto vitae labore illum harum eius quisquam dicta dolores,
                nostrum molestias consectetur rerum nam. Dolorum et nesciunt
                fuga magni quibusdam sed. Cupiditate qui reprehenderit neque
                nemo inventore odit aperiam, enim accusantium deserunt id
                corporis!
              </p>
            );
          })}
        </div>
      </div>
      <div className="heading-wrapper w-full h-dvh bg-blue-200 p-20 flex flex-col gap-20 justify-center items-center">
        <h3 className=" text-7xl capitalize">scrub animation</h3>
      </div>
      <div className="w-full h-fit p-20 flex flex-col gap-20">
        <h2 className="text-7xl font-bold">Title</h2>
        <div className="paragraph-wrapper text-2xl flex flex-col gap-10">
          {Array.from({ length: 5 }, (_, index) => {
            return (
              <p key={index}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                repudiandae temporibus cumque? Natus nobis reiciendis impedit
                optio odit. Dicta libero aperiam iure eveniet dolores harum
                officiis quae neque itaque deserunt? Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Accusamus est velit similique sit
                accusantium qui, vero cum repellat adipisci enim nobis, omnis
                error voluptatum eius officiis! Consequuntur animi magnam
                obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Qui quos tempora illo temporibus magnam ducimus quibusdam
                iusto vitae labore illum harum eius quisquam dicta dolores,
                nostrum molestias consectetur rerum nam. Dolorum et nesciunt
                fuga magni quibusdam sed. Cupiditate qui reprehenderit neque
                nemo inventore odit aperiam, enim accusantium deserunt id
                corporis!
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
