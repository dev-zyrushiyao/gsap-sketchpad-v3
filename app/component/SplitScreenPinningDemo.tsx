import React from "react";

export default function SplitScreenPinningDemo() {
  return (
    <div>
      <div className="hero h-dvh bg-amber-100 flex flex-col justify-center items-center">
        <h3 className="text-5xl">Split Screen Pinning Demo</h3>
      </div>
      <div className="wrapper flex flex-row">
        <div className="left w-1/2">
          <div className="left-content h-dvh flex flex-col justify-center items-center text-2xl outline-1 bg-green-100 ">
            content
          </div>
          <div className="left-content h-dvh flex flex-col justify-center items-center text-2xl outline-1 bg-pink-100 ">
            content
          </div>
          <div className="left-content h-dvh flex flex-col justify-center items-center text-2xl outline-1 bg-blue-100 ">
            content
          </div>
        </div>
        <div className="right w-1/2">
          <div className="image-wrapper h-dvh flex flex-col justify-center items-center bg-violet-100 ">
            <div className="image h-100 w-100 bg-amber-300 relative">
              <h3 className="text-3xl top-1/2 left-1/2 -translate-1/2 origin-center absolute bg-pink-300">
                Image Content
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
