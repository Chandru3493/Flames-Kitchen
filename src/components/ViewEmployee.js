import React from 'react'
import './anuragstyles.css'

import { useState,useEffect } from 'react'
import Card from './Card'
import axios from 'axios';
import config from './terms';



const ViewEmployee = () => {
    
    const [view,setView] = useState();
    const [add,setAdd]=useState(false);
    const [data,setData]=useState({});
    
     
    

    
    const [inp,setInp]= useState("")
    const [found, setFound] = useState()
    const url = `http://${config.v}:${config.port}/employee?name=${inp}`
    const p=(datum)=>{
      setView(datum)
    }
    const  handlesearch = async () => {
       setView();
        const finding = await axios.get(url);

        
        const foundData = finding.data
       
        if(foundData.length===0){
            setFound()
        }else{
        setFound(foundData)}
        
      };
      const customfunc1 = (datum) => {
        setView(datum);
       

      };

      const push= async()=>{
        
          const {name,salary,address,role,id} = data;
          
          const rep = await axios.post(`http://${config.v}:${config.port}/addemployee`,{empname:name,empsalary:Number(salary),empaddress:address,emprole: role,empid: Number(id)});
          if(rep.data==="already exists"){
            window.alert("User already exists");          }else{
              window.alert("user successfully added")
            }

    }
      

  return (
    <div id='viewfull'>
      <h2 className='heading' >Employee Information search portal</h2>
      <div className="inpone">
      <p className='inptext'>Enter Employee name</p>
    <input className='buttona' id='addemp' type='button' onClick={()=>{setAdd(true);setFound(false);setView(false)}} value="Add Employee"/> <input value={inp} className='inp' disabled={add} onChange={(e)=>{setInp(e.target.value)}} id='searchbaremp' type='text'/><input className='buttona' id='searchemp' type='button' disabled={add} onClick={handlesearch} value="Search"/>
      
    </div>
    {found && <div className='megbox'>
    
    {!view && <><p className='inptext' id='res'>Results</p><div className='boxy'>
      
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
        <p className='deti'>  Role : {view.role}</p>
        </div>
        <div className='photoback'>
          <div className='photoholder'>
          <div className='empphoto'><p>photo</p>
            </div></div><div className='buttonhold'>
            <input type='button' id='gobackemp' className='buttona' value="return" onClick={()=>{setView()}}/>
            </div></div>

    </div></>)}

   
    
    
      
    
    </div>}
    {
      add && (<>
      <div className='megbox' id="addmeg">
      <div className='empbox' id='forms'>
      <div className="inptwo">
      <p className='inptext'>Enter Employee name</p>
      <input name='name' value={data.name} onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='text'/></div>
      
      <div className="inptwo">
        <p className='inptext'>Enter Employee role</p>
     <input value={data.role} name='role' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='text'/></div>
      
      <div className="inptwo">
        <p className='inptext'>Enter Employee address</p>
      <input value={data.address} name='address' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='text'/></div>
      <div className="inptwo">
        <p className='inptext'>Enter Employee salary</p>
      <input value={data.salary} name='salary' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='number'/></div>
      <div className='inptwo'><p className='inptext'>Enter Employee Id</p>
      <input value={data.id} name='id' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='number'/></div>
     <div> <input type='button' id="addreturn"  className='buttona' value="return" onClick={()=>{setAdd(false);setData({});}}/><input type='button' id="addbut" className='buttona' value="Add employee" onClick={push}/></div>
      </div>
      </div>
     
      </>)
    }


    </div>
  )
}

export default ViewEmployee