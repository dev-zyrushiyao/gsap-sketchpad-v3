"use client";

import Image from "next/image";
import PinSpacingDemo from "./component/PinSpacingDemo";
import BlankDiv from "./component/BlankDiv";
import ParallaxDemo from "./component/ParallaxDemo";

export default function Home() {
  return (
    <div>
      <PinSpacingDemo />
      <BlankDiv />
      <ParallaxDemo />
      <BlankDiv />
    </div>
  );
}
