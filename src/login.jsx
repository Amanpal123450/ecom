import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  
const SignUpForm = ({Settoggle}) => {
    const navigat=useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const respons = await fetch("https://ecom-12-616h.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await respons.json();
      if (!respons.ok) {
        console.log("Login Error:", data.msg);
        alert(data.msg);
        return; // Stop execution if login fails
    }
    localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
     
      console.log(data);

      Settoggle(true);

      // alert("user creat seccessfuly");

      navigat("/")
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="w-full mt-6">
      <div className="flex justify-center mb-4"></div>
      
      <div className="w-full relative mb-4">
        <input
          type="email"
          className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faUser}
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
        />
      </div>
      <div className="w-full relative mb-4">
        <input
          type="pass"
          className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          id="pass"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faLock}
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
        />
      </div>
      
      <div className="w-full relative mb-4">
          
          <Link to={"/forget"}> <p
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80  mx-x-2 mt-0.5 hover:text-blue-600"
          > Forget password</p>  </Link>
      </div>

      <button
        type="submit"
        className="bg-gray-700 py-4 px-10 text-white hover:bg-opacity-95 mt-5"
      >
        Register <FontAwesomeIcon icon={faArrowRight} />
      </button>

      <div className="text-center mt-4">
        <p className="mb-0 text-sm">
          New account created?
          <a href="#!" className="hover:text-blue-600 font-bold">
            <Link to={"/signup"}>Sign up</Link>
          </a>
        </p>
      </div>
    </form>
  );
};

const Login = ({ Settoggle }) => {
  return (
    <section
      className="ezy__signup14 light flex items-center justify-center py-14 md:py-24 text-black bg-cover bg-right bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://cdn.easyfrontend.com/pictures/background/background4.jpg)",
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-xl p-4">
              <div className="flex flex-wrap items-center">
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center justify-center h-full">
                    <img
                      src="https://cdn.easyfrontend.com/pictures/background/abstract-background3.jpg"
                      alt=""
                      className="max-h-[300px] w-full lg:max-h-full lg:h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-6">
                  <div className="flex flex-col justify-center items-center text-center h-full p-2">
                    <h2 className="text-[26px] leading-none font-bold mb-2">
                      LOGIN FORM
                    </h2>

                    <SignUpForm Settoggle={Settoggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
