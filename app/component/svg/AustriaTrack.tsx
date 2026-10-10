import * as React from "react";
const AustriaTrack = () => (
  <svg
    width={500}
    height={500}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="austria-track">
      <circle
        id="round-circle"
        cx={250.5}
        cy={250.5}
        r={199.5}
        fill="#606060"
      />
      <g id="track">
        <path
          id="outer-track"
          d="M413 107H86C65.5655 107 49 123.565 49 144V382.318C49 410.801 79.8333 428.602 104.5 414.361L265.414 321.457C271.039 318.21 277.419 316.5 283.914 316.5H413C433.435 316.5 450 299.935 450 279.5V144C450 123.565 433.435 107 413 107Z"
          stroke="black"
          strokeWidth={35}
        />
        <path
          id="inner-track"
          d="M413 107H86C65.5655 107 49 123.565 49 144V382.318C49 410.801 79.8333 428.602 104.5 414.361L265.414 321.457C271.039 318.21 277.419 316.5 283.914 316.5H413C433.435 316.5 450 299.935 450 279.5V144C450 123.565 433.435 107 413 107Z"
          stroke="#DD1919"
          strokeWidth={12}
        />
        <rect
          id="start-line"
          x={113}
          y={82}
          width={50}
          height={20}
          rx={4}
          transform="rotate(90 113 82)"
          fill="#3DB817"
          stroke="black"
          strokeWidth={4}
        />
      </g>
    </g>
  </svg>
);
export default AustriaTrack;
