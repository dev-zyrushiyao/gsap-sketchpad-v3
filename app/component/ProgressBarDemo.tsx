import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const comments: string[] = [
  "First",
  "This is great",
  "Yo!",
  "I disagree",
  "I don't understand",
];

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBarDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      //element to animate
      const progressBar =
        container.current.querySelector<HTMLDivElement>(".progress-bar");

      //tween animation
      gsap.set(progressBar, { scaleX: 0, transformOrigin: "0% 50%" });
      const progressBarTween = gsap.to(progressBar, {
        paused: true,
        scaleX: 1,
      });

      //Progress wrapper
      const progressWrapper =
        container.current.querySelector(".progress-wrapper");

      //scroll trigger - Start Trigger and End Trigger
      const contentWrapper =
        container.current.querySelector<HTMLDivElement>(".content-wrapper");
      const contentParagraph =
        container.current.querySelector<HTMLDivElement>(".content-paragraph");

      const banner = container.current.querySelector(
        ".banner",
      ) as HTMLDivElement;

      //if you use onupdate to trigger the progress remove the animation object property to avoid conflict triggering the native scrollTrigger
      //set once object to kill the scrollTrigger after it is done animating
      ScrollTrigger.create({
        id:"Progress Bar Demo",
        trigger: contentWrapper,
        endTrigger: contentParagraph,
        // animation: progressBarTween,
        start: `top ${banner.offsetHeight / 2}`,
        end: `bottom bottom`,
        once: true,
        // markers: true,
        onLeave: () => {
          progressWrapper?.classList.remove("fixed");
        },
        onUpdate: (self) => {
          // imitating the scrub
          if (self.progress > progressBarTween.progress()) {
            progressBarTween.progress(self.progress);
          }
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="banner bg-blue-500 relative h-40 w-full ">
        <p className="absolute top-1/2 left-1/2 -translate-1/2 inline text-white lg:text-7xl">
          ProgressBarDemo
        </p>
      </div>
      <section className="article">
        <div className="article-wrapper flex flex-col">
          <div className="content-wrapper px-20 py-10">
            <h2 className="text-4xl font-bold">
              Title - Please load this component as solo
            </h2>
            <div className="content-paragraph text-xl p-10">
              {Array.from({ length: 5 }, (_, index) => {
                return (
                  <p key={index}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vitae consectetur sunt quibusdam laboriosam numquam quis
                    inventore enim saepe ipsa adipisci nulla nihil, illum
                    aliquam consequatur cumque! Perspiciatis repellat at
                    placeat. Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Debitis in nam hic illum distinctio voluptate beatae,
                    totam modi aut provident. Reiciendis voluptate asperiores
                    doloremque laudantium minima temporibus maiores delectus
                    alias veniam pariatur, consectetur quidem deleniti atque
                    obcaecati iusto provident, doloribus at perspiciatis?
                    Similique explicabo deleniti unde quos laboriosam,
                    exercitationem ipsa eos incidunt voluptatum sit provident
                    consequatur harum perferendis voluptatem aliquam, delectus,
                    ullam et esse! Quisquam, architecto commodi perspiciatis vel
                    dolorem fugit adipisci obcaecati! Esse, reprehenderit.
                    Dolore commodi iusto consequuntur cumque, nostrum magni?
                    Modi debitis temporibus facere, mollitia exercitationem
                    ullam deleniti doloremque reprehenderit ratione. Laboriosam
                    ipsam iusto distinctio, magnam in ipsum ducimus. Repudiandae
                    magnam animi debitis iusto corporis aspernatur eos ea
                    impedit id obcaecati nemo, repellat culpa doloribus
                    asperiores! Magnam cupiditate soluta quis voluptates fuga
                    possimus eos exercitationem quasi est tempora expedita
                    architecto, in magni ipsa nisi culpa voluptatibus
                    consequuntur minus ipsam! Blanditiis reprehenderit est
                    similique sequi fuga commodi nihil dignissimos, veniam omnis
                    repudiandae sunt mollitia cumque voluptates labore unde,
                    maiores ratione! Neque perferendis enim quo doloribus rerum?
                    Laborum iusto distinctio consequuntur porro ipsa vel
                    exercitationem voluptas ducimus amet, sint ex totam modi
                    corrupti doloremque, blanditiis earum est odit quaerat,
                    tempore excepturi atque? Itaque quia obcaecati omnis dolorem
                    cum reprehenderit totam.
                  </p>
                );
              })}
            </div>
          </div>
          <div className="progress-area bg-gray-500">
            <div className="progress-wrapper fixed bg-white bottom-0 border-2 border-gray-100 w-full flex flex-col justify-center items-center gap-1 p-5">
              <p className="text-2xl bottom-5">Reading Progress</p>
              <div className="progress-border border-2 border-gray-500 w-200 h-5 rounded-2xl flex flex-col justify-items-center items-center overflow-clip">
                <div className="progress-bar bg-green-400 w-full h-5 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="comments bg-blue-300 p-7">
        <h3 className="font-bold text-6xl p-3">Comments</h3>
        <div className="comments-wrapper flex flex-col justify-center items-center gap-3">
          {comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="bg-blue-800 text-white text-2xl rounded-2xl w-full p-5"
              >
                {comment}
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <footer className="bg-black text-white h-100 text-5xl flex flex-col items-center justify-center">
          Footer
        </footer>
      </section>
    </div>
  );
}
