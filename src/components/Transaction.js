import React from 'react';

const Transaction = (props) => {
  if (props.data && props.data ? props.data : true) {
    import('./anuragstyles.css');
  }
    const data=props.jargon
  return (
    <div className='' style={{width: "100%"}}>
        <p className='infoline'><div className='bold'>Balance at Start of Transaction</div>     : {data.type==="food order"?data.curbal-data.sum:data.curbal+data.sum}</p>
        <p className='infoline'><div className='bold'>Time of transaction</div>     : {data.time}</p>
        <p className='infoline'><div className='bold'>Mode of Transaction</div>     : {data.mode}</p>
        <p className='infoline'><div className='bold'>Type of Transaction</div>     : {data.type}</p>
        <p className='infoline'><div className='bold'>{data.type==="food order"?"customer":"recipient"}</div>     : {data.name}</p>
        <p className='infoline'><div className='bold'>Reference id for transaction </div>     : {data.refid}</p>

        <p className='infoline'><div className='bold'>{data.type==="food order"?"Items sold":"Items bought"}</div> : </p>
        {data.items.map((item,index)=>{
            return(<p style={{paddingLeft: "30px", fontSize: "75%"}}> {index+1}  .{item}</p>)
        })}
        <p className='infoline'><div className='bold'>Transaction sum</div>     : {data.sum}</p>
        <p className='infoline'><div className='bold'>Balance at End of Transaction</div>     : {data.curbal}</p>

        <p></p>
    </div>
  )
}

export default Transaction