import type { Metadata } from "next";
import NotFoundScene from "./not-found-scene";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const NotFoundPage = () => {
  return <NotFoundScene />;
};

export default NotFoundPage;
