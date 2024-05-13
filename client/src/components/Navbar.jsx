import '../styles/navbar.scss'
import { useContext, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext"




const Navbar = ({type}) => {

    const navigate = useNavigate()

    var { user, dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }

    const [isReservationsOpen, setIsReservationsOpen] = useState(false);
    

    user = true;

    return (
        <div className='navContainer'>
            <Link to="/"> 
                <p className='navLogo'>Restaurant Site</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar"><FontAwesomeIcon icon={faBars} className="icon" /></label>
            <nav className='navbar'>
                <ul>
                   
                    {user && <Link to="/">
                        <li><p>Home</p></li>
                    </Link>}
                    {user && (
                        <li>
                            <button className="navDropdownButton" onClick={() => setIsReservationsOpen(!isReservationsOpen)}>
                                <p>Reservations</p>
                            </button>
                            {isReservationsOpen && (
                                <ul className="navDropdownContent">
                                    <li>
                                        <Link to="/restaurant">
                                            <p>Create</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/confirmation">
                                            <p>Manage</p>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                    {user ? (<>

                            <li onClick={handleClick} style={{ cursor: "pointer" }}><p>Contact Us</p></li>
                            
                    </>
                    )
                        :
                        (
                            <>
                                <Link to={"/restaurant"}>
                                    <li><p>Reservations</p></li>
                                </Link>
                                <Link to={"/restaurant"}>
                                    <li><p>Contact Us</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div >
    )
}

export default Navbar