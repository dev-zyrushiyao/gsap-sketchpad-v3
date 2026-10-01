import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function LineSectionProggress() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sectionWrapper =
        container.current?.querySelectorAll<HTMLDivElement>(".section-wrapper");
      const progressWrapper =
        container.current?.querySelectorAll<HTMLDivElement>(
          ".progress-wrapper",
        );

      if (!sectionWrapper || !progressWrapper) return;

      sectionWrapper.forEach((section) => {
        gsap.set(section, { opacity: 1 });
      });

      progressWrapper.forEach((wrapper, index) => {
        gsap.set(wrapper, { overflow: "clip" });

        const progressWrapperHeight = wrapper.offsetHeight;

        const progressLines = wrapper.querySelectorAll(".progress-line");
        const progressTween = gsap.fromTo(
          progressLines,
          {
            y: index !== 0 ? -progressWrapperHeight : 0,
          },
          {
            duration: 1,
            y: index !== 4 ? progressWrapperHeight : 0,
            ease: "none",
            // stagger: 0.5,
          },
        );

        ScrollTrigger.create({
          trigger: wrapper,
          animation: progressTween,
          start: "top 300px",
          end: "bottom 200px",
          //   markers: true,
          scrub: 0.5,
        });

        // progressLines.forEach((line, index) => {
        //   console.log("line index", index);

        //   const progressTween = gsap.to(line, {
        //     y: index === 4 ? 0 : progressWrapperHeight,
        //     ease: "none",
        //   });

        //   ScrollTrigger.create({
        //     trigger: wrapper,
        //     animation: progressTween,
        //     start: "top 300px",
        //     end: "bottom 200px",

        //     markers: true,
        //     scrub: 1,
        //   });
        // });
      });

      //clip the wrapper overflow and set the progress line to start at the top of the wrapper
      //   const progressWrapperHeight = progressWrapper[0].offsetHeight;
      //   gsap.set(progressWrapper, { overflow: "clip" });
      //   gsap.set(progressLine, { y: -progressWrapperHeight / 2 });
    },
    { scope: container },
  );

  return (
    <div className="p-10 flex flex-col gap-10">
      <h3 className="text-5xl font-bold">LineSectionProggress Demo</h3>
      <p className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
        recusandae minima fugit a temporibus, optio quidem itaque. Vero sapiente
        dicta, ratione optio accusantium perferendis tempora provident labore a
        rerum laudantium? Laudantium perferendis consectetur blanditiis. Illo
        quia perferendis, beatae repellendus porro dolore eligendi eaque
        voluptatum, expedita omnis impedit. Necessitatibus, veritatis numquam
        doloribus maxime vero fuga eos, aliquid rerum ratione vel ipsum.
        Obcaecati recusandae voluptas iusto numquam aspernatur vero ipsa nihil,
        repudiandae, quae necessitatibus, doloremque corporis? Adipisci, officia
        laborum eos harum odit quisquam dolores, praesentium aliquam pariatur
        expedita neque inventore, placeat facere? Et, saepe quae exercitationem
        voluptatum dicta harum, sapiente optio libero quaerat voluptate fugiat,
        aliquam earum pariatur aut? Laboriosam impedit esse minus dignissimos
        ab, aut, distinctio pariatur, vel magni voluptatum saepe. Itaque
        provident nihil officia. Laboriosam explicabo ratione voluptas
        perferendis quos illum eius quisquam dolorem cum, minus itaque impedit
        ea incidunt odio, natus voluptatibus consequuntur. Ad aperiam iusto
        eveniet pariatur nulla.
      </p>
      <div
        ref={container}
        className="item-list h-fit bg-gray-700 text-white rounded-xl flex flex-col gap-10 p-5"
      >
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <section
              key={index}
              className="section-wrapper flex flex-row gap-5 justify-center items-start p-5 opacity-0"
            >
              <div className="number-wrapper h-full w-fit   flex flex-row gap-10 justify-start items-center lg:text-5xl text-3xl">
                {index + 1}
                <div className="progress-wrapper h-30 w-3 bg-gray-400">
                  <div className="progress-line h-30 w-3  bg-amber-400"></div>
                </div>
              </div>

              <div className="divider h-full w-0.5 bg-gray-600"></div>
              <div className="h-full ">
                <p className="lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Vitae quod numquam doloremque sit eligendi suscipit id
                  aspernatur fugit alias dolorem fuga, iure esse voluptates
                  magni assumenda? Reiciendis explicabo veniam temporibus.
                </p>
              </div>
            </section>
          );
        })}
      </div>
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <p key={index} className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            recusandae minima fugit a temporibus, optio quidem itaque. Vero
            sapiente dicta, ratione optio accusantium perferendis tempora
            provident labore a rerum laudantium? Laudantium perferendis
            consectetur blanditiis. Illo quia perferendis, beatae repellendus
            porro dolore eligendi eaque voluptatum, expedita omnis impedit.
            Necessitatibus, veritatis numquam doloribus maxime vero fuga eos,
            aliquid rerum ratione vel ipsum. Obcaecati recusandae voluptas iusto
            numquam aspernatur vero ipsa nihil, repudiandae, quae
            necessitatibus, doloremque corporis? Adipisci, officia laborum eos
            harum odit quisquam dolores, praesentium aliquam pariatur expedita
            neque inventore, placeat facere? Et, saepe quae exercitationem
            voluptatum dicta harum, sapiente optio libero quaerat voluptate
            fugiat, aliquam earum pariatur aut? Laboriosam impedit esse minus
            dignissimos ab, aut, distinctio pariatur, vel magni voluptatum
            saepe. Itaque provident nihil officia. Laboriosam explicabo ratione
            voluptas perferendis quos illum eius quisquam dolorem cum, minus
            itaque impedit ea incidunt odio, natus voluptatibus consequuntur. Ad
            aperiam iusto eveniet pariatur nulla.
          </p>
        );
      })}
    </div>
  );
}
