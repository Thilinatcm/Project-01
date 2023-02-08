import React, { Component } from 'react';
import * as icons from 'react-icons/fa';
import './Subpages.css';
import axios from 'axios';

export default class Additem extends Component {

    constructor(props){
        super(props);
        this.state={
            item_code:"",
            item_name:"",
            unit:"",
            category:"",
            reorder_level:""
    
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
    
        const {item_code,item_name,unit,category,reorder_level} =this.state;
    
        const data={
            item_code:item_code,
            item_name:item_name,
            unit:unit,
            category:category,
            reorder_level:reorder_level
           
    
        }
    
        console.log(data)
    
        axios.post("http://localhost:8000/item/create",data).then((res)=>{
            if(res.data.success){
                alert("Item Add Successfully")
                this.setState(
                    {
                    item_code:"",
                    item_name:"",
                    unit:"",
                    category:"",
                    reorder_level:"" 
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
                              <a href="/item">
                                  <icons.FaArrowCircleLeft size='2.5em' color='#274F6A'/>
                              </a>
                          </div>
                          
                          <div className='fleft ms-2'>
                              <h2>Add Item</h2>
                          </div>
                      </div>
                  </div>
  
                  <div className='row'>
                      <div className='col-11 col-md-6 col-sm-9 mt-2 mx-3'>
                      
                          <form>
                            <div>
                                <h5 className="mt-2">Item Code:</h5>
                                <input type='text' name='item_code' placeholder='Enter Item Code' className="form-control" value={this.state.item_code} onChange={this.handleInputChange}></input>
                            </div>

                            <div>
                                <h5 className="mt-2">Item Name:</h5>
                                <input type='text' name='item_name' placeholder='Chack Item Name' className="form-control" value={this.state.item_name} onChange={this.handleInputChange}></input>
                            </div>

                            <div>
                                <h5 className="mt-2">Unit:</h5>
                                <select name="unit" className="form-control" value={this.state.value} onChange={this.handleInputChange}>
                                    <option></option>
                                    <option value="kg">kg</option>
                                    <option value="L">L</option>
                                    <option value="m">m</option>
                                    <option value="non">non</option>
                                </select>
                            </div>


                            <div>
                                <h5 className="mt-2">Category:</h5>
                                <select name='category' className="form-control" value={this.state.Value} onChange={this.handleInputChange}>
                                    <option></option>
                                    <option value="chemical">Chemical</option>
                                    <option value="fuel">Fuel</option>
                                    <option value="use_polythine">Use Polythine</option>
                                    <option value="use_polythine_roll">Use Polythine Rool</option>
                                    <option value="not_use_polythine">Not Use Polythine</option>
                                    <option value="pallets">Pallets</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                           

                            <div>
                            <h5 className="mt-2">Reorder Level:</h5>
                            <input type='text' name='reorder_level' placeholder='Enter Reorder Level' className="form-control" value={this.state.reorder_level} onChange={this.handleInputChange}></input>
                            </div>
                             
                              <button className='btn btn-danger mt-2'>Clear</button>
                              <button type='submit' className='btn btn-success mt-2 ms-2' onClick={this.onSubmint}>Save</button>

                          </form>
                      </div>
                  </div>
  
              </div>
          </div>
      )
    }
  }
  