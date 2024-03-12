import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Data from './Data'
import Transaction from './Transaction'
import axios from 'axios';
import terms from './terms';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';
const config = terms.config;



const ViewFinancialReport = (props) => {
  if (props.data && props.data ? props.data : true) {
    import('./anuragstyles.css');
  }
  const [find,setFind] = useState();
  useEffect(()=>{
    
   handlesearch();
  },[])
  
  const [found,setFound]=useState();
  const [select,setSelect]=useState();
  
  const [startDate,setStartDate]=useState(new Date());
  const [click,setClick]=useState();
  var items =0
  const clicker=(id)=>{
    console.log(id)
   setClick(id);
  }

  
 
  const selection=(dataitem)=>{
       
       setSelect(dataitem)
  }
  
  const handlesearch=async()=>{
    setSelect();
    setFound();
    var yr = startDate.getFullYear().toString();
    var mon = ((startDate.getMonth()+1).toString().length===1?'0'+(startDate.getMonth()+1).toString():(startDate.getMonth()+1).toString());
    var day =((startDate.getDate()).toString().length===1?'0'+(startDate.getDate()).toString():(startDate.getDate()).toString());
    const date = yr+"-"+mon+"-"+day
    console.log(date);
    
    const dbfetch =await axios.get(`http://${config.v}:${config.port}/day?datestamp=${date}`)
    if(dbfetch.data==="No data for this date found"){
      if(find===undefined){
        setFind(false);
      }else{
         setFind(true);
         window.alert("No data for this date found");
      }
      return;
    }

    setFind(true);
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
    
 
 {find && found &&
  <div className='datavisualiser'>
    <div className='chart'>
      <div className='buttona'  id='start'>{found.starting_balance}</div>
      <div className='callus'>
        {found.transactions.map((transaction)=>{
          items++;
          const t = items.toString()
          return(
         <Data ke={t} info = {transaction} fun2={clicker} clickinf={click} fun={selection}/>)}

        )}
      </div>
      <div  className='buttona' id='end'>{found.finBal}</div>

    </div>
    {select &&
    <div className='board' ><Transaction data={props.data} jargon={select} /></div>}


  </div>}

  {!find && <div id='nfb'>
    
    
  <p id="nf">No data for today as of yet</p>

  </div>
    
  }
    
    
     </div>
     </> )
}

export default ViewFinancialReport