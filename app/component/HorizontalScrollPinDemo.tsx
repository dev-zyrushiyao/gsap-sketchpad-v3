import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

const races: string[] = [
  "Monaco",
  "Austria",
  "Hungary",
  "Netherlands",
  "Japan",
];

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollPinDemo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const races = container.current?.querySelector<HTMLDivElement>(".races");
      if (!races) return;

      //set background of last child
      gsap.set(races.lastElementChild, { backgroundColor: "white" });

      function getAmountToScroll(): number {
        if (!races) return 0;
        return races.scrollWidth - window.innerWidth;
      }

      //.races - vertical scroll animation
      const textTween = gsap.fromTo(
        races,
        {
          x: () => {
            return window.innerWidth; //moved the items on the edge}
          },
        },
        {
          duration: 10,
          x: () => -getAmountToScroll(),
          ease: "none",
        },
      );

      //.races vertical scroll - animate flex element to -xAxis
      //trigger changed to races.parentElement to include the .map class
      ScrollTrigger.create({
        trigger: races.parentElement,
        animation: textTween,
        start: "top 20%",
        // end: () => `+=${getAmountToScroll()}`,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        markers: true,
      });

      //races container animation
      const racesContainer =
        races.querySelectorAll<HTMLDivElement>(".races-container");

      //maps
      const raceTrack = gsap.utils.toArray<HTMLDivElement>(
        ".race-track",
        container.current,
      );

      //races container ST - horizontal scroll
      racesContainer.forEach((cont, index) => {
        const heading = cont.querySelector(":scope h2");
        const raceTrackTl = gsap
          .timeline({ paused: true })
          .from(raceTrack[index], { rotate: -30, opacity: 0 });
        ScrollTrigger.create({
          trigger: cont,
          start: `left center`,
          end: "right center",
          markers: true,
          animation: gsap.from(heading, {
            scale: 0.2,
            opacity: 0.2,
            ease: "back.out",
          }),
          scrub: 1,
          onToggle: (self) => {
            return self.isActive ? raceTrackTl.play() : raceTrackTl.pause(0);
          },
          containerAnimation: textTween,
        });
      });
    },
    { scope: container },
  );

  return (
    <div className="overflow-hidden">
      <div className="h-dvh w-full bg-gray-600 flex flex-col justify-center items-center text">
        <h3 className="text-5xl font-bold text-white">
          Horizontal Scroll Pin Demo
        </h3>
      </div>
      <div ref={container} className="wrapper w-full bg-black">
        <div className="races-country">
          <h3 className="text-5xl text-white font-bold">Race Tracks:</h3>
          <div className="races w-fit flex flex-row gap-100">
            {races.map((race, index) => {
              return (
                // 200 x-padding to reach the scroll trigger of the last child element
                // or maka the names long
                <div key={index} className="races-container px-200">
                  <h2 className="text-[clamp(100px,30vh,30vh)] font-bold text-red-600">
                    {race}
                    {/* myrat */}
                  </h2>
                </div>
              );
            })}
          </div>
          <div className="race-track-wrapper h-50 w-full outline-1 outline-red-400 flex flex-row justify-center gap-10 relative">
            {races.map((race, index) => {
              return (
                <div
                  key={index}
                  className="race-track h-50 w-50 bg-blue-500 rounded-2xl text-2xl text-white flex flex-col justify-center items-center absolute"
                >
                  {race}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-dvh w-full bg-amber-200"></div>
    </div>
  );
}
