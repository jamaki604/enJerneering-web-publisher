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

const ContactType3: React.FC<ContactProps> = ({ data }) => {
  const {
    title = "Default Title",
    subtitle = "Default Subtitle",
    phone = "+123456789",
    mail = "contact@enjerneering.com",
    address = "Default address",
    primaryLabel = "Default label",
    imgUrl = "default-image.jpg",
  } = data;

  return (
    <div className="relative isolate bg-gray-50">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 py-20 lg:static lg:p-20">
          <div className="mx-auto max-w-screen-xl lg:mx-0 lg:max-w-full">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={imgUrl}
                alt="Background image"
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-gray-50">{subtitle}</p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Phone</span>
                  <i className="pi pi-phone text-gray-50" aria-hidden="true" />
                </dt>
                <dd className="text-gray-50">
                  <a className="hover:text-neutral-800" href={`tel:${phone}`}>
                    {phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <i
                    className="pi pi-envelope text-gray-50"
                    aria-hidden="true"
                  />
                </dt>
                <dd className="text-gray-50">
                  <a className="hover:text-neutral-800" href={`mailto:${mail}`}>
                    {mail}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPinIcon className="w-5 h-5 text-gray-50" />
                </dt>
                <dd className="text-gray-50">{address}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="px-6 py-20 lg:p-20">
          <FormContact primaryLabel={primaryLabel} isShowName />
        </div>
      </div>
    </div>
  );
};

export default ContactType3;
