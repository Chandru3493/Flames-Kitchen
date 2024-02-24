import React from 'react'
import './anuragstyles.css'

const Card = (props) => {
  const datum = props.input
  return(
    <div className='cardi' onClick={()=>{props.fun(datum)}}>
     <div className='cardtexti'>
     <p>Name: {datum.name}</p>
     <p>email: {datum.email_id}</p></div>
     
    </div>
  )
}

export default Card