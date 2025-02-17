import { ButtonProps } from "@components/Button";
import { ShowUIState } from "@components/types/common";

export type NavbarData = {
  logo: string;
  menuList: NavbarMenu[];
  ctaButton: CtaButton;
  featuredData?: FeaturedData[];
  justifyContent: string;
  showContentFlags: {
    ctaButton: ShowUIState;
  };
};

export type NavbarMenu = {
  id: string;
  title: string;
  href: string;
  subLinks?: SubLink[];
  showFeatured?: boolean;
};

export type CtaButton = {
  label: string;
  href: string;
  color: ButtonProps["color"];
};

export type FeaturedData = {
  imgUrl: string;
  title: string;
  subTitle: string;
  blogUrl: string;
};

export type SubLink = {
  title: string;
  subTitle?: string;
  icon?: string;
  href: string;
  pageGroup?: string;
};
