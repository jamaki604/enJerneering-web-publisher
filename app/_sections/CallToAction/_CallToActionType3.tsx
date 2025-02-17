/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Image from "next/image";
import { CallToActionData } from "./types/CallToActionData";
import ButtonActions from "../ButtonActions";
import { classNames } from "@/_utils/helpers";

interface CallToActionProps {
  data: CallToActionData;
}

const CallToActionType3: React.FC<CallToActionProps> = ({ data }) => {
  const {
    title = "Default Title",
    subtitle = "Default Subtitle",
    tagLine = "Default Tagline",
    primaryLabel = "Primary Button",
    secondaryLabel = "Secondary Button",
    primaryUrl = "#",
    secondaryUrl = "#",
    imgUrl = "default-image.jpg",
    isRowReverse = false,
  } = data;

  return (
    <div className="bg-neutral-800 relative">
      <div className="mx-auto max-w-[1440px] lg:flex lg:items-center lg:justify-between">
        <div
          className={classNames(
            isRowReverse ? "lg:flex-row-reverse" : "",
            "md:grid md:grid-cols-2 min-h-[464px]"
          )}
        >
          <div className="flex flex-col justify-center gap-10 w-full lg:h-full  px-6 py-20 lg:p-20 bg-neutral-800">
            <div className="flex flex-col gap-6 text-left">
              <span className="text-base uppercase font-bold text-neutral-400">
                {tagLine}
              </span>
              <h1 className="text-5xl leading-h4 text-gray-50">{title}</h1>
              <h6 className="leading-6 text-neutral-400">{subtitle}</h6>
            </div>

            <ButtonActions
              primaryLabel={primaryLabel}
              secondaryLabel={secondaryLabel}
              primaryUrl={primaryUrl}
              secondaryUrl={secondaryUrl}
            />
          </div>

          <img
            alt="CTA Image"
            src={imgUrl}
            className={classNames(
              isRowReverse ? "row-start-1" : "",
              "lg:absolute w-full lg:w-1/2 right-0 object-cover md:h-full order-1"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CallToActionType3;
