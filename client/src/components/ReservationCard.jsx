import React from 'react'
import "../styles/reservationCard.scss"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const ReservationCard = ({props}) => {

    const handleClick = async () => {
        try{
            await axios.delete(`http://localhost:5050/api/reservations/${props._id}`, { withCredentials: false })
            window.location.reload();
        }
        catch(err) {
            console.log(err)
        }
    }

  return (
    <div className='reservation-card'>
        <div className="details">
            <div className="res-name">
                <h1>Reservation Id: <span>{props.confirmationId}</span></h1>
            </div>
            <div className='res-details'><p>Date: </p> <span>{props.date.substring(0,10)}</span> <p>Time: </p> <span>{props.slot}</span> <p>People: </p> <span>{props.people}</span> <p>Email: </p> <span>{props.email}</span></div>
        </div>
        {props.type === "User" && <div className="icon">
            <FontAwesomeIcon icon={faTrash} onClick={handleClick}/>
        </div>}
    </div>
  )
}

export default ReservationCard