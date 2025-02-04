import { windowOpen } from "..//_utils/helpers";

export default function useRedirect() {
  const handleRedirect = (url: string): void => {
    windowOpen(url);
  };

  return { handleRedirect };
}
