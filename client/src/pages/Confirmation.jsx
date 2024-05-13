import React from "react";
import Navbar from "../components/Navbar";
import "../styles/confirmation.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


  const landings = {
    "type": "/reservations",
  }


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    navigate('/reservations')
  };


  return (
    <div className="confirmationid">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>Enter your Confirmation Id or Email for reservation details</h1>
          <form>
            <div className="txt_field">
              <input
                type="text"
                placeholder="Enter Confirmation Id"
                id="confirmationId"
                onChange={handleChange}
                className="lInput"
              />
            </div>
            <div className="txt_field">
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                onChange={handleChange}
                className="lInput"
              />
            </div>
            <div className="submit_button">
              <button className="button" onClick={handleClick}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
