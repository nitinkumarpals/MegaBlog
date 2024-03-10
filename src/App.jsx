import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header, Footer } from "./components";
import "./App.css";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

useEffect(() => {
  const loadData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log("loading error", error);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);

  return !loading ? ( 
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
    <Header />
    <main>
      {/* <Outlet/> */}
    </main>
    <Footer />
    </div>
    </div>
  ) : null;
}

export default App;
