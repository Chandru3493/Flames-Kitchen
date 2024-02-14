import React from 'react'
import './anuragstyles.css'

const Card = (props) => {
  const datum = props.input
  return(
    <div className='cardi' onClick={()=>{console.log(datum);props.fun(datum)}}>
     <div className='cardtexti'>
     <p>Name: {datum.name}</p>
     <p>id: {datum.empid}</p></div>
     <div className='cardphotoi'>photo</div>
    </div>
  )
}

export default Card