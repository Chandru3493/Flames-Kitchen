import React, { Fragment, useState } from "react";

const Editinfo = ({info,funct}) => {

  const [username, setUsername] = useState(info.name);
  const [role, setRole] = useState(info.role);
  const [email, setEmail] = useState(info.email_id);
  const [address, setAddress] = useState(info.address);
  const [salary, setSalary] = useState(info.salary);
  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { username,role,email,address };
      const response = await fetch(
        `http://localhost:4000/datas/${info.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      funct()
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${info.id}`}
      >
        Edit info
      </button>

    
      <div
        class="modal"
        id={`id${info.id}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Info Id: {`${info.id}`}</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {setUsername(info.name); setRole(info.role); setEmail(info.email); setAddress(info.address);setSalary(info.salary);}}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="d-flex">
              <h5 for="username">Name</h5>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              </div>
              
              <label for="role">Role</label>
                <input
                type="text"
                className="form-control"
                id="role"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            
              
              <label for="email">Email</label>
                <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label for="address">Address</label>
                <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <label for="salary">Salary</label>
                <input
                type="text"
                className="form-control"
                id="salary"
                value={salary}
                onChange={e => setSalary(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {setUsername(info.name); setRole(info.role); setEmail(info.email); setAddress(info.address);setSalary(info.salary);}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>


      
    </Fragment>
  );
};

export default Editinfo;