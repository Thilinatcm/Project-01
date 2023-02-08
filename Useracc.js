import React, { useEffect } from "react";
import * as icons from 'react-icons/fa';
import './Mainpages.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Useracc (){
    
  this.state={
    users:[]
};
  
  const retrieveUsers=()=>{
    axios.get("http://localhost:8000/users").then(res=>{
      if(res.data.success){
        this.setState({
          users:res.data.existingUsers
        });
        console.log(this.state.users)
      }
    });
  }

  retrieveUsers();

  const ondelete=(id)=>{
    axios.delete(`http://localhost:8000/user/delete/${id}`).then((res)=>{
        alert('User Delete Successfully')
        this.retrieveUsers();
    })
  }
  ondelete();  
      
    
      
    return (
        
        <div className='background d-flex justify-content-center align-items-center'>
            <div className='contentboxlg'>
                <div className='row'>
                    <div className='col-3'>
                        <NavBar/>
                    </div>
                    

                    <div className=' col-9'>
                        <div className='row mt-2'>
                            <div className='col-9'>
                                <h2>User Account</h2>
                                
                            </div>
                        </div>
                        <div className='mt-3'>  
                            <div><a href='/newuser' className='btn btn-outline-success' role='button'><icons.FaUsers/> Create New User</a></div>

                        </div>

                        <div className='mt-3'>
                            <h5>All Users</h5>
                            <div className='table-responsive me-3'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact Number</th>
                                        <th scope="col">Account Type</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {this.state.users.map((users,index)=>(
                                        <tr key={index}>
                                        
                                            <th scope='row'>{index+1}</th>
                                        
                                                <td>{users.name}</td>
                                                <td>{users.position}</td>
                                                <td>{users.email}</td>
                                                <td>{users.contact_no}</td>
                                                <td>{users.account_type}</td>
                                                <td>{users.username}</td>

                                                <td className='d-flex'>
                                                    <a className='btn btn-warning' href={`/edituser/${users._id}`}>
                                                    <icons.FaEdit/>
                                                    </a>
                                                    &nbsp;
                                                    <button className='btn btn-danger' onClick={()=>this.ondelete(users._id)}>
                                                    <icons.FaTrash/>
                                                    </button>
                                                </td>
                                        
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
