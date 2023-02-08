import React, { Component } from 'react';
import './Mainpages.css';
import NavBar from '../components/NavBar';
import * as icons from 'react-icons/fa';
import axios from 'axios';

export default class Transaction extends Component {


    constructor(props){
        super(props);
    
        this.state={
            funs:[]
        };
      }
    
      componentDidMount(){
        this.retrieveTrans();
      }
    
      retrieveTrans(){
        axios.get("http://localhost:8000/funs").then(res=>{
          if(res.data.success){
            this.setState({
                funs:res.data.existingFuns
            });
            console.log(this.state.funs)
          }
        });
      }

      filterCategory(mainfuns,searchCate){
        const result=mainfuns.filter((fun)=>
        fun.type.includes(searchCate)
        )
        this.setState({funs:result})
      }

      handleSearchCategory=(e)=>{
       const searchCate=e.currentTarget.value;
       axios.get("http://localhost:8000/funs").then(res=>{
          if(res.data.success){
            this.filterCategory(res.data.existingFuns,searchCate)
          }
        });
      }



      filterTrans(mainfuns,searchTrans){
        const result=mainfuns.filter((fun)=>
        fun.item_code.toLowerCase().includes(searchTrans)||
        fun.item_name.toLowerCase().includes(searchTrans)||
        fun.date_time.toLowerCase().includes(searchTrans)
        )
        this.setState({funs:result})
      }

      handleSearchTrans=(e)=>{
       const searchTrans=e.currentTarget.value;

       axios.get("http://localhost:8000/funs").then(res=>{
          if(res.data.success){
            this.filterTrans(res.data.existingFuns,searchTrans)
          }
        });
      }


      ondelete=(id)=>{
        axios.delete(`http://localhost:8000/fun/delete/${id}`).then((res)=>{
            alert('Delete Successfully')
            this.retrieveTrans();
        })
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
                                <h2>Transaction</h2>
                            </div>
                        </div>
                        <div className='row mt-3'>
                        <div>  
                            
                            
                            <div className='fleft ms-3'>
                                <h5 className="mt-2">Category:</h5>
                                <select name='searchCategory' className="form-control" onChange={this.handleSearchCategory} >
                                    <option></option>
                                    <option value="add">add</option>
                                    <option value="issue">issue</option>
                                    <option value="adjust">adjust</option>
                                </select> </div>
                            
                            <div className='fleft ms-3'><input type="search" className="form-control" placeholder='Search...' name='searchQuery' onChange={this.handleSearchTrans}></input> </div>
                            
                        </div>
                        </div>

                        <div className='mt-3'>
                            <h5>All Transaction</h5>
                            <div className='table-responsive me-3'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Transaction Number</th>
                                        <th scope="col">Date & Time</th>
                                        <th scope="col">Item Code</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Quntity</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Discription</th>
                                        <th scope="col">Transaction Category</th>
                                        <th scope="col">Action</th>

                                        
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {this.state.funs.map((funs,index)=>(
                                        <tr key={index}>
                                        
                                            <th scope='row'>{index+1}</th>
                                        
                                                <td>{funs.date_time}</td>
                                                <td>{funs.item_code}</td>
                                                <td>{funs.item_name}</td>
                                                <td>{funs.quntity}</td>
                                                <td>{funs.unit_price}</td>
                                                <td>{funs.amount}</td>
                                                <td>{funs.discription}</td>
                                                <td>{funs.type}</td>
                                                
                                                <td className='d-flex'>
                                                    <a className='btn btn-warning' href={`/edittransaction/${funs._id}`}>
                                                    <icons.FaEdit/>
                                                    </a>
                                                    &nbsp;
                                                    <button className='btn btn-danger' onClick={()=>this.ondelete(funs._id)}>
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
