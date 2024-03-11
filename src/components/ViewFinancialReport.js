import React, { useState } from 'react'

import Data from './Data'
import Transaction from './Transaction'
import axios from 'axios';
import terms from './terms';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
const config = terms.config;



const ViewFinancialReport = (props) => {
  if (props.data && props.data ? props.data : true) {
    import('./anuragstyles.css');
  }
  // const [day,setDay]=useState()
  // const [month,setMonth]=useState()
  // const [year,setYear]=useState()
  // const [fetched,setFetched]=useState([
  //   {date: "1-5-2024",StartBal: 25000,transactions: [{
  //     time: "0800",
  //     mode: "cash",
  //     name: "A",
  //     refid: "1",
  //     type: "food order",
  //     items: ["fried rice","chicken curry","naan","paneer butter masala"],
  //     sum: 1000

  //   },{
  //     time: "1000",
  //     mode: "online",
  //     name: "B",
  //     refid: "Xy123",
  //     type: "food order",
  //     items: ["fried rice","chicken curry","naan","kadai paneer"],
  //     sum: 1100

  //   },{
  //     time: "1100",
  //     mode: "cash",
  //     type: "supplier payment",
  //     name: "Supplier A",
  //     refid: "Xy1234",
  //     items: ["chicken","paneer","potatoes","flour","milk"],
  //     sum: 700

  //   },{
  //     time: "1130",
  //     mode: "online",
  //     type: "supplier payment",
  //     name: "Supplier B",
  //     refid: "GH1234",
  //     items: ["fish","carrots","apples"],
  //     sum: 500

  //   },]}
  // ])

  const [found,setFound]=useState();
  const [select,setSelect]=useState();
  
  const [startDate,setStartDate]=useState(new Date());

 
  const selection=(dataitem)=>{
       console.log(dataitem)
       setSelect(dataitem)
  }
  
  const handlesearch=async()=>{
    setSelect();
    var yr = startDate.getFullYear().toString();
    var mon = ((startDate.getMonth()+1).toString().length===1?'0'+(startDate.getMonth()+1).toString():(startDate.getMonth()+1).toString());
    var day =((startDate.getDate()).toString().length===1?'0'+(startDate.getDate()).toString():(startDate.getDate()).toString());
    const date = yr+"-"+mon+"-"+day
    console.log(date);
    
    const dbfetch =await axios.get(`http://${config.v}:${config.port}/day?datestamp=${date}`)
    if(dbfetch.data==="No data for this date found"){
      window.alert("No data for this date found");
      return;
    }
    var data = dbfetch.data;
    data.transactions.sort((a,b)=>{return a.time - b.time;})
    
    var bal = data.starting_balance
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
    
    setFound(data)


  }
  return (<>
  <div className='viewfull'>
    <div className='abovefin'>
    <div className='heading'>Financial Data visualiser</div>
    <div className='inpone' id="fininp">
    <p className='inptext'>Enter Date in DD-MM-YYYY</p>
    <div className='vissearch'><DatePicker selected={startDate} onChange={(date)=>{setStartDate(date);}} dateFormat="dd/MM/yyyy" className="form-control"/><input className='buttona' id='searchemp' type='button' onClick={handlesearch} value="Search"/></div>
   </div></div>
    
 
 {found &&
  <div className='datavisualiser'>
    <div className='chart'>
      <div className='buttona'  id='start'>{found.starting_balance}</div>
      <div className='callus'>
        {found.transactions.map((transaction)=>{
          return(
         <Data info = {transaction} fun={selection}/>)}

        )}
      </div>
      <div  className='buttona' id='end'>{found.finBal}</div>

    </div>
    {select &&
    <div className='board' ><Transaction data={props.data} jargon={select} /></div>}


  </div>}
    
    
     </div>
     </> )
}

export default ViewFinancialReport