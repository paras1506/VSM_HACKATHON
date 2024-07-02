import React, { useState } from 'react';
import './Ticket.css';
import GenerateTicket from './GenerateTicket';

const TicketBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    tickets: 1,
    ticketType: 'Adult',
    specialRequests: ''
  });

  const [qrCodeData, setQrCodeData] = useState('');
  const [ticketData, setTicketData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate QR code data string from formData
    const dataString = JSON.stringify(formData);
    setQrCodeData(dataString);
    setTicketData({
      name: formData.name,
      totalVisitors: formData.tickets,
      visitDate: formData.date,
      email: formData.email
    });
    console.log('Form Data Submitted:', formData);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='m-20'>
      <form className="ticket-booking-form" onSubmit={handleSubmit}>
        <h2>Book Your Tickets</h2>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date of Visit:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today} // Set the minimum date to today
            required
          />
        </label>
        <label>
          Number of Tickets:
          <input
            type="number"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
        <label>
          Ticket Type:
          <select
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            required
          >
            <option value="Adult">Adult</option>
            <option value="Child">Child</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <label>
          Special Requests:
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Book Now</button>
      </form>

      {ticketData && (
        <GenerateTicket
          name={ticketData.name}
          totalVisitors={ticketData.totalVisitors}
          visitDate={ticketData.visitDate}
          qrCodeData={qrCodeData}
          mail={ticketData.email}
        />
      )}
    </div>
  );
};

export default TicketBookingForm;
