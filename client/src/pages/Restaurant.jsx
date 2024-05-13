import React,  { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import {
  faLocationDot,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/restaurant.scss"
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'
import { AuthContext } from '../authContext';

const Restaurant = ({type}) => {

  
  const [date, setDate] = useState("");
  const location = useLocation();
  let id;
  if(type==="user")
    id = location.pathname.split("/")[2];
  else
    id = location.pathname.split("/")[3];
  const slots = [
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "01:00 PM - 02:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
        "04:00 PM - 05:00 PM",
        "05:00 PM - 06:00 PM",
        "06:00 PM - 07:00 PM",
        "07:00 PM - 08:00 PM",
        "08:00 PM - 09:00 PM",
        "09:00 PM - 10:00 PM"
    ];
  //const {data} = useFetch(`/restaurants/${id}`);
  //const slots = useFetch(`/reservations/slots/${id}/${date}`).data


  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  // set the usestate to the data user passed 
  const handleChange = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleState = async (e) => {
    e.preventDefault();
    navigate('/reservations')
  };

  // post the usestate to database
  const handleClick = async (e) => {
    e.preventDefault();

    const newRes = {
        ...info, author: user._id, rest: id, date:date
    }
    try {
      /*  await axios.post("http://localhost:5050/api/reservations", newRes, {
        })
      */

        navigate('/reservations')

    }
    catch (err) {
        console.log(err)
    }
}



  return (
    <div className='restaurant'>
      <Navbar />
      <div className="rest-container">
        <div className="leftContainer">
          <h1>Restaurant</h1>
          <p>Every cuisine you could ever imagine</p>


          <div className="other-details">
            <div className="location"><FontAwesomeIcon icon={faLocationDot} /> Location: 123 Main Street </div>
            <div className="contact"><FontAwesomeIcon icon={faPhone} /> Contact: 123-456-5678</div>
          </div>


          {<div className="reservation-box">
              <div className="form-input">
                <label htmlFor="date">Date</label>
                <input type="date" onChange={(e) => setDate(e.target.value)} id='date'/>
              </div>
              {date && <div className="form-input">
                <label htmlFor="slot">Time</label>
                <select id="slot" onChange={handleChange}>
                  <option key={0} value="none">-</option> 
                  {
                    slots?.map((s, index) => (
                      <option key={index} value={s}>{s}</option>
                    ))
                  }
                </select>
              </div>}
              <div className="form-input">
                <label htmlFor="people">People</label>
                <input type="number" id='people' onChange={handleChange}/>
              </div>
              <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email id"
                onChange={handleChange}
                className="lInput"
              />
            </div>
              <button onClick={handleState}>Make Reservation</button>
          </div>}
        </div>


      </div>
    </div>
  )
}

export default Restaurant