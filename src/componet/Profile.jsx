import {
  faCircleUser,
  faCogs,
  faFire,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import IMG from '../defaultImg.jpg';
import { Link } from "react-router-dom";
// import {Link} from "react-router-dom"

// Sidebar Data
const sidebarData = [
  {
    icon: faUser,
    title: "Profile",
  },
  {
    icon: faFire,
    title: "Order Stories",
  },
  {
    icon: faCogs,
    title: "setting",
  },
];

const SideBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabHandler = (index) => setActiveTab(index);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl flex md:flex-col items-center justify-center p-2">
   {sidebarData.map((item, i) => (
        <div
          key={i}
          className={`text-center w-full py-5 duration-300 cursor-pointer ${
            activeTab === i
              ? "bg-blue-600 text-white rounded-lg shadow-md"
              : "hover:bg-blue-600 hover:text-white hover:rounded-lg"
          }`}
          onClick={() => activeTabHandler(i)}
        >
          <Link to={`/${item.title}`}> <div className="text-3xl">
            <FontAwesomeIcon icon={item.icon} />
          </div>  </Link>
          <p className="text-lg font-semibold mt-2">{item.title}</p>
        </div> 

      ))} 
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [newimg, setNewImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        // if (!email) throw new Error("No email found in local storage");

        const response = await fetch(`https://ecom-12-616h.onrender.com/getdata`,{
          method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
        console.log("User Data:", data);

        // Fetch Profile Photo
        if (data.profilePhoto) {
          const res = await fetch(`https://ecom-12-616h.onrender.com/get/uploads/${data.profilePhoto}`);
          if (!res.ok) throw new Error("Failed to fetch profile image");
        
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);
          setNewImg(imageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [newimg]);

  useEffect(() => {
    console.log("Updated profile photo:", profilePhoto);
  }, [profilePhoto]);

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const email = localStorage.getItem("email");
    formData.append("email", email);

    const endpoint = type === "profile" ? "/profile" : "/upload-background";

    try {
      const res = await fetch(`https://ecom-12-616h.onrender.com${endpoint}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload Response:", data);

      const imageUrl = `https://ecom-12-616h.onrender.com/uploads/${data.filePath}`;

      if (type === "profile") {
        setProfilePhoto(imageUrl);
        setNewImg(imageUrl);
      } else {
        setBackgroundPhoto(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <SideBar />
          </div>

          {/* Profile Section */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-4 md:p-6">
              <div
                className="relative min-h-[350px] rounded-xl mb-[150px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    backgroundPhoto ||
                    user?.backgroundPhoto ||
                    "https://cdn.easyfrontend.com/pictures/profile1-bg.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Upload Background Photo */}
                <label className="back absolute bottom-4 right-4 p-3 rounded-full cursor-pointer shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
                  <FontAwesomeIcon icon={faImage} className="text-xl" />
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "background")}
                    className="hidden"
                  />
                </label>

                {/* Profile Picture */}
                <img
                  src={newimg || IMG}
                  alt="Profile"
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />

                {/* Upload Profile Photo */}
                <label className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-full cursor-pointer shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
                  <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "profile")}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="lg:px-12 text-center">
                <h1 className="text-3xl md:text-[40px] font-bold leading-tight">
                  {user ? `${user.name ?? ""} ${user.lastName ?? ""}`.trim() : "Loading..."}
                </h1>
                <p className="mt-2 opacity-75">Email: {user?.email || "N/A"}</p>
                <p className="opacity-75">Phone: {user?.phoneNumber || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
