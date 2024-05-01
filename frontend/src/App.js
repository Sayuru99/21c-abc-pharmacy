// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/signIn";
import Home from "./pages/dashboard/home";
import Sidenav from "./components/sidenav";
import Invoices from "./pages/Invoices";
import Items from "./pages/items";
import Users from "./pages/users";
import './index.css'
import TopNavbar from "./components/topNav";

function AuthenticatedApp() {
  return (
    <div className="flex flex-col h-screen">
      <div className="top">
      <TopNavbar />
      </div>
      <div className="flex flex-grow">
        <Sidenav className="sidenav" />
        <div className="flex-grow overflow-y-auto content p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/items" element={<Items />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        {token ? (
          <Route path="*" element={<AuthenticatedApp />} />
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
