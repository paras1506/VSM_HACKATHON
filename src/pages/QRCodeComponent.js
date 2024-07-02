import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ value }) => {
  return (
    <div className="qr-code-container">
      <h3>Your QR Code:</h3>
      <QRCode value={value} />
    </div>
  );
};

export default QRCodeComponent;
