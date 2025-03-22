import React from 'react'
import { Link } from 'react-router'

const Home = () => {
    return (
        <div>
            <h1 className='flex justify-center mb-2 mt-10 space-x-4 font-semibold text-4xl text-cyan-600'>Welcome to the Secure Task Management System</h1>
            <br/>
            <p className='flex justify-center ml-20 mr-20 text-cyan-900 space-x-4 text-3xl'>After Registering, you can able to create, update and delete your own tasks.
                 Only admin can able to read and delete All tasks of the regular user.</p>
            <br/>
            <div className='flex justify-center space-x-4 mt-10 mr-4'>
                <Link to="/login"
                    className='py-3 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Log in
                </Link>
                <Link to="/sign-up"
                    className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Register 
                </Link>
                <Link to="/login"
                    className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Tasks
                </Link>
                <Link to="/sign-up"
                    className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
                    Admin Login
                </Link>
            </div>
        </div>
    )
}

export default Home