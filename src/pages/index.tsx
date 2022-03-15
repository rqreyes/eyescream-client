import { EasterEggPage } from "./easter-egg";
import { FlavorInfoPage } from "./flavor-info";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";
import { ProfilePage } from "./profile";

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
    element: <ProfilePage />,
    path: "/profile",
    privateRoute: true,
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
