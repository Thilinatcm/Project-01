import React, { useState, useEffect } from "react";
import * as icons from 'react-icons/fa';
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";


export default function Login () {

  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ username: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { username, password } = data.errors;
          if (username) generateError(username);
          else if (password) generateError(password);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

    return (
      <div >
            <div className='background d-flex justify-content-center align-items-center'>
              <div className='loginbox d-flex justify-content-center align-items-center'>
                <div>
                  <icons.FaUserCircle size='7em' color='CCCCCC' className='mx-auto d-block'/>
                  <h2 className='text-center'>
                    LOGIN
                  </h2>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' placeholder='Username' className="form-control mt-3" name="username" 
                    onChange={(e) =>setValues({ ...values, [e.target.name]: e.target.value })}></input>

                    <input type='password' placeholder='Password' className="form-control mt-3" name="password"
                    onChange={(e) =>setValues({ ...values, [e.target.name]: e.target.value })}></input>

                    <div className='d-grid'> <button className='btn btn-success mt-3' type="submit">Login</button> </div>
                  </form>

                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
    )
 }
