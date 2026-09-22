import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { off } from "process";
import React, { useRef } from "react";

const displayMessage: string[] = [
  "Breathing life into static code",
  "Where motion meets precision",
  "Orchestrating pixels frame by frame",
  "Turning flat layouts into fluid experiences",
  "High-performance motion engineering",
  "Seamless scroll physics and buttery interactions",
  "Welcome to GSAP",
];

gsap.registerPlugin(ScrollTrigger);

export default function ScrollIntro() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      //bounding rect
      const hero = container.current.querySelector<HTMLDivElement>(".hero");
      const circle = container.current.querySelector<HTMLDivElement>(".circle");

      if (!circle || !hero) return;
      const heroRect = hero.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();

      function getOffset(): number {
        //offset
        const xOffset = heroRect.width - circleRect.left;
        return xOffset;
      }

      const offset = getOffset();

      //   gsap setters
      gsap.set(circle, {
        opacity: 1,
        x: -offset,
        transformOrigin: "50% 50%",
      });

      const setGreetingOpacity = gsap.quickSetter(".greeting", "opacity");
      setGreetingOpacity(1);

      // animation circle
      // on complete calls the scroll trigger for to prevent user scrolling while the circle animation is playing.

      const circleTl = gsap
        .timeline({
          //   onComplete: enableScroll,
          onComplete: () => {
            if (!container.current) return;
            const contentWrapper =
              container.current.querySelector(".content-wrapper");

            gsap.set(contentWrapper, { display: "block" });
          },
        })

        .to(circle, {
          duration: 2,
          x: offset - 100,
          xPercent: 100,
          ease: "power2.inOut",
        })
        .to(".circle", { duration: 1, scale: 80, ease: "linear", left: 0 })
        .from(
          ".greeting p",
          {
            duration: 1,
            ease: "power1.out",
            stagger: 1,
            opacity: 0,
            x: (index) => {
              if (index % 2 === 0) {
                return 200;
              }
              return -200;
            },
          },
          "<+0.3",
        );

      const setMessageOpacity = gsap.quickSetter(".message-wrapper", "opacity");
      setMessageOpacity(1);

      //message tl
      //greeting p fades out its the first text we see before the scrolling start
      const stagger = 10;
      const opacity = 0;
      const messageTl = gsap
        .timeline({
          paused: true,
        })
        .to(".greeting p", {
          duration: 1,
          ease: "power1.out",
          opacity: 0,
          y: (index) => {
            if (index % 2 === 0) {
              return -200;
            }
            return 200;
          },
        })
        .from(".message-wrapper > *", {
          opacity: opacity,
          scale: 1,
          stagger: stagger,
        })
        .to(
          ".message-wrapper > *:not(:last-child)",
          { opacity: opacity, scale: 2, stagger: stagger },
          stagger,
        );

      gsap.set(".content-wrapper", { display: "block" });
      ScrollTrigger.create({
        trigger: container.current,
        animation: messageTl,
        markers: true,
        pin: hero,
        scrub: 1,
        start: "top top",
        end: "+=3000",
      });

      //   function enableScroll(): void {
      //     //set overide the visibility hidden of the content wrapper
      //     //enable this code only when loading this component solo
      //     ScrollTrigger.create({
      //       trigger: hero,
      //       animation: messageTl,
      //       markers: true,
      //       pin: hero,
      //       scrub: 1,
      //       start: "top top",
      //       end: "+=3000",
      //     });
      //   }
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="hero bg-gray-300 h-dvh w-full flex justify-center items-center overflow-clip relative">
        <div className="circle bg-green-500 h-20 w-20 rounded-full opacity-0 absolute"></div>
        <div className="greeting opacity-0 flex flex-col gap-4 absolute">
          <p className="greet-1 text-5xl font-bold">Hello</p>
          <p className="greet-2 text-5xl font-bold">Welcome to GSAP</p>
        </div>
        <div className="message-wrapper text-5xl opacity-0">
          {displayMessage.map((message, index) => {
            return (
              <p key={index} className="absolute -translate-1/2">
                {message}
              </p>
            );
          })}
        </div>
      </div>
      <div className="content-wrapper w-full h-dvh p-20 hidden">
        <div className="content flex flex-col gap-10 ">
          <h3 className="text-6xl font-bold">
            Demo of Scroll Trigger as Intro Animation
            <br /> (play this component as solo on page.tsx)
          </h3>
          {Array.from({ length: 5 }, (_, index) => {
            return (
              <p key={index} className="text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates eius reprehenderit, temporibus, itaque nesciunt sint
                velit pariatur ullam recusandae suscipit totam officiis
                consequuntur numquam, sed architecto. Debitis repellendus magni
                eveniet optio sed pariatur odit vero, sint, provident quis esse
                maxime a deserunt consequatur cupiditate similique officiis eius
                necessitatibus dolorem sunt, ab obcaecati natus. Necessitatibus,
                dicta itaque. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Cumque animi provident error sequi ut laudantium? Aliquam
                atque veritatis quam, quia error aut ea molestias quaerat sint
                cum, magnam perferendis mollitia! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Libero rem voluptate tempora
                delectus numquam rerum, deserunt perferendis, aspernatur
                possimus, quibusdam id facere! Voluptas suscipit nihil vitae
                laboriosam consequatur harum doloremque?
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
