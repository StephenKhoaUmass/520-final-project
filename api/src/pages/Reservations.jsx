import React, { useContext } from 'react'
import useFetch from '../useFetch'
import { AuthContext } from '../authContext'
import ReservationCard from '../components/ReservationCard'
import Navbar from '../components/Navbar'
import "../styles/reservation.scss"

const Reservations = ({type}) => {

  //const { user } = useContext(AuthContext)

  const urls = {
    "user": `/reservations/user`
  }

  // Call useFetch unconditionally
  //const {data} = useFetch(urls[type])
  
  
  const {data} =  [
    {
      date: new Date("2024-05-01T10:00:00Z"),
      confirmationId: "ABC123",
      slot: "10:00 AM - 11:00 AM",
      people: 2,
      email: "john@example.com"
    },
    {
      date: new Date("2024-05-02T18:00:00Z"),
      confirmationId: "XYZ789",
      slot: "11:00pm - 12:00 PM",
      people: 4,
      email: "jane@example.com"
    },
  ];

  const dummyReservation = {
    _id: 1,
    date: "2024-05-01T10:00:00Z",
    confirmationId: "ABC123",
    slot: "10:00 AM - 11:00 AM",
    people: 2,
    email: "john@example.com",
    type: "User", // or "Admin" if applicable
    rest: {
      _id: 1,
    }
  };

  
  /*
  return (
    <div>
        <Navbar />
        <div className="reservation-container">
        {data ? (
          data?.map((item, index) => (
            <ReservationCard key={index} props={{...item, type}} />
          ))
        ) : (
          "No Reservations Yet"
        )}
        </div>
    </div>
  )
  */
  return (
    <div>
      <Navbar />
      <div className="reservation-container">
      <h1>Reservation Details</h1>
      <ReservationCard props={dummyReservation} />
      <ReservationCard props={dummyReservation} />
      <ReservationCard props={dummyReservation} />
      </div>
    </div>
  );

}

export default Reservations