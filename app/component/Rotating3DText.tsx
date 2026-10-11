import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

const message: string[] = ["HELLO WORLD", "I am Zyrus", "Good evening"];

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Rotating3DText() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //FOUC (Flash of unstyled content)
      gsap.set(container.current, { opacity: 1 });

      //h3 - element
      const highlightOff =
        container.current?.querySelectorAll<HTMLHeadingElement>(
          ".highlight-off",
        );
      //h3 - element
      const highlightOn =
        container.current?.querySelectorAll<HTMLHeadingElement>(
          ".highlight-on",
        );
      //parent
      const headers = gsap.utils.toArray<HTMLDivElement>(
        ".header",
        container.current,
      );
      if (!highlightOff || !highlightOn || !headers) return;

      //perspective parent<h3> for SplitText <div>
      gsap.set([highlightOff, highlightOn], {
        perspective: 600,
      });

      //highlight sits on top of the non-highlight element
      gsap.set(highlightOn, { yPercent: -100 });

      //loop the message[]
      //splits each h3 (highlight and non-highlight)
      //created timeline and ScrollTrigger for each element
      message.forEach((value, index) => {
        const splitHighlightOff = SplitText.create(highlightOff[index], {
          type: "chars",
        });
        const splitHighlightOn = SplitText.create(highlightOn[index], {
          type: "chars",
        });
        const headerDiv = headers[index];

        //create timeline for each loop
        const tl = gsap
          .timeline({
            paused: true,
            defaults: {
              stagger: 0.03,
              duration: 0.5,
              // transformOrigin: () => `50% 50% -${headerDiv.offsetHeight / 2}px`,
            },
          })
          .fromTo(
            splitHighlightOff.chars,
            { rotateX: 0 },
            {
              rotateX: 90,
            },
          )
          .to(splitHighlightOff.chars, { opacity: 0 }, "<")
          .from(
            splitHighlightOn.chars,
            { opacity: 0, ease: "power2.inOut" },
            "<",
          )
          .fromTo(
            splitHighlightOn.chars,
            { rotateX: -90 },
            {
              rotateX: 0,
              ease: "power2.inOut",
            },
            "<",
          );

        //headers ST
        //RESPONSIVE - adjusts its transformOrigin Z-Axis on every refresh to calibrate rotation animation when the text scales.
        ScrollTrigger.create({
          trigger: headers[index],
          start: "top center",
          animation: tl,
          toggleActions: "play none none reverse",
          // markers: true,
          onRefresh: () => {
            return gsap.set([splitHighlightOff.chars, splitHighlightOn.chars], {
              transformOrigin: `50% 50% -${headerDiv.offsetHeight / 2}px`,
            });
          },
          // invalidateOnRefresh: true,
        });
      });

      // headers.forEach((header, index) => {

      // });
    },
    { scope: container },
  );

  return (
    <div className=" ">
      <div className="h-dvh bg-amber-300 lg:text-5xl text-2xl font-bold flex flex-col justify-center items-center">
        Rotating3D Text Scroll Demo
      </div>
      <div
        ref={container}
        className="wrapper bg-black h-dvh w-full flex flex-col justify-center items-center overflow-hidden opacity-0"
      >
        {message.map((value, index) => {
          return (
            <div
              key={`${value + index}`}
              className="header text-[clamp(20px,5vw,10vw)] leading-none font-bold"
            >
              <h3 className="highlight-off text-gray-600 uppercase">{value}</h3>
              <h3 className="highlight-on text-white uppercase">{value}</h3>
            </div>
          );
        })}
      </div>
      <div className="h-100 bg-pink-300">Rotating3D Text Scroll Demo</div>
    </div>
  );
}
