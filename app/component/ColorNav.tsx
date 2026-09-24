import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

const navItems: string[] = ["Home", "Works", "Profile", "Downloads", "About"];
const sectionBgColor: string[] = [
  "skyblue",
  "green",
  "salmon",
  "violet",
  "pink",
];

const navColor: string[] = [
  "#bae6fd", // Slightly darker skyblue (Tailwind sky-200)
  "#bbf7d0", // Slightly darker green (Tailwind green-200)
  "#ff9e85", // Slightly darker soft salmon pink
  "#e9d5ff", // Slightly darker violet (Tailwind purple-200)
  "#f472b6", // Medium pink (Tailwind pink-400)
];

gsap.registerPlugin(ScrollTrigger);

export default function ColorNav() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const fullScreenDiv = container.current.querySelectorAll(".fullscreen");

      //sets the color section of div viewport
      gsap.set(fullScreenDiv, {
        backgroundColor: gsap.utils.wrap(sectionBgColor),
      });

      //get the nav height
      const navElem = container.current.querySelector("nav");
      if (!navElem) return;

      let navHeight: number = navElem.offsetHeight;

      //on each loop create a dedicated scroll trigger to each section
      navItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: fullScreenDiv[index],
          animation: gsap.to(navElem, { backgroundColor: navColor[index] }),
          start: () => `top ${navHeight}px`,
          end: () => `bottom ${navHeight}px`,
          // markers: true,
          toggleActions: "restart none none reverse",
          immediateRender: false,
        });
      });

      ScrollTrigger.addEventListener("refreshInit", () => {
        navHeight = navElem.offsetHeight;
      });
    },
    { scope: container },
  );
  return (
    <div ref={container}>
      {/* <nav className="nav-wrapper bg-amber-200 flex lg:flex-row flex-col justify-center items-center p-10 gap-20 sticky top-0"> */}
      <nav className="nav-wrapper bg-amber-200 flex lg:flex-row flex-col justify-center items-center p-10 gap-20  top-0">
        ColorNav Demo
        {navItems.map((item, index) => {
          return (
            <div key={index} className="text-2xl">
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => {
                  console.log("clicked");
                }}
              >
                {item}
              </a>
            </div>
          );
        })}
      </nav>
      {sectionBgColor.map((item, index) => {
        return (
          <div
            id={navItems[index].toLowerCase()}
            key={index}
            className="fullscreen w-full h-dvh bg-gray-400 text-4xl flex flex-col justify-center items-center uppercase"
          >
            {item} - {navItems[index]}
          </div>
        );
      })}
    </div>
  );
}
