import React, { Fragment, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import('./anuragstyles.css');
import Edit from "./Edit";
const Input = () => {
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [data, setData] = useState([]);
  const [data1,setData1]= useState([{"a":1}]);
  
  const [func,setFunc]=useState(4)
  const [currentPage,setCurrentPage]=useState(1)
  const perPage=6;
  const lastIndex=currentPage*perPage;
const firstIndex=lastIndex-perPage;
const d1= async()=>{
  const response = await fetch(`http://localhost:4000/datas/${description1}`,{
        method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
      
      setDescription1(description);
      setDescription("");  
}
const w1 = async()=>{

  const response = await fetch(`http://localhost:4000/data/waiter`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
}


const c1 = async()=>{
  
  const response = await fetch(`http://localhost:4000/data/cook`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
}

const a1 = async()=>{
  
  const response = await fetch(`http://localhost:4000/data/admin`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
}


const al1 = async()=>{
  
  const response = await fetch(`http://localhost:4000/datas`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
}

const prev1 = async()=>{
  const response = await fetch(`http://localhost:4000/prevdatas`,{
    method: "GET"
});
const jsonData = await response.json();
setData(jsonData);
setData1(jsonData);
}
useEffect(()=>{
  al1()
},[]
)

const records=data1.slice(firstIndex,lastIndex)
  const npage = Math.ceil(data1.length/perPage);
  const numbers =[...Array(npage+1).keys()].slice(1)

const notify2 = () =>{
  toast.success('Deleted Successfully!', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  
    });
}  
const notify1 = () =>{
  toast.success('Updated Successfully!', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });
  
} 

const notify3 = () =>{
  toast.warning('Email already exists!', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });
  
} 

const work =()=>{
  if (func===1){
    w1()
  }else if(func===2){
    c1()
  }else if(func===3){
    a1()
  }else  if(func===4){
    al1()
  }else if(func===0){
    d1()
  }else if(func===5){
    prev1()
  }
} 
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      d1();
      setDescription1(description) 
      setDescription("");
      console.log();
      setFunc(0)
      setCurrentPage(1)
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
    <div className="d-flex justify-content-between">

    
      <h4 className="text-center mt-4 ml-3">Employee Edit</h4>
      <div className="d-flex justify-content-end align-items-end">
      <form className="d-flex mt-3" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => {setDescription(e.target.value); setDescription1(e.target.value)}}
          />
        
        <button className="btn btn-warning mx-2 px-3">Search</button>

{//<button className="buttona">Search</button>
}
      </form>
      <div className="btn-group mx-1">
  <button type="button" className="btn btn-warning dropdown-toggle px-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Search by Role 
  </button>
 {/*<button type="button" className="buttona" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Search by Role 
</button>*/}
    <div className="dropdown-menu">
    <btn className="dropdown-item"
    onClick={()=>{
          
      w1()
      setFunc(1);
      setCurrentPage(1)
      }}>Waiter</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
  c1();
  setFunc(2);
  setCurrentPage(1)
  }}>Cook</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
  a1();
  setFunc(3);
  setCurrentPage(1)
    }}>Admin</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
  al1();
  setFunc(4);  
  setCurrentPage(1)
    }}>All Employees</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
    prev1();
    setFunc(5);  
    setCurrentPage(1)
    }}>Prev Employees</btn>
    </div>
    </div>
    </div>
    
      </div>
      <div className="d-flex justify-content-center">
      {data1.length===0 && func ===0? (
        <p>No results were found for {description1}</p>
      ):data1.length===0 && func!=0?(<p>No results were found...</p>):(<p></p>)}
      </div>
      
      <div className="mr-3 ml-3">
      
      {" "}
      <table class="table table-hover table-bordered border-primary mt-5 text-center">
        <thead>
          <tr className="table-warning">
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Update</th>
          
          </tr>
        </thead>
        <tbody>
          {records.map(d => (
            <tr key={d.id}>

              <td className="text-capitalize">{d.name}</td>
              <td className="text-capitalize">{d.role}</td>
              <td>{d.email_id}</td>
              <td className="text-capitalize">{d.address}</td>
              <td>{d.salary}</td>
              <td>
              {func===5 ? (
                <btn className="btn btn-warning" onClick={async()=>{
                  const restore = await fetch(`http://localhost:4000/restore/${d.id}`,
                    {
                      method:"PUT",
                      headers: { "Content-Type": "application/json" }
                    })
                    work()
                    notify1()
                }}>Restore</btn>
                ):<Edit todo={d} funct={work} stat1={notify1} stat2={notify2} stat3={notify3}/>}
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-items-center mx-2 my-4">
        
        <nav className="">
        <ul className="pagination">
            <li className="page-item">
              <btn className="page-link" onClick={prePage}>Prev</btn>
            </li>
            {
              numbers.map((n,i)=>
                <li className={`page-item ${currentPage === n ? `active` : ``}`} key={i}>
                  <btn className='page-link' onClick={()=>changePage(n)}>{n}</btn>
                </li>
              )
            }
            <li className="page-item">
              <btn className="page-link" onClick={nxtPage}>Next</btn>
            </li>
        </ul>
        
      </nav>
        
      
      </div>
      
      <ToastContainer />
      </div>
    </Fragment>
  );
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }    
  }
  function changePage(n){
    setCurrentPage(n)
  }
  function nxtPage(){
    if(currentPage !== npage){
      setCurrentPage(currentPage+1)
    }
  }
};

export default Input;
