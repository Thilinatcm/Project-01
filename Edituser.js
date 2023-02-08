import React, { Component } from 'react';
import * as icons from 'react-icons/fa';
import './Subpages.css';
import axios from 'axios';


export default class Edituser extends Component {
    
    

    constructor(props){
        super(props);
        this.state={
            name:"",
            position:"",
            email:"",
            contact_no:"",
            account_type:"",
            user_name:"",
            password:""
    
        }
      }
    
      handleInputChange=(e)=>{
        const{name,value} = e.target;
        
        this.setState({
            ...this.state,
            [name]:value
        })
      }
    
      onSubmint= (e) =>{
        e.preventDefault();
        const id = window.location.href.split('/')[4];
        const {name,position,email,contact_no,account_type,user_name,password} =this.state;
        const data={
            name:name,
            position:position,
            email:email,
            contact_no:contact_no,
            account_type:account_type,
            user_name:user_name,
            password:password
    
        }
    
        console.log(data)
    
        axios.put(`http://localhost:8000/user/update/${id}`,data).then((res)=>{
            if(res.data.success){
                alert("User Udpated Successfully");
                this.setState(
                    {
                    name:"",
                    position:"",
                    email:"",
                    contact_no:"",
                    account_type:"",
                    user_name:"",
                    password:""
                }
                )
            }
        })
        
      }

      
      componentDidMount(){
        const id = window.location.href.split('/')[4];
       
        axios.get(`http://localhost:8000/user/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    name:res.data.user.name,
                    position:res.data.user.position,
                    email:res.data.user.email,
                    contact_no:res.data.user.contact_no,
                    account_type:res.data.user.account_type,
                    user_name:res.data.user.user_name,
                    password:res.data.user.password
                });

                console.log(this.state.user)
            }
        });
      }
    

  render() {
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
                              <h2>Edit User</h2>
                             
                          </div>
                      </div>
                  </div>
  
                  <div className='row'>
                      <div className='col-11 col-md-6 col-sm-9 mt-2 mx-3'>
                      
                          <form>
                            <div>
                                 <h5 className="mt-2">Name:</h5>
                                <input type='text' name='name' placeholder='Enter Name' className="form-control" value={this.state.name} onChange={this.handleInputChange}>
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Position:</h5>
                                <input type='text' name='position' placeholder='Enter Position' className="form-control" value={this.state.position} onChange={this.handleInputChange} >
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Email:</h5>
                                <input type='email' name='email' placeholder='Enter Email' className="form-control" value={this.state.email} onChange={this.handleInputChange}>
                            </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Contact No:</h5>
                                <input type='text' name='contact_no' placeholder='Enter Contact number' className="form-control" value={this.state.contact_no} onChange={this.handleInputChange}>
                            </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Account Type:</h5>
                                <select name='account_type' className="form-control"  value={this.state.value} onChange={this.handleInputChange}>
                                    
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <h5 className="mt-2">User Name:</h5>
                                <input type='text' name='user_name' placeholder='Enter User Name' className="form-control" value={this.state.user_name} onChange={this.handleInputChange}>
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Password:</h5>
                                <input type='password' name='password' placeholder='Enter Password' className="form-control mt-2" value={this.state.password} onChange={this.handleInputChange}>
                                </input>
                            </div>

                            <div>
                                <h5 className="mt-2">Confirm Password:</h5>
                                <input type='password' name='confirmpassword' placeholder='Confirm Password' className="form-control mt-2" >
                                </input>
                            </div>

                              <button type='submit' className='btn btn-success mt-2 ms-2' onClick={this.onSubmint}>Update</button>
                          </form>
                      </div>
                  </div>
  
              </div>
          </div>
    )
  }
}
