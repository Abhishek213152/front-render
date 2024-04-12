import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  const loadData = async () => {
    setLoading(true); // Set loading to true before making the request
    try {
      const response = await axios.get(
        "https://contact-management-utxi.onrender.com/data"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false); // Set loading to false after the request completes (whether successful or not)
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(
          `https://contact-management-utxi.onrender.com/remove/${id}`
        );
        toast.success("Deleted Successfully");
        setTimeout(() => loadData(), 500);
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <div className="btn-container">
        <Link to="/addContact">
          <button className="button">Add Contact</button>
        </Link>
      </div>
      <div className="table-container">
        {loading ? ( // Display loading indicator if loading is true
          <div className="loading">Loading...</div>
        ) : (
          data.map((item) => (
            <div className="contact-card" key={item.id}>
              <div>
                <strong>Name:</strong> {item.name}
              </div>
              <div>
                <strong>Email:</strong> {item.email}
              </div>
              <div>
                <strong>Contact:</strong> {item.contact}
              </div>
              <div className="btn-group">
                <Link to={`/update/${item.id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteContact(item.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${item.id}`} className="btn btn-view">
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
