import React from "react";
import img from "../images/baby.png";
import img2 from "../images/babysmall.png";
const Banner2 = () => {
  return (
    <div>
      <div
        className="h-screen w-full bg-cover bg-center text-white flex justify-between p-5"
        style={{
          backgroundImage: `url(${window.innerWidth < 786 ? img2 : img})`,
        }}
      >
        <div className="flex flex-col w-[60%] ">
          <i className="text-xl">Kith Kids Pre-Summer 2025</i>
          <i className="text-xs">
            Kith Kids Pre-Summer 2025 Kith Kids presents Pre-Summer 2025—a
            collection of apparel and accessories designed in transitional
            materials and summer-ready hues.
          </i>
        </div>

        <div className="uppercase font-semibold flex gap-4 h-20">
          <button className="border border-white p-3">SHOP NOW</button>
          <button className="border border-white p-3">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
