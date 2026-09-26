import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function SplitTextScroll() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const textWrapper = container.current?.querySelectorAll(".text-wrapper");

      //splits is a built-in code
      const splits: SplitText[] = [];

      textWrapper?.forEach((wrapper) => {
        const paraElem = wrapper.querySelectorAll("p");
        const split = SplitText.create(paraElem, { type: "lines words" });
        splits.push(split);
        const textTween = gsap.from(split.lines, {
          duration: 0.5,
          y: 200,
          opacity: 0,
          stagger: 0.1,
          //   ease: "linear",
        });

        ScrollTrigger.create({
          id: "paragraph-trigger",
          trigger: wrapper,
          animation: textTween,
          once: true,
          start: "top 80%",
          end: "bottom center",
        });
      });

      //built-in code
      function debounce<T extends (...args: never[]) => void>(
        func: T,
        delay = 300,
      ): (...args: Parameters<T>) => void {
        let timer: ReturnType<typeof setTimeout>;

        return (...args: Parameters<T>) => {
          clearTimeout(timer);

          timer = setTimeout(() => {
            func(...args);
          }, delay);
        };
      }

      //built-in code
      //These code are to undo the splitting animation (removing the divs when the screen resolution change) so it revert back to raw text
      //the raw text follow the tailwind CSS to be responsive
      const handleResize = debounce(() => {
        // Revert the SplitText changes
        splits.forEach((split) => split.revert());

        // Kill the old ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Now refresh ScrollTrigger
        ScrollTrigger.refresh();
      }, 300);

      //built-in code
      window.addEventListener("resize", handleResize);

      //built-in code
      return () => {
        window.removeEventListener("resize", handleResize);
        // handleResize.cancel();

        splits.forEach((split) => split.revert());

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="h-20 w-full bg-amber-300 flex flex-col justify-center items-center text-5xl font-bold p-20">
        SplitTextScrollDemo
      </div>
      <div className=" bg-gray-500 overflow-clip">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div key={index} className="text-wrapper px-20 py-10 ">
              <p className="tracking-wide text-white text-2xl ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                aut laudantium beatae aspernatur animi repellendus pariatur
                quasi praesentium, distinctio fuga ad repudiandae libero,
                dolorem nam ducimus accusantium at modi alias! In hic eum vitae,
                minima repellat quae dolorum quam animi suscipit! Aperiam
                consequuntur, unde fuga dolorem id quod voluptatem in facere
                aut, velit dolorum aliquam laborum quaerat eius ipsam veniam.
                Assumenda reiciendis cumque vel officiis esse possimus pariatur
                ut veniam consectetur excepturi delectus, nostrum iure impedit
                quaerat ipsum et, mollitia nesciunt. Impedit in quo magnam.
                Quibusdam veritatis explicabo doloribus ex? Doloribus a magni
                harum veritatis cum quidem natus voluptatum temporibus
                reiciendis, hic reprehenderit consectetur architecto aliquid
                perspiciatis? Vitae est tempore maiores in veritatis repudiandae
                nam? Illum, velit ut? Totam, sunt. Sequi ullam hic perferendis
                molestiae distinctio sint culpa odio. Ab minima voluptatum
                explicabo nihil! Alias, impedit, quis earum consequatur placeat
                esse ipsam ipsa incidunt repudiandae, dicta possimus
                reprehenderit eius minus.
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-20 w-full bg-amber-300 flex flex-col justify-center items-center text-5xl font-bold p-20">
        content placeholder
      </div>
      <div className=" bg-gray-500 overflow-clip">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div key={index} className="text-wrapper px-20 py-10">
              <p className="tracking-wide text-white text-2xl ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum aut rem cupiditate aliquam consectetur explicabo
                ipsam, laboriosam iusto quos quibusdam atque magni praesentium
                deserunt, repudiandae accusantium veritatis illum nobis itaque?
                Tempore eveniet molestias veritatis illum nulla magni, qui
                pariatur placeat sed et vitae accusantium doloremque possimus
                nemo rerum assumenda odio, nam voluptates in, ab error similique
                quaerat reprehenderit. Id, eveniet? Nobis blanditiis doloremque
                impedit tenetur assumenda, provident labore ducimus ab
                consequuntur quo nostrum dicta consectetur placeat quia. Ipsum
                maxime error placeat voluptatum, impedit quia eligendi nesciunt
                cupiditate ex, exercitationem laudantium? Laborum quaerat
                mollitia quisquam velit unde animi voluptas sit nam eligendi,
                magni odio amet? Dolores, adipisci molestias! Fuga ex
                reprehenderit, rem voluptas quaerat ratione. Sapiente facere
                tempora consequuntur expedita odio! Fugiat, dolorem. Optio autem
                quidem modi saepe doloribus ea reprehenderit natus minima
                corporis nihil sint quis obcaecati a minus nisi ad repellat,
                omnis voluptate quos totam. Ut labore in neque?
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
