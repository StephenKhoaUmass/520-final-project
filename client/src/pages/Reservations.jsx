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
      email: "joepear@gmail.com"
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
    date: "2024-05-12T10:00:00Z",
    confirmationId: "ABC123",
    slot: "2:00 PM - 3:00 PM",
    people: 2,
    email: "joepear@gmail.com",
    type: "User", // or "Admin" if applicable
    rest: {
      _id: 1,
    }
  };

  const dummyReservation2 = {
    date: "2024-05-17T10:00:00Z",
    confirmationId: "XYZ789",
    slot: "10:00 AM - 11:00 AM",
    people: 3,
    email: "joepear@gmail.com",
    type: "User", // or "Admin" if applicable
    rest: {
      _id: 1,
    }
  };

  const dummyReservation3 = {
    date: "2024-05-15T10:00:00Z",
    confirmationId: "HXZ912",
    slot: "12:00 PM - 1:00 PM",
    people: 4,
    email: "margaretfrank@hotmail.com",
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
      {data ? (
          data?.map((item, index) => (
            <ReservationCard key={index} props={{...item, type}} />
          ))
        ) : (
          "No Reservations Yet"
        )}
      </div>
    </div>
  );

}

export default Reservations