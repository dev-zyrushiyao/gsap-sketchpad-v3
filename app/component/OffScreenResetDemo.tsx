import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function OffScreenResetDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cardElem = container.current?.querySelector(".card");
      if (!cardElem) return;

      gsap.set(cardElem, { transformOrigin: "50% 100%", scale: 0 });

      ScrollTrigger.create({
        id: "Card-OnEnter",
        trigger: container.current,
        // markers: true,
        start: "center 80%",
        onEnter: () => gsap.to(cardElem, { scale: 1, opacity: 1 }),
      });

      ScrollTrigger.create({
        id: "Card-OnLeaveBack",
        trigger: container.current,
        // markers: true,
        start: "top 100%",
        onLeaveBack: () => {
          gsap.set(cardElem, { scale: 0, opacity: 0 });
        },
      });
    },
    { scope: container },
  );
  return (
    <div>
      <div className="p-5 flex flex-col gap-3.5">
        <h3 className="text-5xl font-bold">Resume Scroll Demo</h3>
        <h5 className="text-2xl font-bold">
          the wrapper has 2 scroll trigger (onEnter and onLeaveBack) each
          trigger has different top values
          <br />
          the onEnter trigger at the center of the wrapper while the onLeave
          trigger at the top / 100% of viewport
        </h5>
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <p key={index} className="text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
              aut eius corporis quod repellendus non quia sint expedita
              temporibus! Perspiciatis adipisci id dolorum omnis enim eligendi
              quisquam? Dolorem, explicabo hic! Incidunt doloribus, qui enim
              corrupti laborum assumenda unde perferendis, esse voluptatum est
              repellendus eius ea ipsum repellat distinctio doloremque officiis
              dignissimos, sequi voluptate velit alias error fugit? Error,
              consectetur. Excepturi. Et odio, animi aut accusantium soluta iste
              repudiandae laborum quibusdam molestiae earum quas deleniti, fuga
              error veniam repellat. Doloribus veniam dolor similique quisquam
              corporis quis, nostrum nisi in voluptatibus unde. Maiores sequi
              labore suscipit magnam culpa dolorem nobis aliquam consectetur
              voluptates quibusdam fugiat quae accusamus magni, optio
              reiciendis, perferendis expedita sint ratione quam pariatur
              adipisci? Corporis non atque natus deleniti. Natus voluptate
              accusantium temporibus mollitia dolore nostrum doloremque iure
              deleniti ducimus tempora? Quisquam laboriosam minus labore
              repellendus eveniet, aperiam sit amet totam repudiandae adipisci
              numquam necessitatibus aspernatur veritatis. Hic, iusto?
            </p>
          );
        })}
        <div ref={container} className="card-wrapper bg-amber-200 p-5">
          <div className="card rounded-2xl bg-mist-400 w-100 h-fit p-10 flex flex-col gap-4 opacity-0">
            <h5 className="text-3xl font-bold">Title</h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              incidunt labore magni quo. Aperiam qui eos dolores in quidem, iure
              itaque recusandae assumenda. Voluptatum aliquam accusantium libero
              eligendi consectetur provident.
            </p>
          </div>
        </div>
        {Array.from({ length: 3 }, (_, index) => {
          return (
            <p key={index} className="text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
              aut eius corporis quod repellendus non quia sint expedita
              temporibus! Perspiciatis adipisci id dolorum omnis enim eligendi
              quisquam? Dolorem, explicabo hic! Incidunt doloribus, qui enim
              corrupti laborum assumenda unde perferendis, esse voluptatum est
              repellendus eius ea ipsum repellat distinctio doloremque officiis
              dignissimos, sequi voluptate velit alias error fugit? Error,
              consectetur. Excepturi. Et odio, animi aut accusantium soluta iste
              repudiandae laborum quibusdam molestiae earum quas deleniti, fuga
              error veniam repellat. Doloribus veniam dolor similique quisquam
              corporis quis, nostrum nisi in voluptatibus unde. Maiores sequi
              labore suscipit magnam culpa dolorem nobis aliquam consectetur
              voluptates quibusdam fugiat quae accusamus magni, optio
              reiciendis, perferendis expedita sint ratione quam pariatur
              adipisci? Corporis non atque natus deleniti. Natus voluptate
              accusantium temporibus mollitia dolore nostrum doloremque iure
              deleniti ducimus tempora? Quisquam laboriosam minus labore
              repellendus eveniet, aperiam sit amet totam repudiandae adipisci
              numquam necessitatibus aspernatur veritatis. Hic, iusto?
            </p>
          );
        })}
      </div>
    </div>
  );
}
