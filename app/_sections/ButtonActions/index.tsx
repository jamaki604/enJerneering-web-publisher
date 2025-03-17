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
      {buttons.map((button) => (
        <Button
          key={button.id}
          label={button.buttonProps.label}
          color={button.buttonProps.color}
          iconLeft={button.buttonProps.icon ? <i className={button.buttonProps.icon}></i> : undefined}
          onClick={() =>
            handleRedirect(button.buttonProps.externalUrl || button.buttonProps.pagePath || "#")
          }
        />
      ))}
    </div>
  );
};

export default ButtonActions;
