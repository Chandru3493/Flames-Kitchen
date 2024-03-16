import React, { useState } from 'react'
import './anuragstyles.css'


const Data = (props) => {
    const {fun,fun2,clickinf,ke} = props;
    const [hover,setHover]=useState(false)
 
    const info =props.info
  return (
    <>
    <div className='link bg-primary'></div>
    <div style={{display : "flex", flexDirection: "row"}}>
    <div onClick={()=>{
      fun(info);
    
     
      fun2(ke);
      
      }} className={ke===clickinf?"clickpt":(!hover?'datpt':'ddt')} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>i</div> <div style={{marginLeft:"5px",marginTop: "1px",fontWeight: "bold",paddingLeft:"5px"}}>- {info.time}</div></div>
    </>
  )
}

export default Data