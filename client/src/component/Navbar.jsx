import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoReorderThreeOutline } from "react-icons/io5";
import { AppContext } from '../context/AppContext';


function Navbar() {
    const links=[
        {
            name: 'Home',
            to:'/'
        },
        {
            name: 'Profile',
            to:'/profile'
        },

        {
            name: 'All Blogs',
            to:'/all-blogs'
        },
     
    ]

      const { isAuthenticated } = useContext(AppContext);
    if(!isAuthenticated){
        links.splice(1,1);
    } 
    else{
        links.splice(3,1);
    }

  return (
    <nav className=' relative flex items-center justify-between py-4 border-b border-zinc-200'>
        <div className='lg:w-2/6 brandName'>
        <Link to="/" className='text-2xl font-bold'>BlogApp</Link>
        </div>

        <div className='w-4/6 hidden lg:flex items-center justify-end'>
        {links.map((items,i) => (
            <Link className='ms-4 hover:text-blue-600 transition-all duration-300' key={i} to={items.to}>
                {items.name}
            </Link>
        ))}
        { !isAuthenticated &&
        <Link className='ms-4 bg-black rounded px-4 py-2 text-zinc-100 hover:bg-blue-600 transition-all duration-300' to='/auth'>
            Log In
        </Link>
}
        </div>

        <div className='w-3/6 flex lg:hidden items-center justify-end'>
     <button className='text-3xl'>
        <IoReorderThreeOutline /> 
     </button>
        </div>

        
    </nav>
  )
}

export default Navbar