import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import MonacoTrack from "./svg/MonacoTrack";
import AustriaTrack from "./svg/AustriaTrack";
import HungaryTrack from "./svg/HungaryTrack";
import NetherlandsTrack from "./svg/Netherlands";
import JapanTrack from "./svg/JapanTrack";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

const racesName: string[] = [
  "Monaco",
  "Austria",
  "Hungary",
  "Netherlands",
  "Japan",
];

const mapTrack = [
  MonacoTrack,
  AustriaTrack,
  HungaryTrack,
  NetherlandsTrack,
  JapanTrack,
];

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function HorizontalScrollPinDemo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (racesName.length !== mapTrack.length) {
        console.log("the Length is not equal");
        return;
      }

      const races = container.current?.querySelector<HTMLDivElement>(".races");
      if (!races) return;

      //set background of last child
      gsap.set(races.lastElementChild, { backgroundColor: "white" });

      function getAmountToScroll(): number {
        if (!races) return 0;

        //fixed code: calculates the center distance of last element to scrollable center
        const lastItem = races.lastElementChild as HTMLElement;
        const lastItemOffsetLeft = lastItem.offsetLeft;
        const centerOffset = window.innerWidth / 2 - lastItem.offsetWidth / 2;
        // return races.scrollWidth - window.innerWidth - padding;
        return lastItemOffsetLeft - centerOffset;
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
        // invalidateOnRefresh: true,
        pin: true,
        scrub: 0.5,
        markers: true,
      });

      //races container animation
      const racesContainer =
        races.querySelectorAll<HTMLDivElement>(".races-container");

      //maps - parent
      //children - SVG Component
      const mapTrackElem = gsap.utils.toArray<HTMLDivElement>(
        ".map-track",
        container.current,
      );

      //races container ST - horizontal scroll
      racesContainer.forEach((cont, index) => {
        //get the SVG Line element to animate
        const SVGInnerLine = mapTrackElem[index].querySelector(
          ":scope [id*='inner']",
        );
        //get the SVG circle element to Animate
        const SVGCircleElement =
          mapTrackElem[index].querySelector(":scope circle");

        const SVGOuterLine = mapTrackElem[index].querySelector(
          ":scope [id*='outer']",
        );

        gsap.set(SVGOuterLine, { stroke: "#212121" });

        //set the SVG starting point
        //Animation drawSVG formula : starting point + 100%
        const startingPoint: number[] = [13, 25, 15, 6, -9];
        switch (index) {
          case 0:
            gsap.set(SVGInnerLine, {
              drawSVG: `${startingPoint[index]}% ${startingPoint[index]}%`,
            });
            break;
          case 1:
            gsap.set(SVGInnerLine, {
              drawSVG: `${startingPoint[index]}% ${startingPoint[index]}%`,
            });
            break;
          case 2:
            gsap.set(SVGInnerLine, {
              drawSVG: `${startingPoint[index]}% ${startingPoint[index]}%`,
            });
            break;
          case 3:
            gsap.set(SVGInnerLine, {
              drawSVG: `${startingPoint[index]}% ${startingPoint[index]}%`,
            });
            break;
          case 4:
            gsap.set(SVGInnerLine, {
              drawSVG: `${startingPoint[index]}% ${startingPoint[index]}%`,
            });
        }
        //each index has its own mapTrackTl and ScrollTrigger
        const heading = cont.querySelector(":scope h2");
        const mapTrackTl = gsap
          .timeline({ paused: true })
          .from(mapTrackElem[index], { rotate: -30 })
          .from(mapTrackElem[index], { opacity: 0 }, "<")
          .from(
            SVGCircleElement,
            {
              duration: 1,
              scale: 0,
              ease: "back",
              transformOrigin: "50% 50%",
            },
            "<",
          )
          .to(
            SVGInnerLine,
            {
              drawSVG: `${startingPoint[index]}% ${startingPoint[index] + 100}%`,
              duration: 1,
            },
            "<",
          );

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
          scrub: 0.5,
          onToggle: (self) => {
            return self.isActive ? mapTrackTl.play() : mapTrackTl.pause(0);
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
          <div className="races w-full flex flex-row gap-50">
            {racesName.map((race, index) => {
              return (
                <div key={index} className="races-container gap-0 px-50">
                  <h2 className="text-[clamp(100px,20vh,20vh)] font-bold text-red-600">
                    {race}
                  </h2>
                </div>
              );
            })}
          </div>
          <div className="map-track-wrapper h-[20vw] w-full flex flex-row justify-center gap-10 relative">
            {mapTrack.map((TrackSVGComponent, index) => {
              return (
                <div
                  key={index}
                  className="map-track h-[30vh] w-[30vh] rounded-2xl text-2xl text-white flex flex-col justify-center items-center absolute"
                >
                  <TrackSVGComponent />
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
