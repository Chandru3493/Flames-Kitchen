import React from 'react'


const Card = (props) => {
  if (props.data && props.data.adcss ? props.data.adcss : true) {
    import('./anuragstyles.css');
  }
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