import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token);
        const email = decodedToken.email;
        console.log(email)

        const response = await fetch(`http://localhost:8880/api/v1/users?email=${email}`);

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(userData)
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const currentTime = new Date().getHours();
    let newGreeting = "";

    if (currentTime < 12) {
      newGreeting = "Good morning";
    } else if (currentTime < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }

    setGreeting(newGreeting);
  }, []);

  const decodeToken = (token) => {
    return token ? JSON.parse(atob(token.split(".")[1])) : null;
  };

  return (
    <>
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
          }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <Breadcrumbs
              className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
                }`}
            >
              <Link to={`/${layout}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" color="blue-gray">
              {page}
            </Typography>
          </div>
          <div className="flex items-center">
            <div className="mr-auto md:mr-4 md:w-56">
              <Input label="Search" />
            </div>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
            </IconButton>
            <IconButton
          variant="text"
          color="blue-gray"
          className="hidden items-center gap-1 px-4 xl:flex normal-case"
          onMouseEnter={() => setOpenConfigurator(true)}
          onMouseLeave={() => setOpenConfigurator(false)}
        >
          <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
        </IconButton>
          </div>
        </div>
      </Navbar>
      {openConfigurator && (
       <Card className="max-w-xs mx-auto">
       <Card.Body className="p-4">
         <Typography className="text-lg font-semibold mb-2" color="blue-gray">
           {user ? user.FullName : "Loading..."}
         </Typography>
         <Typography className="text-sm mb-2" color="blue-gray">
           {user ? user.Email : "Loading..."}
         </Typography>
         <Typography className="text-sm" color="blue-gray">
           {greeting}
         </Typography>
       </Card.Body>
     </Card>
     
      )}
    </>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
