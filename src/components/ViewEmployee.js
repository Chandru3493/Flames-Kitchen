import React from 'react'


import { useState,useEffect } from 'react'
import Card from './Card'
import axios from 'axios';
import config from './terms';



const ViewEmployee = (props) => {
    
    const [view,setView] = useState();
    const [add,setAdd]=useState(false);
    const [data,setData]=useState({role: 'admin'});
    
     
    if (props.data && props.data ? props.data : true) {
      import('./anuragstyles.css');
    }

    
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
        
          const {name,salary,address,role,email,password} = data;
          console.log(role)
          const rep = await axios.post(`http://${config.v}:${config.port}/addemployee`,{empname:name,empsalary:Number(salary),empaddress:address,emprole: role,emailid: email,password: password});
          if(rep.data==="already exists"){
            window.alert("User already exists");          }else{
              window.alert("user successfully added")
            }

    }
      

  return (
    <div className='viewfull'>
      <h2 className='heading' >Employee Information search portal</h2>
      <div className="inpone">
      <p className='inptext'>Enter Employee name</p>
    <input type="button" className='buttona' id='addemp' onClick={()=>{setAdd(true);setFound(false);setView(false)}} value="Add Employee"/> <input value={inp} className='inp' disabled={add} onChange={(e)=>{setInp(e.target.value)}} id='searchbaremp' type='text'/><input className='buttona' type="button" id='searchemp' disabled={add} onClick={handlesearch} value="Search"/>
      
    </div>
    {found && <div className='megbox'>
    
    {!view && <><p className='inptext' id='res'>Results</p><div className='boxy'>
      
        {found.map((datum,index)=>(
          
          <Card data={props.data} key={index} input={datum} fun ={p}/>
        ))}
    </div></>}


    {view && (<>
    <p className='inptext' id='res'>Details of {view.name}</p>
    <div className='empbox'>
    
      <div className='empdet'>
        <p className='deti'>  Name : {view.name}</p>
        <p className='deti'>  Employee email id: {view.email_id}</p>
        <p className='deti'>  Employee id: {view.id}</p>
        <p className='deti'>  Salary: {view.salary}</p>
        <p className='deti'>  Address: {view.address}</p>
        <p className='deti'>  Role : {view.role}</p>
        <p className='deti'>  Creation: {view.createdAt}</p>
        <p className='deti'>  Last Updation : {view.updatedAt}</p>
        </div>
        <div className='photoback'>
          <div className='buttonhold'>
            <input type='button' id='gobackemp' className='buttona' value="X" onClick={()=>{setView()}}/>
            </div></div>

    </div></>)}

   
    
    
      
    
    </div>}
    {
      add && (<>
      <div className='megbox' id="addmeg">
      <div className='empbox' id='forms'>
      <div className="inptwo" id="special"><div className='buttonhold2'><input type='button' id="addreturn"  className='buttona' value="X" onClick={()=>{setAdd(false);setData({});}}/></div>
      <p className='inptext' id='holdd'>Enter Employee name</p>
      <input name='name' value={data.name} onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='text'/></div>
      
      <div className="inptwo">
        <p className='inptext'>Enter Employee role</p>
     <select value={data.role} name='role' onChange={(e)=>{setData({...data,role : e.target.value})}}  >
     <option disabled={true}>Please select a role</option>
      <option value='waiter' >waiter</option>
      <option value='admin' >admin</option>
      <option value='cook'>cook</option>
      </select></div>
      
      <div className="inptwo" >
        <p className='inptext'>Enter Employee address</p> 
      <input value={data.address} name='address' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='text'/></div>
      <div className="inptwo">
        <p className='inptext'>Enter Employee salary</p>
      <input value={data.salary} name='salary' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='number'/></div>
      <div className='inptwo'><p className='inptext'>Enter Employee email</p>
      <input value={data.email} name='email' onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}} type='text'/></div>
      <div className='inptwo'><p className='inptext'>Enter Employee password</p>
      <input value={data.password} name='password' onChange={(e)=>{setData({...data,[e.target.name] : e.target.value})}} type='password'/></div>
     <div> <input type='button' id="addbut" className='buttona' value="Add employee" onClick={push}/></div>
      </div>
      </div>
     
      </>)
    }


    </div>
  )
}

export default ViewEmployee