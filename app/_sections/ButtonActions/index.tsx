"use client";

import React from "react";
import useRedirect from "@/_hooks/useRedirect";
import Button from "@/_sections/Button";
import { ButtonSettingsData } from "@components/types";

interface ButtonActionsProps {
  buttons: ButtonSettingsData[];
}

//Pierson - Change button actions to work with button objects instead of just labels/urls

const ButtonActions: React.FC<ButtonActionsProps> = ({ buttons }) => {
  const { handleRedirect } = useRedirect();

  return (
    <div className="flex items-center gap-4">
      {buttons.map((button) => {
        const { actionType, externalUrl, pagePath, label, color, icon } = button.buttonProps;

        const handleClick = () => {
          if (actionType === "toExternal" && externalUrl) {
            const formattedURL = externalUrl.startsWith("http") ? externalUrl : `https://${externalUrl}`;
            handleRedirect(formattedURL, true);
          } else if (actionType === "toPage" && pagePath) {
            handleRedirect(pagePath, false);
          }
        };

        return (
          <Button
            key={button.id}
            label={label}
            color={color}
            iconLeft={icon ? <i className={icon}></i> : undefined}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default ButtonActions;
