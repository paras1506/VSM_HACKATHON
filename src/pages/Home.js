import React from 'react'
import MuseumDescription from './MuseumDescription'
import TicketBookingForm from './TicketBookingForm'
const Home = ({isLoggedIn}) => {
  return (
    <div className='items-center text-black text-3xl h-auto bg-black'>
      <header className="main-header">
      </header>
      <MuseumDescription />
      <TicketBookingForm></TicketBookingForm>
    </div>
  )
}

export default Home
