import React, { Component } from 'react';
import * as icons from 'react-icons/fa';
import './Mainpages.css';
import NavBar from '../components/NavBar';
import axios from 'axios';

export default class Item extends Component {

    constructor(props){
        super(props);
    
        this.state={
            items:[]
        };
      }
    
      componentDidMount(){
        this.retrieveItems();
      }
    
      retrieveItems(){
        axios.get("http://localhost:8000/items").then(res=>{
          if(res.data.success){
            this.setState({
                items:res.data.existingItems
            });
            console.log(this.state.items)
          }
        });
      }

      ondelete=(id)=>{
        axios.delete(`http://localhost:8000/item/delete/${id}`).then((res)=>{
            alert('Item Delete Successfully')
            this.retrieveItems();
        })
      }

      filterData(items,searchKey){
        const result=items.filter((item)=>
        item.item_code.toLowerCase().includes(searchKey)||
        item.item_name.toLowerCase().includes(searchKey)
        )
        this.setState({items:result})
      }

      handleSearchArea=(e)=>{
       const searchKey=e.currentTarget.value;

       axios.get("http://localhost:8000/items").then(res=>{
          if(res.data.success){
            this.filterData(res.data.existingItems,searchKey)
          }
        });
      }


      filterUnit(items,searchUni){
        const result=items.filter((item)=>
        item.unit.includes(searchUni)
        )
        this.setState({items:result})
      }

      handleSearchUnit=(e)=>{
       const searchUni=e.currentTarget.value;

       axios.get("http://localhost:8000/items").then(res=>{
          if(res.data.success){
            this.filterUnit(res.data.existingItems,searchUni)
          }
        });
      }

      filterCategory(items,searchCate){
        const result=items.filter((item)=>
        item.category.includes(searchCate)
        )
        this.setState({items:result})
      }

      handleSearchCategory=(e)=>{
       const searchCate=e.currentTarget.value;

       axios.get("http://localhost:8000/items").then(res=>{
          if(res.data.success){
            this.filterCategory(res.data.existingItems,searchCate)
          }
        });
      }


  render() {
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
                                <h2>Item</h2>
                            </div>
                        </div>
                        <div className='row mt-2'>
                        <div className='mt-3'>  
                            <div className='fleft'><a href='/additem' className='btn btn-outline-success' role='button'><icons.FaPlusCircle/> Add Item</a></div>
                            <div className='fleft'><a href='/report' className='btn btn-outline-success  mx-2' role='button'><icons.FaClipboardList/> Report</a> </div>
                            
                            <div className='fleft ms-3'><h5 className="mt-2">Unit:</h5>
                            <select name='searchUnit' className="form-control" onChange={this.handleSearchUnit}>
                                <option></option>
                                <option value="kg">kg</option>
                                <option value="L">L</option>
                                <option value="m">m</option>
                                <option value="non">non</option>
                            </select> </div>

                            <div className='fleft ms-3'><h5 className="mt-2">Category:</h5>
                            <select name='searchCategory' className="form-control" onChange={this.handleSearchCategory}>
                                <option></option>
                                <option value="chemical">Chemical</option>
                                <option value="fuel">Fuel</option>
                                <option value="use_polythine">Use Polythine</option>
                                <option value="use_polythine_roll">Use Polythine Rool</option>
                                <option value="not_use_polythine">Not Use Polythine</option>
                                <option value="pallets">Pallets</option>
                                <option value="other">Other</option>  
                            </select> </div>
                            
                            
                            <div className='fright mx-4'>
                                <div className="form-outline">
                                    <input type="search" className="form-control" placeholder='Search...' name='searchQuery' onChange={this.handleSearchArea}></input>
                                    
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className='mt-3'>
                            <h5>All Items</h5>
                            <div className='table-responsive me-3'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Item ID</th>
                                        <th scope="col">Item Code</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Reorder Level</th>
                                        <th scope="col">Action</th>
                                        
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {this.state.items.map((items,index)=>(
                                        <tr key={index}>
                                        
                                            <th scope='row'>{index+1}</th>
                                        
                                                <td>{items.item_code}</td>
                                                <td>{items.item_name}</td>
                                                <td>{items.unit}</td>
                                                <td>{items.category}</td>
                                                <td>{items.reorder_level}</td>
                                                
                                                <td className='d-flex'>
                                                    <a className='btn btn-warning' href={`/edititem/${items._id}`}>
                                                    <icons.FaEdit/>
                                                    </a>
                                                    &nbsp;
                                                    <button className='btn btn-danger' onClick={()=>this.ondelete(items._id)}>
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
}
