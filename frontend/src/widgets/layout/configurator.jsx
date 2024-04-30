import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography, Avatar } from "@mui/material";

function Configurator({ onClose }) {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  

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

  useEffect(() => {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      "Strive not to be a success, but rather to be of value. - Albert Einstein",
      "The only source of knowledge is experience. - Albert Einstein",
      "Stay hungry, stay foolish. - Steve Jobs"
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  const decodeToken = (token) => {
    return token ? JSON.parse(atob(token.split(".")[1])) : null;
  };


  return (
    <aside className="fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300">
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            {user && user.FullName}
          </Typography>
          {user && (
            <Typography className="font-normal text-blue-gray-600">
              {greeting}, {user.FullName.split(' ')[0]}!
            </Typography>
          )}
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        {user && (
          <>
            <div className="flex items-center mb-12">
              <Avatar sx={{ width: 64, height: 64 }} src="https://i.pravatar.cc/300" alt="Profile" />
              <div className="ml-4">
                <Typography variant="h6" color="blue-gray">
                  Name:
                </Typography>
                <Typography variant="body" color="gray" className="mt-1">
                  {user.FullName}
                </Typography>
              </div>
            </div>
            <div className="mb-12">
              <Typography variant="h6" color="blue-gray">
                Email:
              </Typography>
              <Typography variant="body" color="gray" className="mt-1">
                {user.Email}
              </Typography>
            </div>
            <div className="mb-12">
              <Typography variant="h6" color="blue-gray">
                Created Date:
              </Typography>
              <Typography variant="body" color="gray" className="mt-1">
                {user.CreatedAt && new Date(user.CreatedAt).toLocaleDateString()}
              </Typography>
            </div>
          </>
        )}
        <div className="mt-8">
          <Typography variant="body2" color="blue-gray">
            {randomQuote}
          </Typography>
        </div>
      </div>
    </aside>
  );
}

export default Configurator;
