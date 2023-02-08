import React, { useEffect, useState } from "react";
import * as icons from 'react-icons/fa';
import './Subpages.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Newuser() {

    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/");
      } else {
        const { data } = await axios.post(
          "http://localhost:8000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/");
        } 
        }
    };
    verifyUser();
    }
  );

    const [values, setValues]=useState({
        
        name:"",
        position:"",
        email:"",
        contact_no:"",
        account_type:"",
        username:"",
        password:""
    });

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const{data}=await axios.post("http://localhost:8000/register",{
                ...values,
            },
            {
                withCredentials:true,
            }
            
            
            );

            if (data) {
                if (data.errors) {
                  const { username, password } = data.errors;
                  if (username) generateError(username);
                  else if (password) generateError(password);
                } else {
                    navigate("/useraccount");
                }
              }

        }catch(err){
            console.log(err);
        }
    };


      return (
          <div className='background d-flex justify-content-center align-items-center'>
              <div className='container contentbox p-2'>
                  <div className='row'>
                      <div className='col-12 mt-2'>
                          <div className='fleft'>  
                              <a href="/useraccount">
                                  <icons.FaArrowCircleLeft size='2.5em' color='#274F6A'/>
                              </a>
                          </div>
                          
                          <div className='fleft ms-2'>
                              <h2>Create New User</h2>
                          </div>
                      </div>
                  </div>
  
                  <div className='row'>
                      <div className='col-11 col-md-6 col-sm-9 mt-2 mx-3'>
                      
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                 <h5 className="mt-2">Name:</h5>
                                <input type='text' name='name' placeholder='Enter Name' className="form-control"  
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Position:</h5>
                                <input type='text' name='position' placeholder='Enter Position' className="form-control" 
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Email:</h5>
                                <input type='email' name='email' placeholder='Enter Email' className="form-control"
                                 onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                            </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Contact No:</h5>
                                <input type='text' name='contact_no' placeholder='Enter Contact number' className="form-control"
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                            </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Account Type:</h5>
                                <select name='account_type' className="form-control"  
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                                    <option></option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <h5 className="mt-2">User Name:</h5>
                                <input type='text' name='username' placeholder='Enter User Name' className="form-control" 
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Password:</h5>
                                <input type='password' name='password' placeholder='Enter Password' className="form-control mt-2" 
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                                </input>
                            </div>

                            
                              <button className='btn btn-danger mt-2'>Clear</button>
                              <button type='submit' className='btn btn-success mt-2 ms-2'>Create</button>
                          </form>
                          <ToastContainer />
                      </div>
                  </div>
  
              </div>
          </div>
    )
}
  