import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faBell,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [odlPasss, setOldPassword] = useState("");
  const [newpassword, setPassword] = useState("");

  const fetchUserData = async () => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      console.log(email);
      if (!email || !token) return;

      const response = await fetch(
        `https://ecom-12-616h.onrender.com/getdata?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return alert("Unauthorized request");
      const updateData = { name, email, phoneNumber };
      if (newpassword) updateData.password = newpassword;
      const res = await fetch(`https://ecom-12-616h.onrender.com/updatesettings`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify( updateData ),
      });

      if (!res.ok) throw new Error("Failed to update settings");
      const data = await res.json();
      console.log(data);

      alert("Settings updated successfully!");
      localStorage.setItem("email", data.email);
    } catch (error) {
      console.error("Error updating settings:", error);
    }

  }

  const checkPassword = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Unauthorized request");

      const res = await fetch("https://ecom-12-616h.onrender.com/checkpass", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ odlPasss ,newpassword}),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);
      alert("Password verified!");
    } catch (error) {
      alert("Incorrect password",);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl text-black rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="flex border-b mb-4">
        {[
          { key: "profile", icon: faUser, label: "Profile" },
          { key: "security", icon: faLock, label: "Security" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`p-3 flex items-center gap-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <FontAwesomeIcon icon={tab.icon} /> {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "security" && (
          <div>
            <label className="block mb-2">Old Password</label>
            <input
              type="text"
              name="password"
              value={odlPasss}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-1/2 p-2 border rounded mb-4"
            />

            <label className="block mb-2">New Password</label>
            <input
              type="text"
              name="password"
              value={newpassword}
              className="w-1/2 p-2 border rounded mb-4"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button
              onClick={()=>checkPassword()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/2 p-2 border rounded mb-4"
            />

            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-1/2 p-2 border rounded mb-4"
            />

            <label className="block mb-2">Phone</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-1/2 p-2 border rounded mb-4"
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </button>
          </div>
        )}
      </div>

      {/* <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
        <FontAwesomeIcon icon={faSave} /> Save Changes
      </button> */}
    </div>
  );
};

export default Setting;
