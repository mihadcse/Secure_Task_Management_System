import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user details from the backend
    Axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      {user ? (
        <>
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-lg text-gray-600">Email: {user.email}</p>

          <br />
          <div className='flex justify-center space-x-4 mt-10 mr-4'>
            <Link to="/add-task" // Add Task for a specific user
              className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
              Add Task
            </Link>
            <Link to="/tasks"  // Tasks for a specific user
              className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
              Tasks
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
