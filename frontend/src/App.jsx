import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { useAuth } from "./layouts/useAuth";

function App() {
  const { authenticated, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={authenticated ? <Dashboard /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/auth/*"
        element={!authenticated ? <Auth /> : <Navigate to="/dashboard/home" />}
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default App;
