import React, { Fragment, useEffect, useState} from "react";

import Edit from "./Edit";
const Input = () => {
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [data, setData] = useState([]);
  const [data1,setData1]= useState([{"a":1}]);
  
  const [func,setFunc]=useState(4)

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
          
      w1()
      setFunc(1);
      
      }}>Waiter</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
  c1();
  setFunc(2);
  
  }}>Cook</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
  a1();
  setFunc(3);
  
    }}>Admin</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
  al1();
  setFunc(4);  
  
    }}>All Employees</btn>
    <btn className="dropdown-item"
    onClick={()=>{
      
    prev1();
    setFunc(5);  
  
    }}>Prev Employees</btn>
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
          {data.map(d => (
            <tr key={d.id}>

              <td>{d.name}</td>
              <td>{d.role}</td>
              <td>{d.email_id}</td>
              <td>{d.address}</td>
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
                }}>Restore</btn>
                ):<Edit todo={d} funct={work}/>}
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
          </div>
    </Fragment>
  );

};

export default Input;
