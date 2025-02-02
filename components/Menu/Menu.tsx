import * as React from 'react';
import {
  Menu as PrimeMenu,
  MenuProps as PrimeMenuProps,
} from "primereact/menu";
import { forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const menuStyles = tv({
  slots: {
    root: "py-1 bg-white rounded-md mt-2 shadow-menu",
    action: [
      "px-4 py-3.5 font-medium text-sm border-b border-border-100",
      "hover:bg-background-100 transition-colors",
    ],
    label: "[&:not(:first-child)]:ml-2",
  },
});

interface MenuProps extends PrimeMenuProps, VariantProps<typeof menuStyles> {}

const Menu = forwardRef<PrimeMenu, MenuProps>(
  ({ className, ...props }, ref) => {
    const { root, action, label } = menuStyles({ className });

    return (
      <PrimeMenu
        ref={ref}
        pt={{
          root: {
            className: root(),
          },
          action: {
            className: action(),
          },
          label: {
            className: label(),
          },
        }}
        {...props}
      />
    );
  }
);
Menu.displayName = "Menu";

export { Menu, PrimeMenu, menuStyles };
