import React, { useState } from 'react';
import usePhoneAuth from '../../../../ser'; // Yukarıdaki hook'u import edin

const PhoneAuthForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { sendOtp, verifyOtp } = usePhoneAuth();

  const handleSendOtp = async () => {
    try {
      await sendOtp(phoneNumber);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const user = await verifyOtp(otpCode);
      console.log('Doğrulandı:', user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Telefon numaranızı girin"
          />
          <button onClick={handleSendOtp}>OTP Gönder</button>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="OTP kodunu girin"
          />
          <button onClick={handleVerifyOtp}>Doğrula</button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuthForm;
