import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";
import { Home, Invoices, Items } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Users from "./pages/dashboard/users";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Invoices",
        path: "/invoices",
        element: <Invoices />,
      },
      {
        icon: <BeakerIcon {...icon} />,
        name: "Items",
        path: "/items",
        element: <Items />,
      },
    ],
  },
];

export default routes;
