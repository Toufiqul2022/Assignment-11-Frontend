import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(" ");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!password) {
      return toast.warning("Please enter your password");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful!", { autoClose: 1500 });

        setTimeout(() => {
          navigate(location.state || "/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google Login Successful!", { autoClose: 1500 });

        setTimeout(() => {
          navigate(location.state || "/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
    <div className="hero bg-base-200">
      <ToastContainer position="top-right" autoClose={40000} />
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                  required
                />
                <div className="mt-2">
                  <button onClick={handleForget} className="link link-hover">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="button"
                  onClick={googleSignIn}
                  className="btn text-2xl mt-2 w-full flex items-center justify-center gap-2"
                >
                  <span className="text-[16px]">Sign In with</span> <FcGoogle />
                </button>
                <Link to="/register" className="block mt-2 text-center">
                  New in our Website?{" "}
                  <span className="text-blue-600">Register</span>
                </Link>
                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
