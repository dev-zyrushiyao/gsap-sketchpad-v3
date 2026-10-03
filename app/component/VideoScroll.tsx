import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScroll() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const video = container.current?.querySelector("video");
      if (!video) return;

      ScrollTrigger.create({
        trigger: container.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => video.play(),
        onLeave: () => video.pause(),
        onEnterBack: () => video.play(),
        onLeaveBack: () => video.pause(),

        markers: true,
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div className="p-20 flex flex-col gap-5">
        <h3 className="text-5xl font-bold">Video Scroll Demo</h3>
        {Array.from({ length: 3 }, (_, index) => {
          return (
            <p key={index} className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem consequatur, nemo, ut mollitia reiciendis inventore
              porro maxime quia harum asperiores cumque aliquid hic iusto dicta
              possimus quaerat, eveniet amet ipsam. Assumenda nemo minima
              corporis laborum eos, hic nihil dolores nulla beatae maxime
              dolorum libero accusamus molestias iusto, dignissimos, numquam
              consectetur mollitia pariatur aliquid. Iste odit doloremque
              possimus itaque quo atque. Accusantium molestiae at culpa saepe
              totam iste ratione quae, esse pariatur facilis modi cupiditate vel
              nemo corrupti quos, cumque perspiciatis quaerat maxime rerum
              reprehenderit voluptates voluptate iusto error. Saepe,
              perferendis? Earum, nam pariatur odio quis placeat vitae
              architecto iusto quam fuga fugiat? Non rerum, quod porro velit
              repellendus eos quibusdam, corrupti possimus aliquam commodi ullam
              minima, eligendi ipsam facere repudiandae! Sunt unde consequuntur
              cum eius similique blanditiis eos sapiente doloribus facilis
              veniam beatae, in cumque repellat molestiae aspernatur nisi
              quaerat voluptatem harum totam asperiores laudantium accusamus
              dicta, quibusdam autem! Ipsam?
            </p>
          );
        })}

        <div ref={container} className="video-wrapper">
          <video
            src="/video/zyrus_video.mp4"
            playsInline
            loop
            muted
            controls
          ></video>
        </div>

        {Array.from({ length: 3 }, (_, index) => {
          return (
            <p key={index} className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem consequatur, nemo, ut mollitia reiciendis inventore
              porro maxime quia harum asperiores cumque aliquid hic iusto dicta
              possimus quaerat, eveniet amet ipsam. Assumenda nemo minima
              corporis laborum eos, hic nihil dolores nulla beatae maxime
              dolorum libero accusamus molestias iusto, dignissimos, numquam
              consectetur mollitia pariatur aliquid. Iste odit doloremque
              possimus itaque quo atque. Accusantium molestiae at culpa saepe
              totam iste ratione quae, esse pariatur facilis modi cupiditate vel
              nemo corrupti quos, cumque perspiciatis quaerat maxime rerum
              reprehenderit voluptates voluptate iusto error. Saepe,
              perferendis? Earum, nam pariatur odio quis placeat vitae
              architecto iusto quam fuga fugiat? Non rerum, quod porro velit
              repellendus eos quibusdam, corrupti possimus aliquam commodi ullam
              minima, eligendi ipsam facere repudiandae! Sunt unde consequuntur
              cum eius similique blanditiis eos sapiente doloribus facilis
              veniam beatae, in cumque repellat molestiae aspernatur nisi
              quaerat voluptatem harum totam asperiores laudantium accusamus
              dicta, quibusdam autem! Ipsam?
            </p>
          );
        })}
      </div>
    </div>
  );
}
