"use client";

import React from "react";
import ModalVideo from "../ModalVideo";
import type { StaticImageData } from "next/image";
import ButtonActions from "../ButtonActions";
import { HeaderData } from "./types/HeaderData";
import { classNames } from "@/_utils/helpers";

interface HeaderProps {
  data: HeaderData;
}

const HeaderType3: React.FC<HeaderProps> = ({ data }) => {
  const {
    title,
    subtitle,
    buttons,
    tagLine,
    imgUrl,
    videoUrl = "default-video.mp4",
    isRowReverse = false,
  } = data;

  return (
    <div className="bg-gray-50">
      <div
        className={classNames(
          true ? "lg:flex-row-reverse" : "",
          "mx-auto max-w-[1440px] min-h-[624px] px-6 py-20 gap-10 lg:p-20 lg:flex lg:items-center lg:justify-between lg:gap-20"
        )}
      >
        <div className="mx-auto max-w-screen-xl lg:mx-0 flex flex-col gap-10 w-full lg:h-full lg:w-1/2">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-base uppercase font-bold">{tagLine}</span>
            <h1>{title}</h1>
            <h6>{subtitle}</h6>
          </div>

          <ButtonActions buttons = {buttons}/>
        </div>
        <div className="mx-auto max-w-screen-xl mt-10 lg:h-full lg:w-1/2 lg:mt-0">
          <ModalVideo
            thumb={imgUrl as unknown as StaticImageData}
            thumbWidth={600}
            thumbHeight={464}
            thumbAlt="Modal video thumbnail"
            video={videoUrl}
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderType3;
