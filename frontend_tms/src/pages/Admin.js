import React, { useState } from 'react'

const Admin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password === "admin123") { // Hardcoded password
      alert("Admin login successful!");
    } else {
      setError("Invalid password");
    }
  };


  return (
    <div className="flex justify-center py-10">
      <div className="bg-cyan-50 p-6 border border-cyan-500 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-cyan-900 mb-4">Admin Login</h1>

        <form className="border p-4 rounded-md shadow-md bg-gray-50 space-y-4" >
          <input
            type="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white text-lg py-2 rounded-lg hover:bg-cyan-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admin