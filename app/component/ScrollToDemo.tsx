import Image from "next/image";
import React, { useRef } from "react";
import MonsterSVG from "@/src/monster/monster.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const colorHex: string[] = ["#c1a5d9", "#DCFCE7", "#FCE7F3"];

const navCategory: string[] = [
  "Category - 1",
  "Category - 2: Monster",
  "Category - 3",
];

export default function ScrollToDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const sectionCategory =
        container.current?.querySelectorAll(".section-category");
      if (!sectionCategory) return;

      gsap.set(sectionCategory, {
        backgroundColor: gsap.utils.wrap(colorHex),
      });

      const monsterTl = gsap
        .timeline({ id: "monsterTl", defaults: { duration: 1 } })
        .from(".monster-wrapper img", {
          scale: 0,
          ease: "elastic(0.5 , 0.3)",
        })
        .from(".monster-wrapper h2", { y: 200, opacity: 0 }, "<");

      const monsterScroll = ScrollTrigger.create({
        trigger: ".monster-category",
        animation: monsterTl,
        start: "top top",
        end: "+=300",
        scrub: 1,
        pin: true,
        markers: true,
      });

      const navWrapper =
        container.current?.querySelectorAll(".nav-wrapper > *");

      console.log(navWrapper);

      navWrapper?.forEach((element, index) => {
        element.addEventListener("click", () => {
          if (index === 1) {
            gsap.fromTo(
              window,
              {
                scrollTo: monsterScroll.start,
              },
              {
                scrollTo: { y: monsterScroll.end },
                duration: 1,
                ease: "none",
              },
            );
          } else {
            gsap.to(window, {
              duration: 1,
              scrollTo: `#category-${index + 1}`,
            });
          }
        });
      });

      console.log(navWrapper);
    },
    { scope: container },
  );
  return (
    <div ref={container}>
      <nav className="text-2xl w-full flex flex-col justify-evenly items-center gap-10 bg-gray-500 sticky top-0 p-10 z-10">
        <h3 className="text-5xl text-white">
          ScrollTo demo and ScrollTo + ScrollTrigger Combo
        </h3>
        <div className="nav-wrapper flex flex-row justify-evenly items-center w-full">
          {navCategory.map((element, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer border-2 rounded-2xl bg-amber-200 text-black p-5"
              >
                {element}
              </div>
            );
          })}
        </div>
      </nav>
      <div
        id="category-1"
        className="section-category flex flex-col justify-center items-center h-dvh"
      >
        <h3 className="text-3xl">Category 1</h3>
      </div>
      <div
        id="category-2"
        className="section-category monster-category flex flex-col justify-center items-center h-dvh"
      >
        <div className="monster-wrapper w-fit">
          <Image src={MonsterSVG} alt="monster-vector" loading="eager" />
          <h2 className="text-5xl font-bold text-center p-5">I am Mike</h2>
        </div>
      </div>
      <div
        id="category-3"
        className="section-category  flex flex-col justify-center items-center h-dvh"
      >
        <h3 className="text-3xl">Category 3</h3>
      </div>
    </div>
  );
}
