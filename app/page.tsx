"use client";

import Image from "next/image";
import PlaceholderComp from "./component/PlaceholderComp";
import BlankDiv from "./component/BlankDiv";

export default function Home() {
  return (
    <div>
      <PlaceholderComp />
      <BlankDiv />
    </div>
  );
}
