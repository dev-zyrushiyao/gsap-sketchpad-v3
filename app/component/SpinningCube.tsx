import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, GSDevTools);

const bgColor: string[] = [
  "lightblue",
  "lightgreen",
  "lightcoral",
  "lightgray",
];

export default function SpinningCube() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cubes = gsap.utils.toArray<HTMLDivElement>(".cube");

      const cubeWrapper = container.current?.querySelector(".cube-wrapper");
      if (!cubeWrapper) return;

      const cubeElementWidth = 500;
      const cubeElemHeight = 300;

      gsap.set(cubeWrapper, {
        width: cubeElementWidth,
        height: cubeElemHeight,
        opacity: 1,
        position: "absolute",
        top: "50%",
        left: "50%",
        transformStyle: "preserve-3d",
        transformOrigin: `50% 50% -${cubeElemHeight / 2}`,
        xPercent: -50,
        yPercent: -50,
        rotateX: -90,
      });

      gsap.set(container.current, { perspective: 500 });

      cubes.forEach((cube, index) => {
        cube.style.backgroundColor = bgColor[index];

        gsap.set(cube, {
          width: cubeElementWidth,
          height: cubeElemHeight,
          position: "absolute",
          transformStyle: "preserve-3d",
        });

        switch (index) {
          case 0:
            //top
            gsap.set(cube, {
              transformOrigin: "50% 100%",
              rotateX: 90,
              y: -cubeElemHeight,
            });
            break;
          case 1:
            //front
            gsap.set(cube, {
              transformOrigin: "50% 50%",
              y: cubeElemHeight * 0,
            });
            break;
          case 2:
            //bottom
            gsap.set(cube, {
              transformOrigin: "0% 0%",
              rotateX: -90,
              y: cubeElemHeight * 1,
            });
            break;
          case 3:
            //back
            gsap.set(cube, {
              transformOrigin: "50% 50%",
              rotateX: -180,
              y: cubeElemHeight * 0,
              z: -cubeElemHeight,
            });
            break;
        }
      });

      const cubeTween = gsap.to(cubeWrapper, {
        paused: true,
        rotateX: "+=360",
        duration: 5,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: container.current,
        animation: cubeTween,
        // markers: true,
        start: "center center",
        end: "bottom center",
        scrub: 1,
        pin: true,
      });

      //   GSDevTools.create({ animation: cubeTween });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className=" h-dvh flex flex-col justify-center items-center relative"
    >
      <div className="cube-wrapper opacity-0">
        {Array.from({ length: 4 }, (_, index) => {
          return (
            <div
              key={index}
              className="cube absolute text-4xl text-center p-5 h-25 flex flex-col items-center justify-center"
            >
              CUBE {index}
            </div>
          );
        })}
      </div>
    </div>
  );
}
