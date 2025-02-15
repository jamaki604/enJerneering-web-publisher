"use client";

import React from "react";
import { TextBoxData } from "./types/TextBoxData";

interface TextBoxProps {
    data: TextBoxData;
  }
  
  const TextBoxType: React.FC<TextBoxProps> = ({ data }) => {
    const content = data.content;

    return (
        <div className="flex flex-col items-center justify-center space-y-6 flex-shrink-0 xl:max-w-[400px]">
            <p className="text-base font-normal text-neutral-500 text-center whitespace-pre-line">
                {content}
            </p>
        </div>
    ); 
};

export default TextBoxType;
