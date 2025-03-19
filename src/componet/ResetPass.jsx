import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const ResetPass = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    const token =localStorage.getItem("token");
    try {
      const response = await fetch(`https://ecom-12-616h.onrender.com/reset_pass`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.msg);
        return;
      }

      alert("Password reset successful!");
      
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <input
              type="password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type="password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-md font-semibold hover:bg-blue-700 transition-all"
          >
            Reset Password
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

export default ResetPass;
