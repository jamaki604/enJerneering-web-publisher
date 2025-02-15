import React from "react";
import { ContactData } from "./types/ContactData";
import FormContact from "./elements/FormContact";

interface ContactProps {
  data: ContactData;
}

const ContactType1: React.FC<ContactProps> = ({ data }) => {
  const { title, subtitle, primaryLabel } = data;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 gap-10 px-6 py-20 xl:gap-20 lg:p-20 xl:grid-cols-3">
        <div className="mx-auto max-w-screen-xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-base text-neutral-500">{subtitle}</p>
        </div>

        <FormContact primaryLabel={primaryLabel} isShowName={false} />
      </div>
    </div>
  );
};

export default ContactType1;
