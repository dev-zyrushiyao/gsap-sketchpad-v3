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
  "#e0f2fe", // Light skyblue (Tailwind sky-100)
  "#dcfce7", // Light green (Tailwind green-100)
  "#FFB6A0", // Light salmon (Misty Rose / Soft Salmon Pink)
  "#f3e8ff", // Light violet (Tailwind purple-100)
  "#fce7f3", // Light pink (Tailwind pink-100)
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

      function getNavHeight() {
        return navElem?.getBoundingClientRect().height || 0;
      }

      //on each loop create a dedicated scroll trigger to each section
      navItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: fullScreenDiv[index],
          animation: gsap.to(navElem, { backgroundColor: navColor[index] }),
          start: () => `top ${getNavHeight()}px`,
          end: () => `bottom ${getNavHeight()}px`,
          markers: true,
          toggleActions: "restart none none reverse",
          immediateRender: false,
        });
      });

      // Initial refresh
      ScrollTrigger.refresh();

    },
    { scope: container },
  );
  return (
    <div ref={container}>
      <nav className="nav-wrapper bg-blue-200 flex lg:flex-row flex-col justify-center items-center p-10 gap-20 sticky top-0">
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
