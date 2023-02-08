import React, { useEffect, useState } from "react";
import * as icons from 'react-icons/fa';
import './Subpages.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

export default function Add () {

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
            date_time:"",
            item_code:"",
            item_name:"",
            quntity:"",
            unit_price:"",
            amount:""
    
        })

        const {quntity,unit_price} =values;

        let a= quntity;
        let b= unit_price;

        let calamount= a*b;

        console.log(values);
        console.log(calamount);


           // document.getElementById('amovalue').value=calamount;

    
       


        const handleSubmit= async(e)=>{
            e.preventDefault();
            const {date_time, item_code,item_name,quntity,unit_price} =values;
            const amo=calamount;

        const data={
            date_time:date_time,
            item_code:item_code,
            item_name:item_name,
            quntity:quntity,
            unit_price:unit_price,
            amount:amo,
            type:"add"
           
    
        }
    
        console.log(data)
    
        axios.post("http://localhost:8000/fun/create",data).then((res)=>{
            if(res.data.success){
                toast("Successfully")
            }
        })

    }

    return (
        <div className='background d-flex justify-content-center align-items-center'>
            <div className='container contentbox p-2'>
                <div className='row'>
                    <div className='col-12 mt-2'>
                        <div className='fleft'>  
                            <a href="/dashboard">
                                <icons.FaArrowCircleLeft size='2.5em' color='#274F6A'/>
                            </a>
                        </div>
                        
                        <div className='fleft ms-2'>
                            <h2>Add</h2>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-11 col-md-6 col-sm-9 mt-2 mx-3'>
                    
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div>
                            <h5 className="mt-2">Date & Time:</h5>
                            <input type="datetime-local" className="form-control" name='date_time' 
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Item Code:</h5>
                            <input type='text' placeholder='Enter Item Code' className="form-control" name='item_code' 
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Item Name:</h5>
                            <input type='text' placeholder='Chack Item Name' className="form-control" name='item_name' 
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Item Quntity:</h5>
                            <input type='text' placeholder='Enter Item Quntity' className="form-control" name='quntity'
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}></input>
                            </div>

                            <div>
                            <h5 className="mt-2">Unit Price:</h5>
                            <input type='text' placeholder='Enter Unit Price' className="form-control" name='unit_price' 
                            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Amount:</h5>
                            <input type='text' placeholder='Chack Amount' className="form-control" name='amount' id="amovalue"
                            ></input>
                            </div>

                            <button type='reset' className='btn btn-warning mt-2 '>Clear</button>
                            <button type='submit' className='btn btn-success mt-2 ms-2'>Save</button>
                        </form>

                        <ToastContainer />
                    </div>
                </div>

            </div>
        </div>
        )
    }