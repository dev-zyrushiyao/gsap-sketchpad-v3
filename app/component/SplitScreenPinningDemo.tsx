import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type PhotoInfo = { title: string; description: string };

const PhotoData: PhotoInfo[] = [
  {
    title: "Red",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
  },
  {
    title: "Blue",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
  },
  {
    title: "Green",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
  },
];

const imageColor: string[] = ["#fca5a5", "#86efac", "#93c5fd"];

export default function SplitScreenPinningDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // const leftWrapper = container.current?.querySelector(".left-wrapper");
      // const leftContents = leftWrapper?.querySelectorAll(":scope > *");

      const rightWrapper = container.current?.querySelector(".right-wrapper");

      //sets the image color
      const photos = gsap.utils.toArray(".photo", container.current);
      gsap.set(photos, { backgroundColor: gsap.utils.wrap(imageColor) });

      const photoContainer =
        container.current?.querySelector(".photo-container");
      if (!photoContainer) return;

      //target the first child to get the height
      const photoTargetFirstChild = photoContainer.querySelector(
        ":scope .photo:first-child",
      );
      const photoHeight = photoTargetFirstChild?.getBoundingClientRect().height;

      //targets the rest of the photo class except the first child to animate
      const photoTargets = photoContainer?.querySelectorAll(
        ":scope .photo:not(:first-child)",
      );

      //photo position set
      gsap.set(photoTargets, { y: photoHeight });

      // photo animation
      const photoTween: gsap.core.Tween = gsap.to(photoTargets, {
        paused: true,
        y: 0,
        ease: "none",
        stagger: 0.5,
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        animation: photoTween,
        scrub: 1,
        pin: rightWrapper,
        markers: true,
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div className="hero h-dvh bg-amber-100 flex flex-col justify-center items-center">
        <h3 className="text-5xl">Split Screen Pinning Demo</h3>
      </div>
      <div ref={container} className="wrapper flex flex-row">
        <div className="left-wrapper w-1/2">
          {PhotoData.map((data, index) => {
            return (
              <div
                key={index}
                className="left-content h-dvh flex flex-col justify-center items-center outline-1 bg-green-100 "
              >
                <div className="px-20">
                  <h3 className="text-3xl font-bold block text-start bg-amber-300">
                    {data.title}
                  </h3>
                  <p className="text-xl">{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="right-wrapper h-dvh w-1/2 self-start flex flex-col justify-center items-center bg-violet-500">
          <div className="photo-container h-100 w-100 relative overflow-clip">
            {Array.from({ length: PhotoData.length }, (_, index) => {
              return (
                <div
                  key={index}
                  className="photo h-full w-full absolute flex flex-col justify-center items-center bg-amber-400"
                >
                  <h3 className="text-3xl">Image Content</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
