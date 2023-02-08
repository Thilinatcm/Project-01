import React, { useEffect } from "react";
import * as icons from 'react-icons/fa';
import './Mainpages.css';
import NavBar from '../components/NavBar';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Home(){

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
        } else{
          toast(`Hi ${data.user} 🦄`, {
          });
        }
      }
    };
    verifyUser();
  },);

    return (
          <div className='background d-lg-flex justify-content-center align-items-center'>
            <div className='contentboxlg'>
              <div className='row'>
                <div className='col-3'>
                    <NavBar/>
                </div>

                    <div className='col-9'>
                      <div className='row mt-2'>
                        <div className='col-9 '>
                            <h2>Dashboard</h2>
                        </div>
                      </div>

                      <div className='row'>
                          <div className='col-2 ' >
                            <a href='/Add' className='btn btn-lg btn-outline-success mt-4' role='button'><icons.FaPlusCircle size='4em'/> <br/> Add</a>
                          </div>

                          <div className='col-2 ms-4'>
                            <a href='/Issue' className='btn btn-lg btn-outline-success mt-4' role='button'><icons.FaMinusCircle size='4em'/> <br/> issue</a>
                          </div>

                          <div className='col-2 ms-4'>
                            <a href='/Adjust' className='btn btn-lg btn-outline-success mt-4' role='button'><icons.FaAdjust size='4em'/> <br/> Adjust</a>
                          </div>
                      </div>
                    </div>
              </div>
              <ToastContainer /> 
            </div>
            
          </div>
           
    )
}
