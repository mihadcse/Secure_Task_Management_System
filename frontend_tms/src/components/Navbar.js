import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="bg-slate-900 p-4 shadow-md">
            <ul className="flex justify-center space-x-6 text-white font-semibold">
                <li>
                    <Link to="/" className="hover:text-cyan-500">Secure Task Management System(TMS)</Link>
                </li>
                <li>
                    <Link to="/tasks" className="hover:text-cyan-500">Tasks</Link>
                </li>
                <button className='bg-indigo-50 text-indigo-950 w-20 h-7 rounded-md'>
                    <Link to="/login" className="hover:text-cyan-500">Login</Link>
                </button>
                <button className='bg-indigo-50 text-indigo-950 w-20 h-7.5 rounded-md'>
                    <Link to="/register" className="hover:text-cyan-500">Register</Link>
                </button>
            </ul>
        </nav>
    )
}

export default Navbar