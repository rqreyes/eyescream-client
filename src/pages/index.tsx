import { EasterEggPage } from "./easter-egg";
import { FlavorInfoPage } from "./flavor-info";
import { HomePage } from "./home";
import { LoginPage } from "./login";
import { NotFoundPage } from "./not-found";

export const pages = [
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <EasterEggPage />,
    headerName: "Easter Egg",
    path: "/easter-egg",
    privateRoute: true,
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <FlavorInfoPage />,
    path: "/flavor-info/:id",
  },
  {
    element: <NotFoundPage />,
    path: "*",
  },
];
