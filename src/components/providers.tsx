import Preloader from "./preloader";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Preloader>{children}</Preloader>;
};
