"use client";

import PinSpacingDemo from "./component/PinSpacingDemo";
import BlankDiv from "./component/BlankDiv";
import ParallaxDemo from "./component/ParallaxDemo";

import MultiSectionScroll from "./component/MultiSectionScroll";
import LocomotiveScrollDemo from "./component/LocomotiveScrollDemo";
import ScrollIntro from "./component/ScrollIntro";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import SectionDemo from "./component/SectionDemo";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window, // The browser window itself
          content: document.documentElement, // The entire page HTML
          lerp: 0.08,
          duration: 2,
          smoothWheel: true,
        },
        initCustomTicker: (render) => {
          gsap.ticker.add(render);
        },
        destroyCustomTicker: (render) => {
          gsap.ticker.remove(render);
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <PinSpacingDemo />
      <BlankDiv />
      <ParallaxDemo />
      <BlankDiv />
      <MultiSectionScroll />
      <LocomotiveScrollDemo />
      <ScrollIntro />
      <BlankDiv />
      <SectionDemo />
      <BlankDiv />
      <BlankDiv />
    </div>
  );
}
