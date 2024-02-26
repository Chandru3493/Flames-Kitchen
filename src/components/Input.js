import React, { Fragment, useState } from "react";
import Edit from "./Edit";

const Input = () => {
  const [description, setDescription] = useState("");
  const [description1,setDescription1]=useState(description);
  

  const [data, setData] = useState([]);
  // const [data1,setData1]= useState([{"a" :1}]);


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      
      
      const response = await fetch(`http://localhost:4000/datas/${description}`,{
        method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      // setData1(jsonData);
      setDescription1(description);
      setDescription("");
      
    } catch (err) {
      console.error(err.message);
    }
  };
  if (data.length === 0){
    return (
      <Fragment>
        <h3 className="text-center mt-5">Salary Check and Update</h3>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
        
        <button className="btn btn-warning">Search</button>
      </form>
      <div className="d-flex mt-4 justify-content-between mx-5">
        <button className="btn btn-warning"
        
        onClick={async()=>{
          const role='waiter';
          const response = await fetch(`http://localhost:4000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      // setData1(jsonData);
      }}>Waiter</button>
        <button className="btn btn-warning"
        onClick={async()=>{
          const role='cook';
          const response = await fetch(`http://localhost:4000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      // setData1(jsonData);
        }}>Cook</button>
        <button className="btn btn-warning"
         onClick={async()=>{
          const role='admin';
          const response = await fetch(`http://localhost:4000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      // setData1(jsonData);
        }}>Admin</button>
        
      </div>
      
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5">Salary Check and Update</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
        
        <button className="btn btn-warning">Search</button>
      </form>
      <div className="d-flex mt-4 justify-content-between mx-5">
        <button className="btn btn-warning"
        
        onClick={async()=>{
          const role='waiter';
          const response = await fetch(`http://localhost:4000/data/${role}`,{
          method: "GET"
      });
      const jsonData = response.json();
      setData(jsonData);
      // setData1(jsonData);
      console.log(jsonData);
      }}>Waiter</button>
        <button className="btn btn-warning"
        onClick={async()=>{
          const role='cook';
          const response = await fetch(`http://localhost:4000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      // setData1(jsonData);
        }}>Cook</button>
        <button className="btn btn-warning"
         onClick={async()=>{
          const role='admin';
          const response = await fetch(`http://localhost:4000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      // setData1(jsonData);
        }}>Admin</button>
        
      </div>
      <div>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Update</th>
          
          </tr>
        </thead>
        <tbody>
          {data.length>0 && data.map(todo => (
            <tr key={todo.id}>

              <td>{todo.name}</td>
              <td>{todo.role}</td>
              <td>{todo.salary}</td>
              <td>
                <Edit todo={todo} />  
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
