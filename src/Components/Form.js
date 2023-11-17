import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const Navigate = useNavigate();
  const [error, seterror] = useState();
  const [form, setForm] = useState({
    name: "",
    room: "",
  });

  const HandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    if (!form.name) {
      seterror("please! Enter your name");
      return false;
    }
    if (!form.room) {
      seterror("please! Select your room");
      return false;
    }
    seterror("");
    return true;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      setForm({
        name: "",
        room: "",
      });
      Navigate(`/chatroom/${form.room}`, { state: form });
    }
  };
  return (
    <div className="container" style={{ marginTop: "8rem" }}>
      <div className="row justify-content-center m-2">
        <form className="col-md-6 bg-warning p-4 m-3 rounded">
          <h1 className="text-center">Welcome To ChatClub</h1>
          <label className="mx-1 mt-3">Enter Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="form-control"
            name="name"
            value={form.name}
            onChange={HandleChange}
          />
          <label className="mx-1 mt-3">Select Your Room</label>
          <select
            id="option"
            name="room"
            className="form-control"
            value={form.room}
            onChange={HandleChange}
          >
            <option value="" disabled hidden>
              Select Room &#9662;
            </option>
            <option value="gaming">Gaming</option>
            <option value="coding">Coding</option>
            <option value="social">Social</option>
          </select>

          <button
            type="submit"
            onClick={HandleSubmit}
            className="btn btn-dark d-flex m-auto mt-4"
          >
            Submit
          </button>
          {error ? <small className="text-dark">{error}</small> : ""}
        </form>
      </div>
    </div>
  );
};

export default Form;
