import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import donkeyKong from "@/src/game-image/donkey-kong-bananza.jpg";
import legendOfZelda from "@/src/game-image/legend-of-zelda-botw.jpg";
import superMario from "@/src/game-image/super-mario-bros.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

interface imageMetadata {
  imageData: StaticImageData;
  title: string;
  publisher: string;
}

const imageItem: imageMetadata[] = [
  {
    imageData: donkeyKong,
    title: "Donkey Kong Bananza",
    publisher: "Nintendo",
  },
  {
    imageData: legendOfZelda,
    title: "Legend Of Zelda: Breath of the Wild",
    publisher: "Nintendo",
  },
  {
    imageData: superMario,
    title: "Super Mario Bros. Wonder",
    publisher: "Nintendo",
  },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MultiSectionScroll() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const banner =
        container.current?.querySelectorAll<HTMLDivElement>(".banner");
      if (!banner) return;

      banner.forEach((bannerElem) => {
        const bannerHeadings = bannerElem.querySelectorAll("h2 , h5");
        const bannerImage = bannerElem.querySelectorAll("img");

        bannerHeadings.forEach((heading, index) => {
          const split = SplitText.create(heading, { type: "chars" });

          const tl = gsap
            .timeline()
            .from(split.chars, {
              y: 200,
              opacity: 0,
              stagger: 0.01,
              duration: 2,
              ease: "elastic(1, 0.5)",
            })
            .from(
              bannerImage[index],
              { y: 500, opacity: 0, ease: "power2" },
              "<",
            );

          ScrollTrigger.create({
            trigger: bannerElem,
            animation: tl,
            markers: true,
            start: "top center",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-dvh bg-amber-700">
        <p className="text-5xl inline text-white text-center">
          Demo of Multi Element ScrollTrigger
          <br />
          Please Scroll Down
        </p>
      </div>
      <div ref={container} className="wrapper">
        {imageItem.map((image, index) => {
          return (
            <div className="game-section" key={index}>
              <div className="banner h-200 overflow-clip ">
                <Image
                  src={image.imageData}
                  alt={image.title}
                  className="w-full h-full object-cover brightness-50"
                />
                <div className="relative -top-100 text-white font-bold flex flex-col gap-5 p-20">
                  <h2 className="lg:text-7xl md:text-5xl sm:text-3xl">
                    {image.title}
                  </h2>
                  <h5 className="lg:text-5xl md:text-3xl sm:text-xl">
                    {image.publisher}
                  </h5>
                </div>
              </div>
              <div className="text-2xl flex flex-col gap-10 p-10">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequatur ipsa consequuntur adipisci accusantium fuga
                  nesciunt aut, possimus quos iusto voluptates. Laborum quas
                  consectetur iure velit distinctio veritatis quo, odit
                  quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ea totam voluptatibus rerum provident magni placeat
                  repellendus odio. Rerum magni nam quisquam officiis odio,
                  natus qui reiciendis animi repellendus modi minus? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  laborum animi consectetur hic consequatur dolor ducimus
                  suscipit, tempora quae. Id, facilis ipsa perferendis suscipit
                  autem impedit et corporis maiores enim!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequatur ipsa consequuntur adipisci accusantium fuga
                  nesciunt aut, possimus quos iusto voluptates. Laborum quas
                  consectetur iure velit distinctio veritatis quo, odit
                  quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ea totam voluptatibus rerum provident magni placeat
                  repellendus odio. Rerum magni nam quisquam officiis odio,
                  natus qui reiciendis animi repellendus modi minus? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  laborum animi consectetur hic consequatur dolor ducimus
                  suscipit, tempora quae. Id, facilis ipsa perferendis suscipit
                  autem impedit et corporis maiores enim!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequatur ipsa consequuntur adipisci accusantium fuga
                  nesciunt aut, possimus quos iusto voluptates. Laborum quas
                  consectetur iure velit distinctio veritatis quo, odit
                  quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ea totam voluptatibus rerum provident magni placeat
                  repellendus odio. Rerum magni nam quisquam officiis odio,
                  natus qui reiciendis animi repellendus modi minus? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  laborum animi consectetur hic consequatur dolor ducimus
                  suscipit, tempora quae. Id, facilis ipsa perferendis suscipit
                  autem impedit et corporis maiores enim!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequatur ipsa consequuntur adipisci accusantium fuga
                  nesciunt aut, possimus quos iusto voluptates. Laborum quas
                  consectetur iure velit distinctio veritatis quo, odit
                  quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ea totam voluptatibus rerum provident magni placeat
                  repellendus odio. Rerum magni nam quisquam officiis odio,
                  natus qui reiciendis animi repellendus modi minus? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
                  laborum animi consectetur hic consequatur dolor ducimus
                  suscipit, tempora quae. Id, facilis ipsa perferendis suscipit
                  autem impedit et corporis maiores enim!
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
