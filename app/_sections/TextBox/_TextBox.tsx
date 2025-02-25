"use client";

import React from "react";
import { TextBoxData } from "./types/TextBoxData";

interface TextBoxProps {
    data: TextBoxData;
  }
  
  const TextBoxType: React.FC<TextBoxProps> = ({ data }) => {
    const {
        content,
        textColor 
    } = data;

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="flex flex-col items-center justify-center space-y-6 flex-shrink-0 xl:max-w-[400px] text-center">
                <p className="text-base font-normal text-neutral-500 whitespace-pre-line" style={{color: textColor}}>
                    {content}
                </p>
            </div>
        </div>
    ); 
};

export default TextBoxType;
