import React, { useEffect } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toast";
import { fireAuthLogin } from "../../../helper/firebase";

const Login = () => {

  //toast - There are 4 base toast type available, success, error, info and warn E.g. toast('Hi there 👋'), toast.success('Successfullt Added!')
  //Custom Toast
  /* const customToast = () =>
  toast('Morning! Have a good day.', {
    backgroundColor: '#8329C5',
    color: '#ffffff',
  }) */

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("auth-token");
    if(token){
      navigate("/");
      console.log("navigate /")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const playload = {email, password};

    fireAuthLogin(playload).then(result => {
      if(result.status){
        toast.success('Successfully Logged In');
        localStorage.setItem("auth-token", result.data.token);
        localStorage.setItem("admin-info", result.data.info);
        navigate("/");
      }else{
        toast.error(result.message);
      }
    }).catch(error => {
      console.error(error);
      toast.error(error.message);
    });
    
  };

  return (
    <>
      <ToastContainer delay={3000} position="top-center" />
      <div className="flex min-h-screen flex-col justify-center py-16 sm:px-6 lg:px-8 bg-slate-50 bg-[url('https://img.freepik.com/free-vector/with-galaxy-theme-green-color_1308-37644.jpg?w=2000&t=st=1693642367~exp=1693642967~hmac=b4f84e403bee4cda0e75bb06c1a95cd81d1e2636a7a1f3bf2713530e4493c75b')]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="MaQueenSoft"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back, Get Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-pattern">
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>

              <div className="w-full justify-center text-center p-2">
                <h5 className="p-2 border-y-2" >Test Credentail</h5>
                <h6 className="pt-2">Email: ajay.chauhan@enpointe.io</h6>
                <h6>Password: 123456</h6>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
