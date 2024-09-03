import React, { useState } from 'react';
import logo from '/src/assets/Logo.svg';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav
            className={`fixed right-0 z-40 bg-black flex items-center rounded-b-3xl rounded-r-none transition-all duration-300 ease-in-out
            ${isExpanded ? 'w-40' : 'w-20'} md:hover:w-40`}
            onClick={handleToggle} // Expand on click for mobile
            onMouseEnter={() => setIsExpanded(true)} // Hover for desktop
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="w-20 h-20 flex justify-center items-center flex-shrink-0">
                <img src={logo} className='h-14 w-14 p-2 flex-shrink-0' alt="Logo" />
            </div>
            {isExpanded && (
                <div className="text-white">
                    <Link
                        to={`${isHomePage ? '/contact' : '/'}`}
                        className="hover:text-gray-300 transition-colors duration-200">
                        {isHomePage ? 'Contact' : 'Home'}
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
