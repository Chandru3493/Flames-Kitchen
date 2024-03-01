import React, { Fragment, useState } from "react";

const Edit = ({todo,funct}) => {

  const [salary, setSalary] = useState(todo.salary);
  const [name, setName] = useState(todo.name);
  const [email, setEmail] = useState(todo.email_id);
  const [address, setAddress] = useState(todo.address);
  const [role, setRole] = useState(todo.role);
  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { name,email,address,role,salary };
      const response = await fetch(
        `http://localhost:4000/datas/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      const jsonData = await response.json();
      if(jsonData.length===0){
        window.alert("Updated")
      }
      else{
        window.alert("Email already exists")
      }
      
      funct()
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning mx-2"
        data-toggle="modal"
        data-target={`#i${todo.id}`}
        onClick={() =>{setName(todo.name);setEmail(todo.email_id);setAddress(todo.address);setSalary(todo.salary);}}
      >
        Edit Info
      </button>
      <div
        class="modal"
        id={`i${todo.id}`}
       // onClick={() => {setName(todo.name);setEmail(todo.email_id);setAddress(todo.address);setSalary(todo.salary);}}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Info Id:{todo.id}</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() =>{setName(todo.name);setEmail(todo.email_id);setAddress(todo.address);setSalary(todo.salary);setRole(todo.role);}}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
            <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label>Role</label>
              <input
                type="text"
                className="form-control"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <label>Salary</label>
              <input
                type="text"
                className="form-control"
                value={salary}
                onChange={e => setSalary(e.target.value)}
              />
            
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#status"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() =>{setName(todo.name);setEmail(todo.email_id);setAddress(todo.address);setSalary(todo.salary);setRole(todo.role);}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      

      {/*<div
        class="modal"
        id="status"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={()=>{
                  func()
                }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <h4>Salary updated successfully</h4>
              
            </div>

            <div class="modal-footer">
            
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={()=>{
                  func()
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
              </div>*/}
    </Fragment>
  );
};

export default Edit;