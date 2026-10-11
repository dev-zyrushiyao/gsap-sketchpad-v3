import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import { text } from "stream/consumers";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function WordHighlight() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const highlightColor: string = "white";
    const highlightSpan: string = "yellow";
    const defaultColor: string = "gray";

    const paragraph = container.current?.querySelector("p");
    const span = container.current?.querySelectorAll("span");
    if (!paragraph || !span) return;

    //sets non-highlight text color
    gsap.set(paragraph, { color: defaultColor });
    gsap.set(span, { fontWeight: "bold" });

    //Split Text
    const split = SplitText.create(paragraph, { type: "words" });

    //standalone tween
    //const textTween = gsap.to(split.words, { color: "white", stagger: 0.1 });

    //a function that returns a tween
    //animation highlights the text[index] from SplitText
    //to be added on timeline using call function
    function highlightMessage(text: Element) {
      //st forward scroll == direction of 1; backward is direction of -1
      if (text.parentElement instanceof HTMLSpanElement) {
        console.log(text.parentElement);
      }

      const isSpan = text.parentElement instanceof HTMLSpanElement;

      if (st.direction === 1) {
        return gsap.to(text, {
          color: isSpan ? highlightSpan : highlightColor,
        });
      } else {
        return gsap.to(text, { color: defaultColor });
      }
    }

    //Timeline
    //Example of animation time: [timeline start 0.0 - no animation] -> [0.1 start of animation] -> [5 end of animation] -> [5.1 timeline end]
    const textTl = gsap.timeline();
    split.words.forEach((word, index) => {
      //+ 0.01 is added to trigger the animation
      //timeline can't play the animation at 0.0 (start of playhead)
      //timeline starts playing animation beyond 0.0 , animation can be triggered at 0.1 and .1 before the playhead hit ends
      textTl.call(highlightMessage, [word], index * 1 + 0.01);
    });
    //add a blank animation to increase the timeline length
    textTl.set({}, {}, "+=0.01");

    //ST
    const st = ScrollTrigger.create({
      trigger: container.current,
      // markers: true,
      start: "top 50%",
      end: "bottom 50%",
      scrub: true,
      animation: textTl, //recalls the function on the direction and return a toTween to undo or redo the highlight
    });
  }, {});

  return (
    <div>
      <div className="bg-blue-300 h-dvh flex flex-col justify-center items-center lg:text-5xl text-2xl">
        Word Highlight Demo
      </div>
      <div
        ref={container}
        className="wrapper bg-black min-h-dvh flex flex-col justify-center items-center p-20"
      >
        <p className="lg:text-4xl text-2xl leading-15">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quod
          temporibus! In exercitationem <span>consequuntur</span> quaerat
          dolorum porro facere aspernatur! Nulla reprehenderit ea itaque
          recusandae culpa dolores explicabo saepe laboriosam a! Optio soluta
          quo consequatur excepturi. <span>Voluptatibus</span> sit animi dolores
          vero, praesentium culpa quos. Earum, sint accusantium officiis
          exercitationem esse ut expedita distinctio consectetur eaque
          quibusdam. Unde totam voluptatum enim corrupti. Itaque, cumque quam.
          Assumenda consequuntur magnam natus <span>culpa</span>, nihil illum
          sunt? Voluptatum vel unde modi officiis placeat! Perferendis fugiat
          iure eum veritatis facilis consequuntur, est doloribus quo sed fuga?
          Modi! Nam at culpa <span>laborum</span>, quisquam nihil cumque totam
          maxime autem, quibusdam consectetur harum iste rem id nobis itaque
          pariatur fugit eos debitis architecto doloribus <span>magnam</span>,
          libero odio et. Recusandae, voluptatum! Odit autem repudiandae
          distinctio fugit possimus ratione saepe necessitatibus nobis?
          <span>Quo</span> ullam consectetur voluptatum id, sunt doloremque
          animi? Hic, <span>accusantium</span> unde? At ea obcaecati fuga
          temporibus quasi reiciendis dolore deleniti.
        </p>
      </div>
      <div className="bg-pink-300 h-dvh"></div>
    </div>
  );
}
