import React, { Fragment, useEffect, useState} from "react";

import Edit from "./Edit";
const Input = () => {
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [data, setData] = useState([]);
  const [data1,setData1]= useState([{"a":1}]);
  
  const [func,setFunc]=useState(4)
  //const [records,setRecords]= useState([])
  //const [a,setA]=useState(0)
  /*const [currentPage,setCurrentPage]=useState(1)
  const perPage=6;
  const lastIndex=currentPage*perPage;
const firstIndex=lastIndex-perPage;*/
  /*const b = () =>{
    setA(Math.random())
  }
  const allData = async() =>{
    const response = await fetch(`http://localhost:5000/datas`,{
        method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
  
  }
  useEffect(() =>{
    allData()
  },[a])*/
  
  /*//const records=data1.slice(firstIndex,lastIndex)
  const npage = Math.ceil(data1.length/perPage);
  const numbers =[...Array(npage+1).keys()].slice(1) 
console.log(numbers);*/
/*const w=()=>{
  setWai(Math.round())
}*/
const d1= async()=>{
  const response = await fetch(`http://localhost:4000/datas/${description1}`,{
        method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
      console.log(1);
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
/*useEffect(()=>{
  w1()
},[wai])*/

/*const c=()=>{
  setCoo(Math.round())
}*/

const c1 = async()=>{
  
  const response = await fetch(`http://localhost:4000/data/cook`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
}
/*useEffect(()=>{
  c1()
},[coo])*/
/*const a=()=>{
  setAdm(Math.round())
}*/
const a1 = async()=>{
  
  const response = await fetch(`http://localhost:4000/data/admin`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
}

/*useEffect(()=>{
  a1()
},[adm])*/
/*const al=()=>{
  setAll(Math.round())
}*/
const al1 = async()=>{
  
  const response = await fetch(`http://localhost:4000/datas`,{
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
  }
} 
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      
      
      /*const response = await fetch(`http://localhost:5000/datas/${description}`,{
        method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
      /*const filterData = data.filter((e)=> e.username===description || e.role===description || e.id==description
      )
      setData1(filterData)
      */
      /*//setCurrentPage(1);
      setDescription("");*/
      d1();
      setDescription("");
      console.log();
      setFunc(0)

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center mt-4">Employee Edit</h2>
      <div className="d-flex align-items-end">
      <form className="d-flex mt-3" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => {setDescription(e.target.value); setDescription1(e.target.value)}}
          />
        
        <button className="btn btn-warning mx-2">Search</button>
      </form>
      <div className="btn-group mx-1">
  <button type="button" className="btn btn-warning dropdown-toggle h-50" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Search by Role 
  </button>
    <div className="dropdown-menu">
    <btn className="dropdown-item"
    onClick={()=>{
          /*const role='waiter';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);*/
      w1()
      setFunc(1);
      //setFunct(w);
      /*const filterData = data.filter((e)=>{
        return e.role==='waiter'
      })
      setData1(filterData)*/
      
     // setCurrentPage(1)
      }}>Waiter</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      /*const role='cook';
      const response = await fetch(`http://localhost:5000/data/${role}`,{
      method: "GET"
  });
  const jsonData = await response.json();
  setData(jsonData);
  setData1(jsonData);*/
  c1();
  setFunc(2);
  /*const filterData = data.filter((e)=>{
    return e.role==='cook'
  })
  setData1(filterData)*/
  //setCurrentPage(1)
  }}>Cook</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      /*const role='admin';
      const response = await fetch(`http://localhost:5000/data/${role}`,{
      method: "GET"
  });
  const jsonData = await response.json();
  setData(jsonData);
  setData1(jsonData);*/
  a1();
  setFunc(3);
  /*const filterData = data.filter((e)=>{
    return e.role==='admin'
  })
  setData1(filterData)*/
  //setCurrentPage(1)
    }}>Admin</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      //window.location="/";
      /*const response = await fetch(`http://localhost:5000/datas`,{
      method: "GET"
  });
  const jsonData = await response.json();
  setData(jsonData);
  setData1(jsonData);*/
  al1();
  setFunc(4);  
  //setData1(data);
  //setCurrentPage(1);
    }}>All Employees</btn>
    </div>
    </div>
    </div>
    {data1.length===0 ? (
        <p>No results were found...</p>
      ):<p></p>}
      <div>
      
      {" "}
      <table class="table table-hover table-bordered border-primary mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Update</th>
          
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id}>

              <td>{d.name}</td>
              <td>{d.role}</td>
              <td>{d.email_id}</td>
              <td>{d.address}</td>
              <td>{d.salary}</td>
              <td>
                <Edit todo={d} funct={work}/>  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
{/*
      <div className="container">
          <div className="row">
      {data.map(d =>(
        
          <div className="card col-sm-3 m-2 p-2" key={d.id}>
        <div className="card-body">
          
          <h5 className="card-title">Name: {d.username}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Role: {d.role}</h6>
          <h6 className="card-subtitle mb-2 text-muted">id: {d.id}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Email: {d.email}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Address: {d.address}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Salary: {d.salary}</h6>
          <p class="card-text">{d.salary}</p>
          
          <Editinfo info={d} fun={work}/>
          <Edit todo ={d} fun={work}/>
        </div>
      </div>
  ))}
  </div>
          </div>*/}
      {/*
      <div className="mx-5">
      <nav className="mx-5">
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
          </div>*/}
      
          </div>
    </Fragment>
  );
  /*function prePage(){
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
  }*/
};

export default Input;
