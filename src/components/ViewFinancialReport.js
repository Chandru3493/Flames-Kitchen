import React, { useState } from 'react'
import './anuragstyles.css'
import Data from './Data'
import Transaction from './Transaction'

const ViewFinancialReport = () => {
  const [day,setDay]=useState()
  const [month,setMonth]=useState()
  const [year,setYear]=useState()
  const [fetched,setFetched]=useState([
    {date: "1-5-2024",StartBal: 25000,transactions: [{
      time: "0800",
      mode: "cash",
      name: "A",
      refid: "1",
      type: "food order",
      items: ["fried rice","chicken curry","naan","paneer butter masala"],
      sum: 1000

    },{
      time: "1000",
      mode: "online",
      name: "B",
      refid: "Xy123",
      type: "food order",
      items: ["fried rice","chicken curry","naan","kadai paneer"],
      sum: 1100

    },{
      time: "1100",
      mode: "cash",
      type: "supplier payment",
      name: "Supplier A",
      refid: "Xy1234",
      items: ["chicken","paneer","potatoes","flour","milk"],
      sum: 700

    },{
      time: "1130",
      mode: "online",
      type: "supplier payment",
      name: "Supplier B",
      refid: "GH1234",
      items: ["fish","carrots","apples"],
      sum: 500

    },]}
  ])

  const [found,setFound]=useState();
  const [select,setSelect]=useState();

  const selection=(dataitem)=>{
       console.log(dataitem)
       setSelect(dataitem)
  }
  
  const handlesearch=()=>{
    const date = day+"-"+month+"-"+year
    const dat = fetched.filter((x)=>date===x.date);
    var data = dat[0]
    var bal = data.StartBal
    var newtrans = []
    data.transactions.forEach((x)=>{
      
      if(x.type==="food order"){
        bal=bal+(x.sum)
      }else{
        bal=bal-(x.sum)
      }
      
      const curbal = bal
      const sub={...x,curbal}
      newtrans.push(sub)
    })

    const finBal = newtrans[newtrans.length-1].curbal
    data.transactions=newtrans
    data={...data,finBal}
    console.log(data)
    setFound(data)


  }
  return (<>
  <div className='viewfull'>
    <div className='abovefin'>
    <div className='heading'>Financial Data visualiser</div>
    <div className='inpone'>
    <p className='inptext'>Enter Date in DD-MM-YYYY</p>
    <input className='inp' id='day' value={day} onChange={(e)=>{setDay(e.target.value)}} type='number'/>-<input className='inp' id='month' value={month} onChange={(e)=>{setMonth(e.target.value)}} type='number'/>-<input className='inp' id='year' value={year} onChange={(e)=>{setYear(e.target.value)}} type='number'/><input className='button' id='searchemp' type='button' onClick={handlesearch} value="Search"/>
    </div></div>
 
 {found &&
  <div className='datavisualiser'>
    <div className='chart'>
      <div className='button'  id='start'>{found.StartBal}</div>
      <div className='callus'>
        {found.transactions.map((transaction)=>{
          return(
         <Data info = {transaction} fun={selection}/>)}

        )}
      </div>
      <div  className='button' id='end'>{found.finBal}</div>

    </div>
    {select &&
    <div className='board' ><Transaction jargon={select} /></div>}


  </div>}
    
    
     </div>
     </> )
}

export default ViewFinancialReport