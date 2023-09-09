import React, { useEffect } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../redux/auth/actions";
import { ToastContainer } from "react-toast";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";

//https://medium.com/@magyarn/vuefire-crud-todo-list-app-part-1-e069c46b50c6
//https://cloud.google.com/firestore/docs/create-database-web-mobile-client-library#web-version-9_2
//https://firebase.google.com/docs/auth/web/password-auth

export const fireAuthLogin = async (playload) => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      playload.email,
      playload.password
    );

    const user = userCredential.user;
    /* localStorage.setItem("auth-token", user.accessToken);
    localStorage.setItem("admin-info", JSON.stringify(user)); */

    console.log("user", user)

    return {
      status: true,
      message: "Success",
      data: {token: user.accessToken, info: JSON.stringify(user)}
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      status: false,
      message: errorMessage,
      data: {token: null, info: null}
    };
  }
};
