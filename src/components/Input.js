import React, { Fragment, useState } from "react";
import Edit from "./Edit";

const Input = () => {
  const [description, setDescription] = useState("");
  const [description1,setDescription1]=useState(description);
  

  const [data, setData] = useState([]);
  const [data1,setData1]= useState([{a:"1"}]);


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      
      
      const response = await fetch(`http://localhost:5000/datas/${description}`,{
        method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
      setDescription1(description);
      setDescription("");
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  if (data1.length === 0){
    return (
      <Fragment>
        <h1 className="text-center mt-5">Salary Check amd Update</h1>
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
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
      }}>Waiter</button>
        <button className="btn btn-warning"
        onClick={async()=>{
          const role='cook';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
        }}>Cook</button>
        <button className="btn btn-warning"
         onClick={async()=>{
          const role='accountant';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
        }}>Accountant</button>
        <button className="btn btn-warning"
         onClick={async()=>{
          const role='manager';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
        }}>Manager</button>
      </div>
      <h2 className="text-center mt-4">{description1} is not found...</h2>
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
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
      }}>Waiter</button>
        <button className="btn btn-warning"
        onClick={async()=>{
          const role='cook';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
        }}>Cook</button>
        <button className="btn btn-warning"
         onClick={async()=>{
          const role='accountant';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
        }}>Accountant</button>
        <button className="btn btn-warning"
         onClick={async()=>{
          const role='manager';
          const response = await fetch(`http://localhost:5000/data/${role}`,{
          method: "GET"
      });
      const jsonData = await response.json();
      setData(jsonData);
      setData1(jsonData);
        }}>Manager</button>
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
          {data.map(todo => (
            <tr key={todo.id}>

              <td>{todo.username}</td>
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
