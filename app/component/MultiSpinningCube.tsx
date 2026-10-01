import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, GSDevTools);

const cubeColor: string[] = ["#ADD8E6", "#FFB3B3"];
const sectionTitle: string[] = ["GSAP", "React", "Animation"];

export default function MultiSpinningCube() {
  const container = useRef<HTMLDivElement | null>(null);

  const cubeHeight = 100;
  const cubeWidth = 1000;

  useGSAP(
    () => {
      const cubeContainer =
        container.current?.querySelectorAll(".cube-container");
      if (!cubeContainer) return;

      cubeContainer.forEach((cubeCont) => {
        console.log(cubeCont);
        gsap.set(cubeCont, {
          width: cubeWidth,
          height: cubeHeight,
          opacity: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transformStyle: "preserve-3d",
          transformOrigin: `50% 50% -${cubeHeight / 2}px`,
          xPercent: -50,
          yPercent: -50,
          rotateX: -90, //start position of array 0
        });

        const cubes = cubeCont.querySelectorAll(".cube");

        gsap.set(cubes, {
          backgroundColor: gsap.utils.wrap(cubeColor),
          position: "absolute",
          height: cubeHeight,
          width: cubeWidth,
          transformStyle: "preserve-3d",
        });

        cubes.forEach((cube, index) => {
          switch (index) {
            case 0: //top
              gsap.set(cube, {
                y: -cubeHeight,
                transformOrigin: "0% 100%",
                rotateX: 90,
              });
              break;
            default: // front
              gsap.set(cube, { x: 0, y: 0 });
              break;
          }
        });
      });

      const cubeWrapper = gsap.utils.toArray<HTMLDivElement>(".cube-wrapper");
      gsap.set(cubeWrapper, { height: cubeHeight });

      cubeWrapper.forEach((wrapper, index) => {
        const cubeTween = gsap.to(cubeContainer[index], {
          paused: true,
          duration: 0.2,
          rotateX: 0,
          ease: "linear",
        });

        // onEnter Trigger
        ScrollTrigger.create({
          id: "Cube Enter",
          trigger: cubeWrapper[index],
          start: "top 10%",

          onEnter: () => {
            cubeTween.play();
          },
          // markers: true,
        });

        //onLeaveBack trigger
        ScrollTrigger.create({
          id: "Cube Leave back",
          trigger: cubeWrapper[index],
          start: "top bottom",
          end: "bottom top",
          onLeave: () => {
            cubeTween.reverse();
          },
          // markers: true,
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="p-20 flex flex-col gap-10">
        <h3 className="text-5xl font-bold">MultiSpin Cube Demo</h3>
        <p className="text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iste
          maxime obcaecati magni amet id minus veniam minima accusamus nostrum,
          et ipsa non, dicta fugiat. Repudiandae numquam quod illo modi. Commodi
          a libero necessitatibus dolorum rerum beatae corrupti iste odio hic
          ipsam dignissimos suscipit odit pariatur, molestiae alias ipsa nostrum
          veritatis? Consequuntur impedit non optio eum aut, iure cum obcaecati!
          Eum at sed consectetur quibusdam distinctio aspernatur dolor officia.
          Quos aliquam consequuntur alias reiciendis velit rerum delectus omnis
          commodi doloribus? Modi nesciunt numquam assumenda doloribus culpa
          illo rem optio exercitationem! Ipsam fuga voluptate beatae fugiat
          quibusdam ducimus corporis sit hic cumque quia accusamus provident,
          consectetur adipisci deleniti autem delectus asperiores esse,
          explicabo officiis? Maxime numquam non minima deserunt est vero?
          Aliquam soluta id placeat aperiam architecto labore obcaecati,
          possimus totam corrupti ut harum nihil aliquid pariatur illum. Quia
          dolor, doloribus earum eveniet quo minima est illum, explicabo atque
          saepe pariatur! Modi vero optio facilis cum neque molestias ipsa sit
          tenetur. Illo quod consequuntur voluptate asperiores impedit
          reprehenderit itaque numquam nesciunt voluptas dolor sed, labore harum
          saepe voluptates officia, tempore magni? Sed fugit voluptatem magni
          numquam id, quas excepturi. Nesciunt delectus eos velit quisquam minus
          esse tenetur voluptatem beatae recusandae, placeat obcaecati
          consequatur officiis cupiditate voluptates accusamus quam, ea facere
          ratione? Praesentium quia sit ea iste numquam natus veniam omnis nihil
          quisquam totam quasi at sint optio et facilis perferendis provident
          vitae, minus repellendus eligendi velit? Nostrum doloremque ex animi
          iste! Ipsa, eos nesciunt, fugiat velit sint quos sequi esse, corrupti
          aliquam quod minima! Incidunt amet officia magni modi suscipit,
          perspiciatis tempora nostrum et eaque, debitis fuga expedita, nulla
          sed cupiditate. Deserunt, recusandae sed enim perspiciatis ex dolores
          sequi rem nemo consequatur quibusdam dolorem aperiam. Placeat, dolorem
          quidem excepturi animi nihil perferendis? Veniam necessitatibus
          eligendi tempora officia blanditiis minus natus quos.
        </p>
        {sectionTitle.map((title) => {
          return (
            <section key={title}>
              <div className="cube-wrapper w-full flex flex-col justify-center relative">
                <div className="cube-container opacity-0">
                  {Array.from({ length: 2 }, (_, index) => {
                    return (
                      <div
                        key={index}
                        className="cube font-bold text-4xl flex flex-col justify-center items-center p-5"
                      >
                        {title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-2xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
                alias vitae, voluptas harum nemo porro sit impedit quae a. Iure
                eligendi repellendus deleniti in est natus molestiae sit
                pariatur cum. Voluptatem laborum voluptates quasi rem nostrum
                non distinctio, accusantium dicta perspiciatis velit aspernatur
                temporibus error aliquid reprehenderit! Delectus sunt possimus
                dolorem quibusdam minus quasi, voluptatibus commodi temporibus,
                cum vitae quia. Ut nulla reiciendis repellat nesciunt ipsam
                exercitationem eaque ipsa illum voluptatem esse facere
                cupiditate, iste optio natus tenetur, id maxime quisquam
                recusandae quod vero, eum sed incidunt voluptas! Similique,
                architecto? Iusto dolore aliquam doloribus, eligendi libero
                mollitia praesentium fugit optio fugiat repellat totam nihil
                quis, amet eius rerum laboriosam saepe ut nisi omnis, quod ipsam
                cum. Quo possimus aut quae! Harum magni odio rem soluta
                perspiciatis ea maiores, vitae adipisci dolorum ipsa eum fugit
                mollitia quia? Alias ea, dolores neque modi iure facilis
                molestiae pariatur esse quia odio quo laboriosam? Asperiores
                nostrum molestias iusto perspiciatis tempora fuga itaque
                distinctio laudantium minus provident odio soluta architecto ab
                voluptates officiis rem exercitationem a eum repellat, dolorem
                praesentium? Odio non repellat culpa aliquam. Ullam, quos a quas
                odio odit quis enim non! Fuga placeat sed quas perspiciatis
                explicabo dolore, recusandae voluptatum error fugit hic
                molestiae at vitae facilis minus nisi dignissimos unde saepe.
                Molestiae quasi vel saepe id tempore eos, dolorum vero
                doloremque sed maxime enim incidunt, dolorem minus voluptatibus
                eaque, amet iusto ea voluptate. Adipisci inventore at nam,
                possimus minima quia? Eligendi! Similique quisquam, et facilis
                molestias placeat voluptate nam esse. Nostrum quasi cum aliquam
                nulla consectetur sint officiis ipsam corrupti, voluptate
                accusantium aspernatur incidunt quis quidem minus a et dolor
                distinctio? Accusamus, eius! Tenetur cumque asperiores molestias
                rerum vel cupiditate, laborum, unde minima possimus dolore
                aliquam ratione exercitationem aspernatur fuga modi ducimus
                inventore, et repudiandae soluta corporis sed explicabo. Sed,
                ab. Esse similique possimus quia ratione fuga numquam excepturi,
                maxime veritatis voluptate autem porro optio incidunt ea
                eligendi consequuntur, quisquam laboriosam delectus consectetur?
                Beatae soluta doloremque deserunt voluptate quibusdam vitae
                saepe. Reiciendis officiis accusamus aspernatur eos adipisci
                distinctio impedit quo neque dolores error voluptas explicabo
                incidunt optio alias ratione eum fuga asperiores, fugit soluta.
                Suscipit dolorem necessitatibus, assumenda enim iure ut! Alias
                dolores perferendis non, animi veniam neque provident fugit
                earum corporis illum est adipisci iure. Fugit reiciendis,
                placeat tenetur iste, ducimus consequatur recusandae porro vel
                facere nobis et quos? Nobis. Nemo minima libero neque quisquam
                dolorum voluptates consequatur rem, laudantium quod pariatur
                consectetur id delectus, illum quae velit ad dolore cum
                obcaecati aut nam! Necessitatibus iste pariatur repudiandae
                sequi et. Delectus sed in, vero veritatis veniam laudantium
                excepturi qui incidunt nihil cumque accusantium explicabo amet
                nam distinctio laboriosam iste deserunt cum iusto provident.
                Deleniti exercitationem pariatur qui repellendus a excepturi?
                Quam totam vitae magni corporis excepturi nam ipsum consequatur
                dolorem veritatis necessitatibus hic modi explicabo, reiciendis
                architecto commodi eius eos placeat molestiae doloremque earum
                eveniet tenetur! Quos cupiditate sequi minus? Ipsa obcaecati
                nobis itaque et aliquid amet quia tempora, provident eius ipsum
                id nihil reiciendis odio labore. Veniam eligendi quia ipsum cum
                voluptas incidunt inventore! Fugiat quia consectetur iure
                maiores. Molestiae explicabo est quia numquam quasi obcaecati
                aperiam. Corrupti dolores assumenda consequatur deserunt,
                adipisci quis earum quam. Vitae mollitia iusto nisi voluptatum,
                temporibus tempora aspernatur voluptates, quidem ipsum laborum
                nulla. Repudiandae rem mollitia dolores animi repellat pariatur
                quo natus nihil quasi, suscipit qui ut incidunt perferendis
                iusto ipsum similique magni distinctio iste consequatur minus
                exercitationem ad doloremque. Hic, ex facere? Odit dolores
                possimus itaque soluta nihil vitae maiores provident beatae ab.
                Error ratione corporis impedit veniam consequatur excepturi
                officiis voluptate tenetur optio. Dolorum dolor officiis, sint
                commodi delectus possimus aliquam!
              </p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
