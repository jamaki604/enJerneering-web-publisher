import { PrimeMenu } from "@internalComponents/Menu";
import { useCallback, useRef } from "react";

export const useMenuRef = () => {
  const menuRef = useRef<PrimeMenu>(null);

  const onToggleMenu = useCallback(
    <T extends Element>(e: React.MouseEvent<T>) => {
      menuRef.current?.toggle(e);
    },
    []
  );

  return {
    menuRef,
    onToggleMenu,
  };
};
