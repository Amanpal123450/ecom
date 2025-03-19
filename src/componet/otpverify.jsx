import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
        const token = localStorage.getItem("token");
      const response = await fetch("https://ecom-12-616h.onrender.com/otpverify",{
        method:"POST",
        headers:{
            Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({otp }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/resetpass"); // Redirect to dashboard or home page
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPVerify;
