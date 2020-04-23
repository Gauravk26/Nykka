import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/nykaa_logo.svg'
 const Navbar = ()=>{
    return(
            <nav className=" w3-bar w3-white nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo w3-text-black"><img src={logo} className="w3-image" width="100" height="100"/></Link>
                </div>
            </nav>
   
        
    )
}

export default Navbar;