import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNavbar = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token);
        const email = decodedToken.email;

        const response = await fetch(`http://localhost:8880/api/v1/users?email=${email}`);

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
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
    <nav className="bg-blue-500 text-white fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src="https://www.21ccare.com/img/sys-icon.png" alt="Logo" className="h-6" />
        <span className="font-bold text-lg">ABC PHARMACY</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <button className="lg:hidden focus:outline-none">
          <MenuIcon />
        </button>

        <div className="flex items-center gap-2">
          <AccountCircleIcon onClick={() => setShowUserDetails(!showUserDetails)} />
          {showUserDetails && (
            <div className="bg-white shadow-md rounded-lg p-4 absolute top-full right-0 mt-2">
              <p className="text-gray-600">{greeting}, {user ? user.FullName : "Loading..."}</p>
              <p className="text-gray-600">{user ? user.Email : "Loading..."}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
