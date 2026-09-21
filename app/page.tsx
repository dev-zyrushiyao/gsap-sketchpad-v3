"use client";

import PinSpacingDemo from "./component/PinSpacingDemo";
import BlankDiv from "./component/BlankDiv";
import ParallaxDemo from "./component/ParallaxDemo";

import MultiSectionScroll from "./component/MultiSectionScroll";

export default function Home() {
  return (
    <div>
      <PinSpacingDemo />
      <BlankDiv />
      <ParallaxDemo />
      <BlankDiv />
      <MultiSectionScroll />
    </div>
  );
}
