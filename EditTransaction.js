import React, { Component } from 'react'
import * as icons from 'react-icons/fa';
import './Subpages.css';
import axios from 'axios';


export default class EditTransaction extends Component {


    constructor(props){
        super(props);
        this.state={
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
    
      onSubmint= (e) =>{
        e.preventDefault();
        const id = window.location.href.split('/')[4];
        const {item_code,item_name,quntity,unit_price,amount,discription} =this.state;
    
        const data={
            
            item_code:item_code,
            item_name:item_name,
            quntity:quntity,
            unit_price:unit_price,
            amount:amount,
            discription:discription
           
    
        }
    
        console.log(data)
    
        axios.put(`http://localhost:8000/fun/update/${id}`,data).then((res)=>{
            if(res.data.success){
                alert("Function Udpated Successfully");
                this.setState(
                    {
                    
                    item_code:"",
                    item_name:"",
                    unit:"",
                    category:"",
                    amount:"",
                    discription:""
                }
                )
            }
        })
    }

    componentDidMount(){
        const id = window.location.href.split('/')[4];
       
        axios.get(`http://localhost:8000/fun/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    item_code:res.data.fun.item_code,
                    item_name:res.data.fun.item_name,
                    quntity:res.data.fun.quntity,
                    unit_price:res.data.fun.unit_price,
                    amount:res.data.fun.amount,
                    discription:res.data.fun.discription
                });

                console.log(this.state.fun)
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
                            <a href="/transaction">
                                <icons.FaArrowCircleLeft size='2.5em' color='#274F6A'/>
                            </a>
                        </div>
                        
                        <div className='fleft ms-2'>
                            <h2>Edit Transaction</h2>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-11 col-md-6 col-sm-9 mt-2 mx-3'>
                    
                        <form>
                            
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

                            <div>
                            <h5 className="mt-2">Amount:</h5>
                            <input type='text' placeholder='Chack Amount' className="form-control" name='amount' value={this.state.amount} onChange={this.handleInputChange}></input>
                            </div>

                            <div>
                            <h5 className="mt-2">Discription:</h5>
                            <input type='text' placeholder='Enter Discription' className="form-control" name='discription' value={this.state.discription} onChange={this.handleInputChange}></input>
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
