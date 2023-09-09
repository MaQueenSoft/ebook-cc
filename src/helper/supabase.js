import React, { useEffect } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../redux/auth/actions";
import { ToastContainer } from "react-toast";
import { supabase } from "../supabase";

//To check the admin is logged-in or not
const user = localStorage.getItem("sb-fcyxcyxtpxksqvyeulus-auth-token");

/* if (location.pathname === "/signUp") {
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("error signing signUp");
  } else {
    navigate("/");
  }
} else {
  const data = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log("user_data > ", data.data.user);
  if (data.data.user) {
    dispatch(handleLogin(data.data));
    navigate("/");
  }
} */

const meraSession = async () => {
  try {
    const getSession = await supabase.auth.getSession();
    console.log("getSession:", getSession);
    return getSession;
  } catch (error) {
    console.log("getSession error:", error);
  }
};

const onLogout = async () => {
  const logout = await supabase.auth.signOut();
  console.log("ajay: ", logout);
  if (logout) {
    dispatch(handleLogout());
    navigate("/login");
  }
};
