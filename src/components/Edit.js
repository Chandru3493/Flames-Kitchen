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
      if(jsonData.length!==0){
        window.alert("Email already exists")
      }
  
      funct()
    } catch (err) {
      console.error(err.message);
    }
  };
  const delEmp = async() =>{
    
    const del = await fetch(`http://localhost:4000/delemp/${todo.id}`,
    {
      method:"PUT",
      headers: { "Content-Type": "application/json" }
    })
    //window.alert("Deleted Successfully")
    funct()
  }

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
                className="close"
                data-dismiss="modal"
                onClick={() =>{setName(todo.name);setEmail(todo.email_id);setAddress(todo.address);setSalary(todo.salary);setRole(todo.role);}}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="d-flex justify-content-around mb-3">
              <label className="mr-4">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              </div>
              <div className="d-flex justify-content-start mb-3">
              <label className="mr-5">Role</label>
              
              <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {role}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <btn class="dropdown-item" onClick={()=>{setRole("admin")}}>admin</btn>
    <btn class="dropdown-item" onClick={()=>{setRole("waiter")}}>waiter</btn>
    <btn class="dropdown-item" onClick={()=>{setRole("cook")}}>cook</btn>
  </div>
</div>
              </div>
            <div className="d-flex mb-3">
            <label className="mr-4">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
              
              <div className="d-flex mb-3">
              <label className="mr-2">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              </div>
              <div className="d-flex mb-3">
              <label className="mr-4">Salary</label>
              <input
                type="text"
                className="form-control"
                value={salary}
                onChange={e => setSalary(e.target.value)}
              />

              </div>
              
            
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
                id="liveToastBtn"
                data-dismiss="modal"
                onClick={() =>delEmp()}
              >
                Delete
              </button>
              <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;