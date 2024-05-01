import { Link, NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BeakerIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export function Sidenav() {
  return (
    <aside className="bg-white shadow-sm fixed inset-0 z-50 my-4 h-[calc(100vh-32px)] w-72 transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 top-p">
      <div className="relative">
        <button className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden">
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
        <li className="mx-3.5 mt-4 mb-2">
            <NavLink
              to="/"
              activeClassName="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              className="text-blue-gray-700 flex items-center gap-4 px-4 capitalize hover:bg-blue-100 transition-colors duration-200"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="font-black uppercase opacity-75">Dashboard</span>
            </NavLink>
          </li>
          <li className="mx-3.5 mt-4 mb-2">
            <NavLink
              to="/users"
              activeClassName="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              className="text-blue-gray-700 flex items-center gap-4 px-4 capitalize hover:bg-blue-100 transition-colors duration-200"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span className="font-black uppercase opacity-75">Users</span>
            </NavLink>
          </li>
          <li className="mx-3.5 mt-4 mb-2">
            <NavLink
              to="/items"
              activeClassName="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              className="text-blue-gray-700 flex items-center gap-4 px-4 capitalize hover:bg-blue-100 transition-colors duration-200"
            >
              <TableCellsIcon className="h-6 w-6" />
              <span className="font-black uppercase opacity-75">Items</span>
            </NavLink>
          </li>
          <li className="mx-3.5 mt-4 mb-2">
            <NavLink
              to="/invoices"
              activeClassName="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              className="text-blue-gray-700 flex items-center gap-4 px-4 capitalize hover:bg-blue-100 transition-colors duration-200"
            >
              <BeakerIcon className="h-6 w-6" />
              <span className="font-black uppercase opacity-75">Invoices</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/sign-in";
          }}
          className="text-white px-4 py-2 border border-blue-gray-100 rounded-md hover:bg-black transition-colors duration-200 bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidenav;
