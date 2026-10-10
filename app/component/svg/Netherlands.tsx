import * as React from "react";
const NetherlandsTrack = () => (
  <svg
    width={500}
    height={500}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="netherlands-track">
      <circle
        id="round-circle"
        cx={254.5}
        cy={250.5}
        r={199.5}
        fill="#606060"
      />
      <g id="track">
        <path
          id="outer-track"
          d="M245.5 246L172.687 152.775C153.713 128.482 171.023 93 201.847 93H297.149C328.062 93 345.345 128.663 326.189 152.927L173.311 346.573C154.155 370.837 171.438 406.5 202.351 406.5H297.149C328.062 406.5 345.345 370.837 326.189 346.573L255.5 257.033"
          stroke="black"
          strokeWidth={35}
        />
        <path
          id="inner-track"
          d="M246.5 248.5L172.235 152.664C153.394 128.35 170.722 93 201.481 93H297.149C328.062 93 345.345 128.663 326.189 152.927L173.311 346.573C154.155 370.837 171.438 406.5 202.351 406.5H296.478C327.509 406.5 344.755 370.599 325.361 346.375L251 253.5"
          stroke="#DD1919"
          strokeWidth={12}
        />
        <rect
          id="start-line"
          x={233.678}
          y={188.912}
          width={50}
          height={20}
          rx={4}
          transform="rotate(139 233.678 188.912)"
          fill="#3DB817"
          stroke="black"
          strokeWidth={4}
        />
      </g>
    </g>
  </svg>
);
export default NetherlandsTrack;
