import React from 'react'

const Transaction = (props) => {
    const data=props.jargon
  return (
    <div>
        <p className='infoline'>Balance at Start of Transaction: {data.type==="food order"?data.curbal-data.sum:data.curbal+data.sum}</p>
        <p className='infoline'>Time of transaction: {data.time}</p>
        <p className='infoline'>Mode of Transaction: {data.mode}</p>
        <p className='infoline'>Type of Transaction: {data.type}</p>
        <p className='infoline'>{data.type==="food order"?"customer":"recipient"}: {data.name}</p>
        <p className='infoline'>Reference id for transaction : {data.refid}</p>

        <p className='infoline'>{data.type==="food order"?"Items sold":"Items bought"}</p>
        {data.items.map((item,index)=>{
            return(<p> {index}.{item}</p>)
        })}
        <p className='infoline'>Transaction sum: {data.sum}</p>
        <p className='infoline'>Balance at End of Transaction: {data.curbal}</p>

        <p></p>
    </div>
  )
}

export default Transaction