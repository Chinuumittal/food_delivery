import React, { useState, useEffect, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/Storecontext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ SetShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { setToken } = useContext(StoreContext);
  const url = "https://food-delivery-1-vgsl.onrender.com";

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newurl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(newurl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        SetShowLogin(false);

        toast.success(`${currState} successful!`, {
          position: "top-center",
          autoClose: 2000,
        });

        setData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("Authentication failed. Try again.", {
          position: "top-center"
        });
      }
    } catch (err) {
      console.error("Login/Register Error:", err);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center"
      });
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => SetShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </>
          )}
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          {currState === "Login" ? (
            <>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
