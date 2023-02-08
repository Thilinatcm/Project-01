import React, { Component } from 'react'
import * as icons from 'react-icons/fa';
import './Subpages.css';
import axios from 'axios';

export default class Adjust extends Component {

    constructor(props){
        super(props);
        this.state={
            date_time:"",
            item_code:"",
            item_name:"",
            quntity:"",
            unit_price:"",
            amount:"",
            discription:""
    
        }
      }
    
      handleInputChange=(e)=>{
        const{name,value} = e.target;
    
        this.setState({
            ...this.state,
            [name]:value
        })
      }

      handleCalculateAmount=(e)=>{
        e.preventDefault();
        const {quntity,unit_price} =this.state;

        const a= quntity;
        const b= unit_price;
        const cab= a*b;
        ;

        this.setState({
            ...this.state,
            amount:cab
        })
      }
    
      onSubmint= (e) =>{
        e.preventDefault();
    
        const {date_time, item_code,item_name,quntity,unit_price,amount,discription} =this.state;
    
        const data={
            date_time:date_time,
            item_code:item_code,
            item_name:item_name,
            quntity:quntity,
            unit_price:unit_price,
            amount:amount,
            discription:discription,
            type:"issue"
           
    
        }
    
        console.log(data)
    
        axios.post("http://localhost:8000/fun/create",data).then((res)=>{
            if(res.data.success){
                alert("Successfully")
                this.setState(
                    {
                    date_time:"",
                    item_code:"",
                    item_name:"",
                    unit:"",
                    category:"",
                    amount:"",
                    discription:"",
                    type:""
                }
                )
            }
        })
    }

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
                            <h2>Issue</h2>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-11 col-md-6 col-sm-9 mt-2 mx-3'>
                    
                        <form>
                            <div>
                            <h5 className="mt-2">Date & Time:</h5>
                            <input type="datetime-local" className="form-control" name='date_time' value={this.state.date_time} onChange={this.handleInputChange}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Item Code:</h5>
                            <input type='text' placeholder='Enter Item Code' className="form-control" name='item_code' value={this.state.item_code} onChange={this.handleInputChange}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Item Name:</h5>
                            <input type='text' placeholder='Chack Item Name' className="form-control" name='item_name' value={this.state.item_name} onChange={this.handleInputChange}></input>
                            </div>
                            
                            <div>
                            <h5 className="mt-2">Item Quntity:</h5>
                            <input type='text' placeholder='Enter Item Quntity' className="form-control" name='quntity' value={this.state.quntity} onChange={this.handleInputChange}></input>
                            </div>

                            <div>
                            <h5 className="mt-2">Unit Price:</h5>
                            <input type='text' placeholder='Enter Unit Price' className="form-control" name='unit_price' value={this.state.unit_price} onChange={this.handleInputChange}></input>
                            </div>

                            <button type='submit' className='btn btn-success mt-2'  onClick={this.handleCalculateAmount}>Calculate Amount</button>

                            <div>
                            <h5 className="mt-2">Amount:</h5>
                            <input type='text' placeholder='Chack Amount' className="form-control" name='amount' value={this.state.amount} onChange={this.handleInputChange}></input>
                            </div> 
                            
                            <button className='btn btn-danger mt-2'>Clear</button>
                            <button type='submit' className='btn btn-success mt-2 ms-2'  onClick={this.onSubmint}>Save</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
  }
}
