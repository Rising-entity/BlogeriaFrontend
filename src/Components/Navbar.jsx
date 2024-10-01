import React, { useState } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';
import homeLogo from "../Components/Images/homeLogo.png"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu toggle
    const navigate = useNavigate();
    const location = useLocation();

    let decoded = null;
    let initials = "";
    if (sessionStorage.getItem("token")) {
        decoded = jwtDecode(sessionStorage.getItem("token"));
        const firstName = decoded.name.split(" ")[0];
        const lastName = decoded.name.split(" ")[1];
        initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        toast.success("Logout successful");

        
    

    };


    // Do not render the Navbar on login or signup pages
    if (location.pathname === '/login' || location.pathname === '/SignUp') {
        return null;
    }

    return (
        <nav className=" mx-auto mb-[10px] w-[100%] [box-shadow:-2px_-6px_19px_gray] sticky top-0 bg-[white] pt-[10px] pb-[10px] text-[#3c3c3c]">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img loading="lazy" src={homeLogo} alt="logo" className='w-[110px]' />
                </Link>
                <button
                    className=" block sm:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6 mr-[10px]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
                <ul className={`flex-col sm:flex-row sm:flex ${isOpen ? 'block' : 'hidden'} sm:block`}>
                    {!decoded ? (
                        <>
                            <li className="nav-item">
                                <Link to="/SignUp" className="nav-link  px-4 py-2 block"  >
                                    Signup
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link  px-4 py-2 block"  >
                                    Login
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link  to="/createblog" className="nav-link  px-4 py-2 block" >
                                    Create Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Myblogs" className="nav-link  px-4 py-2 block " >
                                    My Blogs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link  px-4 py-2 block"   >

                                    <span
                                        onClick={handleLogout}
                                        className="text-red-500 font-semibold cursor-pointer"
                                    >
                                        Logout
                                    </span>

                                  
                                </Link>
                            </li>
                            <li className="text-white bg-[#84c8bd] font-[bolder] text-[29px] rounded-[60px] w-[47px] flex justify-center items-center ml-[1rem]">
                                <span className=" ">
                                    {initials}
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
