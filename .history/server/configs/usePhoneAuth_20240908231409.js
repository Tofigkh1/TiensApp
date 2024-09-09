import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";

const usePhoneAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Telefon numarasına OTP gönderme
  const sendOtp = async (phoneNumber) => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    });
    
    try {
      const result = await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      return result; // OTP gönderildi
    } catch (error) {
      console.error("OTP gönderme hatası:", error);
      throw new Error("OTP gönderilemedi");
    }
  };

  // OTP doğrulama
  const verifyOtp = async (otpCode) => {
    try {
      const result = await confirmationResult.confirm(otpCode);
      return result; // Başarılı giriş
    } catch (error) {
      console.error("OTP doğrulama hatası:", error);
      throw new Error("Geçersiz OTP");
    }
  };

  return { sendOtp, verifyOtp };
};

export default usePhoneAuth;
