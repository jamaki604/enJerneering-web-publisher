"use client";

import React from "react";
import useRedirect from "@/_hooks/useRedirect";
import Button from "@/_sections/Button";

interface ButtonActionsProps {
  primaryLabel: string;
  secondaryLabel: string;
  primaryUrl: string;
  secondaryUrl: string;
}

const ButtonActions: React.FC<ButtonActionsProps> = ({
  primaryLabel,
  secondaryLabel,
  primaryUrl,
  secondaryUrl,
}) => {
  const { handleRedirect } = useRedirect();

  return (
    <div className="flex items-center gap-4">
      <Button
        label={primaryLabel}
        iconLeft={<i className="pi pi-bolt"></i>}
        onClick={() => handleRedirect(primaryUrl)}
      />
      <Button
        color="secondary"
        label={secondaryLabel}
        onClick={() => handleRedirect(secondaryUrl)}
      />
    </div>
  );
};

export default ButtonActions;
