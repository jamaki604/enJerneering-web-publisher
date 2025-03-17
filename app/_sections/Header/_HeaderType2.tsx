"use client";

import React from "react";
import Image from "next/image";
import ButtonActions from "../ButtonActions";
import { HeaderData } from "./types/HeaderData";

interface HeaderProps {
  data: HeaderData;
}

const HeaderType2: React.FC<HeaderProps> = ({ data }) => {
  const {
    title,
    subtitle,
    buttons,
    imgUrl = "default-image.jpg",
  } = data;

  return (
    <div className="bg-gray-50 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={imgUrl}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Background Image"
        />
        {/* Tint Overlay */}
        <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
        {/* Gray tint */}
      </div>

      <div className="mx-auto max-w-[1440px] min-h-[624px] h-full py-20 px-6 flex gap-10 items-center justify-center lg:gap-16 z-10 relative">
        <div className="mt-10 w-full flex flex-col items-center justify-center gap-10 lg:mt-0 lg:h-full">
          <div className="flex flex-col gap-10 text-center">
            <h1 className="text-white">{title}</h1>
            <h6 className="text-white">{subtitle}</h6>
          </div>

          <ButtonActions buttons = {buttons}/>
        </div>
      </div>
    </div>
  );
};

export default HeaderType2;
