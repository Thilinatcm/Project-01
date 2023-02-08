import React, { Component } from 'react';
import * as icons from 'react-icons/fa';
import './Subpages.css';

export default class Profile
 extends Component {
  render() {
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
              <h2>Profile</h2>
            </div>
          </div>
        </div>
          <div className='row mt-4'>
            <div className='col-12 col-sm-3 text-center' >
              <icons.FaUserCircle size='7em' color='CCCCCC' className='mx-auto d-block'/>
              <label >Name</label> <br/>
              <label >Position</label>
            </div>
            <div className='col-12 col-sm-6'>
            <h5>Name:</h5><label>xxxxxx</label>
            <h5>Position:</h5><label>xxxxxx</label>
            <h5>Contact Number:</h5><label>xxxxxx</label>
            <h5>Email:</h5><label>xxxxxx</label>
            <h5>Change Password:</h5>
            <form>
                <input type='password' placeholder='Old Password' className="form-control mt-2"></input>
                <input type='password' placeholder='New Password' className="form-control mt-2"></input>
                <button className='btn btn-danger mt-2'>Clear</button>
                <button type='submit' className='btn btn-success mt-2 ms-2'>Change</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
