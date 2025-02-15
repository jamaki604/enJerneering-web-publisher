/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { ContactData } from "./types/ContactData";
import { classNames } from "@/_utils/helpers";
import FormContact from "./elements/FormContact";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface ContactProps {
  data: ContactData;
}

const ContactType4: React.FC<ContactProps> = ({ data }) => {
  const {
    title = "Default Title",
    subtitle = "Default Subtitle",
    primaryLabel = "Default label",
    mapSrc = "default maps",
  } = data;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:p-20 flex flex-col gap-10">
        <div className="mx-auto m-full md:max-w-screen-xl lg:max-w-none text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-base text-neutral-500">{subtitle}</p>
        </div>
        <div className="mx-auto w-full md:max-w-screen-xl lg:max-w-none grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <iframe
              src={mapSrc}
              width="656"
              height="436"
              className="rounded-2xl w-full shadow-xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <FormContact primaryLabel={primaryLabel} isShowName={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactType4;
