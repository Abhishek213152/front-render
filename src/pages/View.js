import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser]=useState({});

  const {id}=useParams();

  useEffect(() => {
    axios
      .get(`https://contact-management-utxi.onrender.com/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Details</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />

          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />

          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />

          <strong>Contact: </strong>
          <span>{user.contact}</span>
          <br />
          <br />

          <Link to="/">
            <input
              type="button"
              value="Go Back"
              style={{ cursor: "pointer" }}
            />
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default View;
