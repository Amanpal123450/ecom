import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Forgetpass = () => {
  const [email, setEmail] = useState("");

  const naviget=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event ===" ") {
        alert("Enter the Email");
      }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("https://ecom-12-616h.onrender.com/generateOTP", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
     
      console.log(data)
      

      localStorage.setItem("gmail",data.token)
    if (data.msg=="user not fount") {
        alert(data.msg);
    }  else{
        naviget("/verify")
    }
      
      
      setEmail(""); // Clear input field after submission
    
      

      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email and we will send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-md font-semibold hover:bg-blue-700 transition-all"
          >
            Send Reset Link
          </button> 
        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <a href="/login" className="text-blue-600 text-sm hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;
