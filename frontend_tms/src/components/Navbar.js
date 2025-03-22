import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="bg-cyan-600 p-4 shadow-md">
            <ul className="flex justify-center space-x-6 text-white font-semibold">
                <li>
                    <Link to="/" className="hover:text-cyan-950 text-2xl">Secure Task Management System(TMS)</Link>
                </li>
                <li>
                    <Link to="/tasks" className="hover:text-cyan-950 text-2xl">Tasks</Link>
                </li>
                    <Link to="/login" className='py-2 px-2 border text-xl  border-cyan-400 rounded bg-cyan-50 text-cyan-950 font-bold
                     hover:bg-cyan-900 hover:border-cyan-800 hover:text-white'>Login</Link>

                    <Link to="/register" className='py-2 px-2 border text-xl border-cyan-400 rounded bg-cyan-50 text-cyan-950 font-bold
                     hover:bg-cyan-900 hover:border-cyan-800 hover:text-white'>Register</Link>

            </ul>
        </nav>
    )
}

export default Navbar