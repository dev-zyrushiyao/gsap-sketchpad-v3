import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type PhotoInfo = { title: string; description: string[] };

const PhotoData: PhotoInfo[] = [
  {
    title: "Red",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
    ],
  },
  {
    title: "Blue",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores inventore beatae libero, vitae impedit maxime quis molestiae repellendus consequatur voluptate a voluptates voluptatum numquam ea est. Ipsa id esse totam.",
      "Dolores facilis dicta ex tenetur sed, quas molestiae laudantium laboriosam sequi vero perferendis rem, explicabo similique sapiente qui id doloremque. Quisquam alias magnam maiores suscipit commodi sapiente ex ad similique.",
      "Sit minus quae quas mollitia vel explicabo at in suscipit, esse porro reprehenderit nobis labore ratione illo tempora? Commodi aliquid quam delectus.",
      "In qui omnis voluptatem veniam quibusdam fuga unde. Quisquam in asperiores quae quibusdam tenetur quidem natus, sed ea fuga itaque saepe. Suscipit qui dolores obcaecati, tenetur dicta pariatur corrupti, aut nisi ducimus illum quia! Vero animi est distinctio? Dignissimos aut provident temporibus ipsam. Asperiores quod officiis consequatur quasi, ratione quaerat ducimus quia nisi pariatur odio nihil aliquid rem cum veritatis magni recusandae! Veniam fuga veritatis eius! Eos, similique?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
    ],
  },
  {
    title: "Green",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas quis libero natus praesentium maxime sunt, labore laborum ad minus iusto ab expedita quae mollitia. Esse atque magni error aspernatur.Ab perferendis ad earum fugiat eveniet ea eligendi recusandae quia, nihil voluptatibus obcaecati libero aut iste debitis voluptates quos odio excepturi aperiam dolor doloremque dolorum totam laudantium repellat accusantium? Quisquam?",
    ],
  },
];

const imageColor: string[] = ["#fca5a5", "#86efac", "#93c5fd"];

export default function SplitScreenPinningDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const rightWrapper = container.current?.querySelector(".right-wrapper");
      //sets the image color
      const photos = gsap.utils.toArray(".photo", container.current);
      gsap.set(photos, { backgroundColor: gsap.utils.wrap(imageColor) });

      const photoContainer =
        container.current?.querySelector(".photo-container");
      if (!photoContainer) return;

      //targets the rest of the photo class except the first child to animate
      const photoTargets = photoContainer.querySelectorAll(
        ":scope > .photo:not(:first-child)",
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        //photo position set
        gsap.set(photoTargets, { yPercent: 100 });

        // photo animation
        const photoTween: gsap.core.Tween = gsap.to(photoTargets, {
          paused: true,
          yPercent: 0,
          ease: "none",
          stagger: 0.5,
          immediateRender: false,
        });

        //removed the photoTween animation, this scrollTrigger is only to pin the .right-wrapper class
        ScrollTrigger.create({
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          pin: rightWrapper,
        });

        //targets the child of left-content
        const leftContentSections = container.current?.querySelectorAll(
          ".left-content:not(:first-child)",
        );
        if (!leftContentSections) return;

        leftContentSections.forEach((content, index) => {
          const heading = content.querySelector("h3");
          if (!heading) return;

          ScrollTrigger.create({
            trigger: heading,
            // markers: true,
            start: "top 80%",
            end: "top 40%",
            animation: gsap.to(photoTargets[index], {
              yPercent: 0,
            }),
            scrub: 1,
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div className="hero h-dvh bg-amber-100 flex flex-col justify-center items-center">
        <h3 className="text-5xl text-center">Split Screen Pinning Demo</h3>
      </div>
      <div ref={container} className="wrapper flex  md:flex-row flex-col">
        {/* left-wrapper is for tablet and desktop screen only */}
        <div className="left-wrapper w-1/2 md:block hidden">
          {PhotoData.map((data, index) => {
            return (
              <div
                key={index}
                className="left-content min-h-dvh self-start flex flex-col justify-center outline-2 p-20 bg-green-300"
              >
                <div className="left-content-section flex flex-col gap-5 ">
                  <h3 className="text-5xl font-bold block text-start bg-amber-300">
                    {data.title}
                  </h3>
                  {data.description.map((desc, index) => {
                    return (
                      <p key={index} className="text-xl">
                        {desc}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="right-wrapper h-auto w-full md:h-dvh md:w-1/2 self-start flex flex-col justify-center items-center  bg-violet-200">
          {/* Tablet and Desktop .right-wrapper content */}
          <div className="photo-container h-[40vw] w-[40vw] relative md:overflow-clip hidden md:block overflow-visible">
            {Array.from({ length: PhotoData.length }, (_, index) => {
              return (
                <div
                  key={index}
                  className="photo h-full w-full inset-0 md:absolute flex flex-col self-start justify-center items-center bg-amber-400"
                >
                  <h3 className="text-3xl">Image Content</h3>
                </div>
              );
            })}
          </div>
          {/* Mobile .right-wrapper content */}
          {PhotoData.map((data, index) => {
            return (
              <div
                key={index}
                className="min-h-dvh w-full md:hidden self-start flex flex-col justify-center outline-2 gap-5 p-10"
              >
                <div className="photo-container h-[80vw] w-full relative md:overflow-clip overflow-clip">
                  <div
                    key={index}
                    className="photo h-full w-full inset-0 md:absolute flex flex-col self-start justify-center items-center"
                  >
                    <h3 className="text-3xl">Image Content</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="text-5xl font-bold block text-start">
                    {data.title}
                  </h3>
                  {data.description.map((desc, index) => {
                    return (
                      <p key={index} className="text-xl">
                        {desc}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="hero h-fit w-full bg-amber-100 flex flex-col justify-center items-center p-20">
        <p className="text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          non, magnam perspiciatis suscipit sunt nobis amet earum tempore velit,
          dignissimos ut quidem? Porro ab itaque deleniti cupiditate assumenda
          dicta unde! Alias, ad consequatur. At facere doloremque, natus fugit
          molestias laudantium reiciendis nobis totam id repellat laboriosam
          illum. Sequi, eaque? Consectetur, animi amet. Repudiandae ipsum
          expedita dolore id laudantium error rerum! Veniam numquam pariatur
          dolor illum! Consectetur ut minima vero facilis. Voluptas, iste. Quod,
          maiores repellat, cum earum ea minus unde asperiores dignissimos nulla
          necessitatibus illo, voluptatum recusandae quaerat ex suscipit?
          Tenetur hic dicta nihil facilis voluptas reprehenderit atque incidunt
          sunt quas optio neque magnam, iure corporis ab in rerum quo adipisci
          aperiam non nam soluta voluptatibus! Similique corrupti sapiente
          cupiditate? Ipsa consequatur fuga alias at ea fugit illo corrupti
          maiores pariatur in rerum quasi ipsam, velit impedit, aspernatur
          excepturi suscipit, recusandae inventore! Eligendi quod labore
          assumenda, ducimus ipsum aliquam ipsam! Dignissimos corrupti voluptate
          nobis earum unde ab at ipsa sapiente provident. Ipsam soluta
          reprehenderit esse quibusdam expedita nam explicabo dicta accusamus
          delectus. Harum praesentium error fuga ut cupiditate iste
          exercitationem. Itaque, vel officia veritatis rem non neque, voluptate
          in saepe eveniet laudantium recusandae optio accusamus fuga explicabo?
          Aut, ex veniam quo minima tempora nostrum laboriosam illum soluta modi
          accusamus cupiditate. Quaerat optio omnis neque architecto quas
        </p>
      </div>
    </div>
  );
}
