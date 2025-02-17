"use client";

import React from "react";
import ButtonActions from "../ButtonActions";
import { HeaderData } from "./types/HeaderData";

interface HeaderProps {
  data: HeaderData;
}

const HeaderType1: React.FC<HeaderProps> = ({ data }) => {
  const {
    title = "Default Title",
    subtitle = "Default Subtitle",
    primaryLabel = "Primary Button",
    secondaryLabel = "Secondary Button",
    primaryUrl = "#",
    secondaryUrl = "#",
  } = data;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] min-h-[624px] py-20 px-6 gap-10  flex items-center justify-center lg:gap-16">
        <div className="w-full flex flex-col items-center justify-center gap-10 lg:h-full">
          <div className="flex flex-col gap-10 text-center">
            <h1>{title}</h1>
            <h6>{subtitle}</h6>
          </div>

          <ButtonActions
            primaryLabel={primaryLabel}
            secondaryLabel={secondaryLabel}
            primaryUrl={primaryUrl}
            secondaryUrl={secondaryUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderType1;
