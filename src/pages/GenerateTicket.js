import React from 'react';
import './Ticket.css';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';

const GenerateTicket = ({ name, totalVisitors, visitDate, qrCodeData, mail }) => {
  const sendPDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Confirmation", 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Total Visitors: ${totalVisitors}`, 20, 40);
    doc.text(`Date of Visit: ${visitDate}`, 20, 50);
    doc.text(`Total Price Paid: ${totalVisitors * 50}`, 20, 60);

    const qrCode = document.getElementById('qrCode');
    doc.addImage(qrCode.toDataURL(), 'PNG', 40, 60, 50, 50);
    const pdfData = doc.output('blob');

    // Send the PDF via email
    sendEmail(pdfData);
  };
  const totalAmount = totalVisitors * 50;
  const sendEmail = (pdfData) => {
    const formData = new FormData();
    formData.append('file', pdfData, 'ticket.pdf');

    emailjs.send('service_oisospw', 'template_6fauj2s', {
      to_name: name,
      to_email: mail,
      from_name: 'Museum_visit',
      message: 'Here is your booking confirmation ticket',
      Total_amount_paid: totalAmount,
      name:  name,
      total_Ticket: totalVisitors,
      date: visitDate,
    }, 'UKC6r5A9i-IFD7tpa')
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    }, (error) => {
      console.log('Failed to send email.', error);
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Confirmation", 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Total Visitors: ${totalVisitors}`, 20, 40);
    doc.text(`Date of Visit: ${visitDate}`, 20, 50);
    doc.text(`Total Price Paid: ${totalVisitors * 50}`, 20, 60);

    const qrCode = document.getElementById('qrCode');
    doc.addImage(qrCode.toDataURL(), 'PNG', 40, 100, 50, 50);
    const pdfData = doc.output('blob');

    // Download the PDF
    downloadPDF(pdfData, 'ticket.pdf');
  };

  const downloadPDF = (blob, filename) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
      <h3 className="text-center text-2xl font-semibold text-gray-900 mb-4">Booking Confirmation</h3>
      <p className="mb-2"><strong className="text-blue-600">Name:</strong> {name}</p>
      <p className="mb-2"><strong className="text-blue-600">Total Visitors:</strong> {totalVisitors}</p>
      <p className="mb-2"><strong className="text-blue-600">Date of Visit:</strong> {visitDate}</p>
      <p className="mb-2"><strong className="text-blue-600">Total Amount Paid:</strong> {totalVisitors * 50}</p>

      <QRCode id="qrCode" className='mt-8' value={qrCodeData} />
      <button onClick={sendPDF} className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg">Send Mail</button>
      <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">Download Ticket</button>
    </div>
  );
};

export default GenerateTicket;
