import React, { Fragment, useState } from "react";

const Edit = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
 
  
  const updateDescription = async e => {
    e.preventDefault();
    console.log(description);
    console.log(todo.id)
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:4000/datas/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      console.log(response);
      
      
    
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>

    
      <div
        class="modal"
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Salary</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
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
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>


      <div
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
                  window.location='/';
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
                  window.location='/';
                }}
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

export default Edit;