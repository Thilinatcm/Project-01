import React, { Component } from 'react'
import * as icons from 'react-icons/fa';
import './Subpages.css';


export default class Issue extends Component {
  render() {
    return (
        <div className='background d-flex justify-content-center align-items-center'>
            <div className='container contentbox p-2'>
                <div className='row'>
                    <div className='col-12 mt-2'>
                        <div className='fleft'>  
                            <a href="/item">
                                <icons.FaArrowCircleLeft size='2.5em' color='#274F6A'/>
                            </a>
                        </div>
                        
                        <div className='fleft ms-2'>
                            <h2>Report</h2>
                        </div>
                    </div>
                </div>

                
                <div div className=' col-12'>
                        <div>  
                            <div className='fleft mx-3'> <h5 className="mt-2">Category:</h5><select name='Category' className="form-control"></select></div>
                            <div className='fleft mx-3'><h5 className="mt-2">Start Date:</h5><input type="date" className="form-control"/></div>
                            <div className='fleft mx-3'><h5 className="mt-2">End Date:</h5><input type="date" className="form-control"/></div>
                            <button type='button' className='btn btn-success mt-4 ms-2'>Filter</button>
                            <div className='fright mx-4'>
                            <div className='fleft mx-3'> <h5 className="mt-2">Book Type:</h5><select name='Type' className="form-control"></select></div>
                            <button type='button' className='btn btn-success mt-4 ms-'>Export</button>
                            
                            </div>

                        </div>
                        
                    </div>

            </div>
        </div>
    )
  }
}
