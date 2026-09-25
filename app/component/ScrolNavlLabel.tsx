import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

const navItems: string[] = ["Products", "Animation", "Github", "Blogs"];
const sectionColor: string[] = ["#87CEEB", "#90EE90", "#FFB6C1", "#DDA0DD"];

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ScrollNavLabel() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = gsap.utils.toArray<HTMLElement>("section");
      gsap.set(section, { backgroundColor: gsap.utils.wrap(sectionColor) });

      const listItemElement =
        container.current?.querySelectorAll<HTMLLIElement>("li");
      if (!listItemElement) return;

      gsap.set(listItemElement, { color: "gray", cursor: "pointer" });

      listItemElement.forEach((element, index) => {
        element.addEventListener("click", () => {
          gsap.to(window, {
            scrollTo: `#${navItems[index].toLowerCase()}`,
          });

          console.log(`#${navItems[index].toLowerCase()}`);
        });
      });

      //methood 1 - the toggleActions has this delay to off the animation (you can see 2 navigation as "active")
      // section.forEach((element, index) => {
      //   ScrollTrigger.create({
      //     id: `section-${index}`,
      //     trigger: element,
      //     start: "top center",
      //     end: "bottom center",
      //     markers: true,
      //     animation: gsap.to(`li:nth-child(${index + 1})`, {
      //       color: "red",
      //       fontWeight: "bold",
      //     }),
      //     toggleActions: "play reverse play reverse",
      //   });
      // });

      //method 2 - (verbose) using onToggle method toggle the navigation real time but you need to unanimate it manually (if-else)
      section.forEach((element, index) => {
        ScrollTrigger.create({
          id: `section-${index}`,
          trigger: element,
          start: "top center",
          end: "bottom center",
          markers: true,
          toggleClass: "active",
          fastScrollEnd: true,
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(`li:nth-child(${index + 1})`, {
                color: "white",
                fontWeight: "bold",
              });
            } else {
              gsap.to(`li:nth-child(${index + 1})`, {
                color: "gray",
                fontWeight: "normal",
              });
            }
          },
        });
      });

      //method 3 - onToggle using conditional values
      // section.forEach((element, index) => {
      //   ScrollTrigger.create({
      //     id: `section-${index}`,
      //     trigger: element,
      //     start: "top center",
      //     end: "bottom center",
      //     markers: true,
      //     animation: gsap.to(`li:nth-child(${index + 1})`, {
      //       color: "red",
      //       fontWeight: "bold",
      //     }),
      //     onToggle: (self) => {
      //       //conditional per object
      //       gsap.to(
      //         `li:nth-child(${index + 1})`,
      //         self.isActive
      //           ? {
      //               color: "white",
      //               fontWeight: "bold",
      //             }
      //           : { color: "gray", fontWeight: "normal" },
      //       );

      //       //or conditional per properties
      //       // gsap.to(`li:nth-child(${index + 1})`, {
      //       //   color: self.isActive ? "white" : "gray",
      //       //   fontWeight: self.isActive ? "bold" : "normal",
      //       // });
      //     },
      //   });
      // });

      //Method 5 flip the onToggle - will flicker if you set the tween element size because it doesn't have untoggle animation on changing size
      // section.forEach((element, index) => {
      //   ScrollTrigger.create({
      //     id: `section-${index}`,
      //     trigger: element,
      //     start: "top center",
      //     end: "bottom center",
      //     markers: true,
      //     animation: gsap.to(`li:nth-child(${index + 1})`, {
      //       color: "white",
      //       fontWeight: "bold",
      //     }),
      //     onToggle: (self) => {
      //       self.animation?.reversed(!self.isActive);
      //     },
      //   });
      // });
    },
    { scope: container },
  );
  return (
    <div ref={container}>
      <nav className="sticky top-0 h-0">
        <ul className="p-10">
          {navItems.map((item, index) => {
            return (
              <li key={index} className="text-3xl">
                {item}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="section-wrapper">
        {navItems.map((item, index) => {
          return (
            <section
              // style={{ flex: index }}
              key={index}
              id={item.toLowerCase()}
              className="text-6xl flex flex-col justify-center items-center w-full h-dvh "
            >
              {item}
            </section>
          );
        })}
      </div>
    </div>
  );
}
