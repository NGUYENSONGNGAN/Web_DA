import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
