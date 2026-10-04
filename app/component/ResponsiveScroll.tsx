import React from "react";
import AnguibBeach from "@/src/tourist-spot/Anguib-Beach-Cagayan.jpg";
import BlueSoil from "@/src/tourist-spot/Blue-Soil-Sagada.jpg";
import WindMills from "@/src/tourist-spot/Ilocos-Norte-Wind-Mills.jpg";
import MasasaBeach from "@/src/tourist-spot/Masasa-Beach-Manila.jpg";
import TwinLagoon from "@/src/tourist-spot/Twin-Lagoon-Coron.jpg";
import Image, { StaticImageData } from "next/image";

type Spot = {
  name: string;
  origin: string;
  imagePath: StaticImageData;
  description: string;
};

const TouristSpots: Spot[] = [
  {
    name: "Anguib Beach",
    origin: "Cagayan",
    imagePath: AnguibBeach,
    description:
      "Anguib Beach is a beautiful, secluded beach in Santa Ana, Cagayan, known for its powdery white sand, crystal-clear turquoise waters, and peaceful surroundings. Often called the “Boracay of the North,” it’s a great destination for swimming, relaxing, and enjoying nature.",
  },
  {
    name: "BlueSoil",
    origin: "Sagada",
    imagePath: BlueSoil,
    description:
      "Blue Soil Hills is a unique natural attraction in Sagada, known for its unusual bluish-gray soil caused by mineral-rich rocks. Surrounded by lush mountain scenery, it offers a peaceful and scenic spot for visitors who enjoy nature and exploring off-the-beaten-path destinations.",
  },
  {
    name: "Wind Mills",
    origin: "Ilocos Norte",
    imagePath: WindMills,
    description:
      "The Ilocos Norte Windmills are a famous group of towering wind turbines along the scenic coastline of Ilocos Norte. Known for their impressive size and picturesque views, they are a popular destination for visitors who want to enjoy the coastal landscape and take photos.",
  },
  {
    name: "Masasa Beach",
    origin: "Batangas",
    imagePath: MasasaBeach,
    description:
      "Masasa Beach in Tingloy, Batangas, is a beautiful beach known for its clear blue waters, white sand, and peaceful island atmosphere. It’s a popular getaway from Manila, perfect for swimming, relaxing, and enjoying the natural scenery.",
  },
  {
    name: "Twin Lagoon",
    origin: "Coron",
    imagePath: TwinLagoon,
    description:
      "Twin Lagoon is a stunning natural attraction in Coron, Palawan, known for its two lagoons surrounded by towering limestone cliffs. The lagoons are famous for their crystal-clear waters and unique mix of warm and cool water, making it a popular spot for swimming and snorkeling.",
  },
];

export default function ResponsiveScroll() {
  return (
    <div>
      <div className="h-dvh bg-sky-400 text-5xl font-bold flex flex-col justify-center items-center">
        Responsive Scroll Demo
      </div>
      <div className="content-wrapper flex flex-col justify-center items-center bg-gray-200  gap-10">
        {Array.from(TouristSpots, (spot, index) => {
          return (
            <div
              key={index}
              className="content-item lg:w-[1500px] sm:w-fit  h-fit bg-amber-200 flex lg:flex-row sm:flex-col items-center justify-center gap-10"
            >
              <div className="content-image w-[500px] h-[600px]  shrink-0 overflow-hidden rounded-xl relative">
                <Image
                  src={spot.imagePath}
                  alt={spot.name}
                  loading="eager"
                  sizes="800px"
                  fill
                  className="shrink-0 bg-black object-cover"
                />
              </div>
              <div className="content-info p-5">
                <div className="title">
                  <h3 className="text-4xl font-bold">{spot.name}</h3>
                  <h5 className="text-2xl font-semibold">{spot.origin}</h5>
                </div>
                <div className="w-fit bg-pink-50">
                  <p className="text-2xl">{spot.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
