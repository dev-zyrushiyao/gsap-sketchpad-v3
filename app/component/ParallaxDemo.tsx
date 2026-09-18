import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import * as React from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ParallaxDemo = () => {
  const container = React.useRef(null);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      const split = SplitText.create(".greeting-text", { type: "chars" });

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power1.inOut" },
      });
      tl.from(".tower-layer-1", {
        transformOrigin: "50% 50%",
        y: 500,
      })
        .from(".tower-layer-2", {
          transformOrigin: "50% 50%",
          y: 500,
        })
        .from(".stars > *", {
          transformOrigin: "50% 50%",
          scale: 0,
          ease: "back(2)",
        })
        .from(split.chars, { opacity: 0, stagger: 0.05 })
        .from(".moon-layer", {
          y: -300,
          x: -500,
        })
        .from(
          ".cloud",
          {
            x: -1440,
          },
          "<",
        )
        .from(
          ".lights",
          {
            opacity: 0,
          },
          "-=0.1",
        );

      ScrollTrigger.create({
        trigger: container.current,
        animation: tl,
        markers: true,
        start: "50% center",
        end: "+=1200",
        scrub: 0.3,
        pin: true,
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="w-full h-dvh overflow-hidden opacity-0">
      <svg
        viewBox="0 0 1440 730"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="parallax" clipPath="url(#parallax-clip)">
          <rect width={1440} height={730} fill="white" />
          <rect id="sky" width={1440} height={1024} fill="#252528" />
          <foreignObject x={500} y={100} width={500} height={50}>
            <div className="w-full h-full">
              <h3 className="greeting-text text-6xl text-white text-center">
                GOOD EVENING
              </h3>
            </div>
          </foreignObject>
          <g className="stars">
            <path
              id="Star 5"
              d="M205.5 49.6178C205.822 48.7465 207.054 48.7465 207.376 49.6178L213.984 67.5103C214.086 67.7841 214.301 68 214.575 68.1015L232.44 74.7242C233.31 75.0467 233.31 76.277 232.44 76.5995L214.575 83.2222C214.301 83.3237 214.086 83.5396 213.984 83.8134L207.376 101.706C207.054 102.577 205.822 102.577 205.5 101.706L198.891 83.8134C198.79 83.5396 198.574 83.3237 198.3 83.2222L180.436 76.5995C179.566 76.277 179.566 75.0467 180.436 74.7242L198.3 68.1015C198.574 68 198.79 67.7841 198.891 67.5103L205.5 49.6178Z"
              fill="#D9D9D9"
            />
            <path
              id="Star 6"
              d="M924.516 194.54C924.838 193.668 926.07 193.668 926.392 194.54L930.281 205.069C930.382 205.342 930.598 205.558 930.871 205.66L941.386 209.558C942.256 209.88 942.256 211.111 941.386 211.433L930.871 215.331C930.598 215.432 930.382 215.648 930.281 215.922L926.392 226.451C926.07 227.322 924.838 227.322 924.516 226.451L920.627 215.922C920.526 215.648 920.31 215.432 920.036 215.331L909.522 211.433C908.652 211.111 908.652 209.88 909.521 209.558L920.036 205.66C920.31 205.558 920.526 205.342 920.627 205.069L924.516 194.54Z"
              fill="#D9D9D9"
            />
            <path
              id="Star 11"
              d="M1369.88 59.5397C1370.2 58.6683 1371.43 58.6683 1371.76 59.5397L1376.55 72.5231C1376.65 72.7969 1376.87 73.0129 1377.14 73.1143L1390.11 77.9205C1390.98 78.243 1390.98 79.4733 1390.11 79.7958L1377.14 84.602C1376.87 84.7035 1376.65 84.9194 1376.55 85.1932L1371.76 98.1766C1371.43 99.048 1370.2 99.048 1369.88 98.1766L1365.08 85.1932C1364.98 84.9194 1364.77 84.7035 1364.49 84.602L1351.53 79.7958C1350.66 79.4733 1350.66 78.243 1351.53 77.9205L1364.49 73.1143C1364.77 73.0128 1364.98 72.7969 1365.08 72.5231L1369.88 59.5397Z"
              fill="#D9D9D9"
            />
            <path
              id="Star 14"
              d="M806.872 297.54C807.194 296.668 808.427 296.668 808.748 297.54L813.544 310.523C813.645 310.797 813.861 311.013 814.134 311.114L827.099 315.921C827.969 316.243 827.969 317.473 827.099 317.796L814.134 322.602C813.861 322.703 813.645 322.919 813.544 323.193L808.748 336.177C808.427 337.048 807.194 337.048 806.872 336.177L802.077 323.193C801.976 322.919 801.76 322.703 801.486 322.602L788.522 317.796C787.652 317.473 787.652 316.243 788.522 315.921L801.486 311.114C801.76 311.013 801.976 310.797 802.077 310.523L806.872 297.54Z"
              fill="#D9D9D9"
            />
            <path
              id="Star 9"
              d="M659.227 173.816C659.951 173.235 661.007 173.87 660.834 174.783L658.028 189.674C657.974 189.961 658.047 190.257 658.23 190.485L667.688 202.315C668.267 203.04 667.634 204.096 666.723 203.923L651.857 201.111C651.57 201.057 651.274 201.13 651.047 201.313L639.241 210.787C638.517 211.367 637.462 210.732 637.634 209.819L640.441 194.928C640.495 194.641 640.421 194.345 640.239 194.117L630.781 182.287C630.201 181.562 630.834 180.507 631.745 180.679L646.611 183.491C646.898 183.546 647.194 183.472 647.421 183.289L659.227 173.816Z"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 63"
              cx={162.796}
              cy={243.806}
              rx={1.67832}
              ry={1.6814}
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 64"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 73.8359 349.719)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 65"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 1074.12 0)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 66"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 72.3594 98)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 67"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 177.906 430.43)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 68"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 848.352 490)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 69"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 6.71875 561.594)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 70"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 1147.36 394)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 71"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 998.352 204)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 72"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 600.844 477.516)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 73"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 576.352 101)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 74"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 419.57 77.3438)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 75"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 265.172 306.008)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 76"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 379.289 272.398)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 77"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 1100.36 123)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 78"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 1332.36 269)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 79"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 893.352 98)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 80"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 641.125 282.469)"
              fill="#D9D9D9"
            />
            <ellipse
              id="Ellipse 81"
              cx={1.67832}
              cy={1.6814}
              rx={1.67832}
              ry={1.6814}
              transform="matrix(-1 0 0 1 439.703 453.977)"
              fill="#D9D9D9"
            />
          </g>
          <g className="moon-layer">
            <circle id="moon" cx={1272.5} cy={154.5} r={40.5} fill="white" />
            <g id="moon-glow" filter="url(#filter0_f_3758_9879)">
              <circle cx={1273} cy={155} r={45} fill="white" />
            </g>
          </g>
          <g
            className="tower-layer-2"
            filter="url(#tower-layer-2-filter-shadow)"
          >
            <rect
              id="Rectangle 302"
              x={244.797}
              y={386.281}
              width={276.48}
              height={343.72}
              fill="#3A3E4D"
            />
            <rect
              id="Rectangle 305"
              x={1163.52}
              y={386.281}
              width={276.48}
              height={343.72}
              fill="#3A3E4D"
            />
            <rect
              id="Rectangle 306"
              x={1229.76}
              y={330.367}
              width={34.56}
              height={65.7836}
              fill="#3A3E4D"
            />
            <rect
              id="Rectangle 307"
              x={1344.96}
              y={330.367}
              width={34.56}
              height={65.7836}
              fill="#3A3E4D"
            />
            <rect
              id="Rectangle 303"
              y={448.766}
              width={244.8}
              height={281.225}
              fill="#3A3E4D"
            />
            <g id="tower">
              <rect
                id="Rectangle 304"
                x={959.039}
                y={258}
                width={164.16}
                height={471.998}
                fill="#3A3E4D"
              />
              <rect
                className="lights"
                x={984.961}
                y={285.953}
                width={51.84}
                height={29.6026}
                fill="#D9D9AB"
              />
            </g>
            <path
              id="Union"
              d="M715.681 361.602C718.757 361.602 719.993 367.25 720.001 367.287V391.007C770.649 394.94 780.075 449.177 780.192 449.857H875.521V483.044H915.841V729.984H521.281V483.044H552.961V449.857H648.001C648.12 449.162 657.951 392.705 711.361 390.828V367.287C711.369 367.25 712.606 361.602 715.681 361.602Z"
              fill="#3A3E4D"
            />
          </g>
          <g className="tower-layer-1" filter="url(#tower-layer-1-shadow)">
            <g id="tower_2">
              <path
                id="Union_2"
                d="M892.803 729.994H443.523V544.104H668.163V580.932H682.563V505.523H892.803V729.994Z"
                fill="#252A3C"
              />
            </g>
            <g id="tower-twin">
              <path
                id="Union_3"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1440 730H1232.64V642.316H1131.84V730H907.203V580.938H1232.64V491.5H1440V730ZM1131.84 630.041H1232.64V593.213H1131.84V630.041Z"
                fill="#252A3C"
              />
            </g>
            <g id="tower_3">
              <path
                id="Union_4"
                d="M385.924 444.149H429.124V729.999H204.484V444.149H244.804V421.352H385.924V444.149Z"
                fill="#252A3C"
              />
              <rect
                className="lights"
                x={239.039}
                y={484.484}
                width={51.84}
                height={31.5662}
                fill="#D9D9AB"
              />
            </g>
            <path
              id="Union_5"
              d="M190.08 729.997H0V395.044H146.88V374H190.08V729.997Z"
              fill="#252A3C"
            />
          </g>
          <g className="cloud" filter="url(#filter3_d_3758_9879)">
            <path
              d="M1291.5 180C1296.74 180 1301.22 183.22 1303.08 187.786C1304.87 186.061 1307.31 185 1310 185C1313.67 185 1316.88 186.982 1318.62 189.934C1320.08 185.89 1323.95 183 1328.5 183C1334.3 183 1339 187.701 1339 193.5C1339 194.106 1338.95 194.699 1338.85 195.276C1339.53 195.097 1340.25 195 1341 195C1345.42 195 1349 198.358 1349 202.5C1349 205.554 1347.05 208.179 1344.26 209.349C1344.73 210.307 1345 211.374 1345 212.5C1345 216.642 1341.42 220 1337 220C1335.4 220 1333.91 219.558 1332.66 218.801C1331.6 222.377 1328.13 225 1324 225C1319.96 225 1316.53 222.481 1315.4 219.013C1313.7 222.48 1308.57 225 1302.5 225C1295.04 225 1289 221.194 1289 216.5C1289 216.348 1289.01 216.196 1289.02 216.046C1288.91 216.023 1288.8 216 1288.7 215.977C1287.82 219.463 1285.16 222 1282 222C1278.13 222 1275 218.194 1275 213.5C1275 213.327 1275 213.156 1275.01 212.985C1274.84 212.994 1274.67 213 1274.5 213C1269.25 213 1265 208.747 1265 203.5C1265 198.253 1269.25 194 1274.5 194C1276.26 194 1277.9 194.48 1279.32 195.312C1279.11 194.409 1279 193.467 1279 192.5C1279 185.596 1284.6 180 1291.5 180Z"
              fill="#383838"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_3758_9879"
            x={1218.1}
            y={100.1}
            width={109.8}
            height={109.8}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={4.95}
              result="effect1_foregroundBlur_3758_9879"
            />
          </filter>
          <filter
            id="tower-layer-2-filter-shadow"
            x={-4.5}
            y={254.5}
            width={1455}
            height={487}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx={3} dy={4} />
            <feGaussianBlur stdDeviation={3.75} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3758_9879"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_3758_9879"
              result="shape"
            />
          </filter>
          <filter
            id="tower-layer-1-shadow"
            x={-5.8}
            y={363.2}
            width={1469.6}
            height={385.6}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx={9} dy={4} />
            <feGaussianBlur stdDeviation={7.4} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3758_9879"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_3758_9879"
              result="shape"
            />
          </filter>
          <filter
            id="filter3_d_3758_9879"
            x={1261}
            y={180}
            width={92}
            height={53}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3758_9879"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_3758_9879"
              result="shape"
            />
          </filter>
          <clipPath id="parallax-clip">
            <rect width={1440} height={730} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
export default ParallaxDemo;
