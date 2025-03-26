import React from 'react'
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');  // Check if user is logged in
    const isAdminLoggedIn = localStorage.getItem("admin_logged_in"); // For admin

    const handleLogout = () => {
        if (isAdminLoggedIn) {
            localStorage.removeItem("admin_logged_in"); // Remove admin session
            navigate("/admin");
        } else {
            localStorage.removeItem("token"); // Remove user token
            navigate("/");
        }
    };

    return (
        <nav className="bg-cyan-600 p-4 shadow-md">
            <ul className="flex justify-center space-x-6 text-white font-semibold">
                {/* If user is logged in, show only the system name and logout button */}
                {(token || isAdminLoggedIn) ? (
                    <>
                        <li className="text-2xl">Secure Task Management System(TMS)</li>
                        <button
                            onClick={handleLogout}
                            className="py-2 px-5 border text-xl border-cyan-400 rounded bg-cyan-50 text-cyan-950 font-bold hover:bg-cyan-900 hover:border-cyan-800 hover:text-white"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    // If not logged in, show login and register links
                    <>
                        <li>
                            <Link to="/" className="hover:text-cyan-950 text-2xl">Secure Task Management System(TMS)</Link>
                        </li>
                        <Link to="/login" className='py-2 px-2 border text-xl  border-cyan-400 rounded bg-cyan-50 text-cyan-950 font-bold
                     hover:bg-cyan-900 hover:border-cyan-800 hover:text-white'>Login</Link>

                        <Link to="/register" className='py-2 px-2 border text-xl border-cyan-400 rounded bg-cyan-50 text-cyan-950 font-bold
                     hover:bg-cyan-900 hover:border-cyan-800 hover:text-white'>Register</Link>
                    </>
                )}
            </ul>

        </nav>
    )
}

export default Navbar