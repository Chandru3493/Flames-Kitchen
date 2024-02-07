import React from 'react'
import './anuragstyles.css'

import { useState,useEffect } from 'react'
import Card from './Card'


const ViewEmployee = () => {
    const src ='E:/ppd/sample/src/imgs/sample.jpg';
    const [view,setView] = useState();
     
    

    const [data,setData]= useState([
      {name: "Anurag Bhattacharjee",empid:10,salary: 18,address: "location X"}, {name: "Anurag Bhattacharjee",empid:10,salary: 18,address: "location X"}, {name: "Anurag Bhattacharjee",empid:10,salary: 18,address: "location X"}, {name: "Anurag Bhattacharjee",empid:1,salary: 10,address: "location A"},{name: "Sanjay G",empid:2,salary: 30,address: "location C"},{name: "Chandru R",empid:3,salary: 30,address: "location D"},{name: "Muhammed Razin",empid:4,salary: 40,address: "location E"},{name: "Shubham Lingwal",empid:5,salary: 40,address: "location F"},{name: "Anurag Bhattacharjee",empid:7,salary: 50,address: "location G"}
    ])
    const [inp,setInp]= useState("")
    const [found, setFound] = useState()
    const p=(datum)=>{
      setView(datum)
    }
    const  handlesearch = async () => {
        const name = inp;
        const foundData = data.filter((datum) => datum.name === name);
        if(foundData.length===0){
            setFound()
        }else{
        setFound(foundData)}
        console.log(foundData)
      };
      const customfunc1 = (datum) => {
        setView(datum);
       

      };
      

  return (
    <div id='viewfull'>
      <h2 className='heading' >Employee Information search portal</h2>
      <div className="inpone">
      <p className='inptext'>Enter Employee name</p>
    <input value={inp} className='inp' onChange={(e)=>{setInp(e.target.value)}} type='text'/><input className='button' id='searchemp' type='button' onClick={handlesearch} value="Search"/>
      
    </div>
    {found && <div className='megbox'>
    
    {!view && <><p className='inptext' id='res'>Results</p><div className='box'>
      
        {found.map((datum,index)=>(
          
          <Card key={index} input={datum} fun ={p}/>
        ))}
    </div></>}


    {view && (<>
    <p className='inptext' id='res'>Details of {view.name}</p>
    <div className='empbox'>
    
      <div className='empdet'>
        <p className='deti'>  Name : {view.name}</p>
        <p className='deti'>  Employee id: {view.empid}</p>
        <p className='deti'>  Salary: {view.salary}</p>
        <p className='deti'>  Address: {view.address}</p>
        </div>
        <div className='photoback'>
          <div className='photoholder'>
          <div className='empphoto'><p>photo</p>
            </div></div><div className='buttonhold'>
            <input type='button' id='gobackemp' className='button' value="return" onClick={()=>{setView();}}/>
            </div></div>

    </div></>)}
    
    
      
    
    </div>}


    </div>
  )
}

export default ViewEmployee