import React from 'react'
import './anuragstyles.css'

const Card = (props) => {
  const datum = props.input
  return(
    <div className='card' onClick={()=>{console.log(datum);props.fun(datum)}}>
     <div className='cardtext'>
     <p>Name: {datum.name}</p>
     <p>id: {datum.empid}</p></div>
     <div className='cardphoto'>photo</div>
    </div>
  )
}

export default Card