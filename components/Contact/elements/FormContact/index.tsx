"use client";

import React from "react";
import Button from "../../../Button";

interface FormContactProps {
  requiredFields: {
    nameField: boolean;
    emailField: boolean;
    phoneField: boolean;
    messageField: boolean;
  };
}

// Pierson - UPdate Form Contact to take the boolean values from checkboxes and display accordingly
const FormContact: React.FC<FormContactProps> = ({ requiredFields }) => {
  const {
    nameField,
    emailField,
    phoneField,
    messageField
  } = requiredFields;
  return (
    <form
      action="#"
      method="POST"
      className="mx-auto grid max-w-screen-xl w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none xl:col-span-2"
    >
      {nameField && (
        <>
          <div>
            <label
              htmlFor="first-name"
              className="text-base font-medium text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-lg border-1 px-5 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 Contact:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-base font-medium text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-lg border-1 px-5 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 Contact:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </>
      )}

      {emailField && (
        <div className="sm:col-span-2">
          <label htmlFor="email" className="text-base font-medium text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-lg border-1 px-5 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 Contact:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
          </div>
        </div>
      )}
      {phoneField && (
        <div className="sm:col-span-2">
          <label
            htmlFor="phone-number"
            className="text-base font-medium text-gray-900"
          >
            Phone number
          </label>
          <div className="mt-2">
            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              autoComplete="tel"
              className="block w-full rounded-lg border-1 px-5 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 Contact:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              placeholder="Enter your phone numbers"
            />
          </div>
        </div>
      )}
      {messageField && (
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-base font-medium text-gray-900"
          >
            Your message
          </label>
          <div className="mt-2">
            <textarea
              name="message"
              id="message"
              rows={4}
              className="block w-full rounded-lg border-1 px-5 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 Contact:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              defaultValue={""}
              placeholder="Enter your message"
            />
          </div>
          <Button label ="Send Message" className="mt-6" />
        </div>
      )}
    </form>
  );
};

export default FormContact;
