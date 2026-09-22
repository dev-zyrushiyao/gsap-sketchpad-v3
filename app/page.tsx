"use client";

import PinSpacingDemo from "./component/PinSpacingDemo";
import BlankDiv from "./component/BlankDiv";
import ParallaxDemo from "./component/ParallaxDemo";

import MultiSectionScroll from "./component/MultiSectionScroll";
import LocomotiveScrollDemo from "./component/LocomotiveScrollDemo";
import ScrollIntro from "./component/ScrollIntro";

export default function Home() {
  return (
    <div>
      <PinSpacingDemo />
      <BlankDiv />
      <ParallaxDemo />
      <BlankDiv />
      <MultiSectionScroll />
      <LocomotiveScrollDemo />
      <ScrollIntro />
    </div>
  );
}
