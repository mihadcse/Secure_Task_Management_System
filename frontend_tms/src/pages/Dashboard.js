import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
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
        setUser(response.data.user);
        setTasks(response.data.tasks);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await Axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted task from the state
      setTasks(tasks.filter(task => task._id !== taskId));
      alert("Task Deleted successfully!");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };


  return (
    <div className="container mx-auto p-6">
      {user ? (
        <>
          <h1 className="text-3xl font-bold ml-36">Welcome, {user.name}!</h1>
          <p className="text-lg text-gray-600 ml-36">Email: {user.email}</p>

          <br />
          <div className='flex justify-center space-x-4 mt-10 mr-4'>
            <Link to="/add-task"
              className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
              + Add Task
            </Link>
          </div>

          <div>
            {/* Task List */}
            <div className="mt-6 ml-36 w-9/12">
              <h2 className="text-3xl font-semibold text-center">My Tasks</h2>
              {tasks.length > 0 ? (
                <ul className="mt-4 space-y-4 text-2xl">
                  {tasks.map((task) => (
                    <li key={task._id} className="border p-4 rounded shadow">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-700">{task.title}</h3>
                        <p className="text-black text-xl break-words">{task.description}</p>
                        <p className="text-sm text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        <span
                          className={`px-3 py-1 text-lg font-bold rounded  ${task.priority === "High"
                            ? "bg-red-500 text-white"
                            : task.priority === "Medium"
                              ? "bg-yellow-500 text-black"
                              : "bg-green-500 text-black"
                            }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <br />
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-500 text-white text-lg font-semibold px-4 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-4">No tasks added yet.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
