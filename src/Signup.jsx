
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

const SignUpForm = () => {
	
    const naviget=useNavigate();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

	const [userName,setuserNmae]=useState("");
    const [lastName,setLastName]=useState("");
    const [phoneNumber,setNumber]=useState("");
	// const [Number,setNu]=useState("");
	

	const handleSubmit = async(event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

        const respones= await fetch("https://ecom-12-616h.onrender.com/signup",{
            method:"POST",
            headers:{

                "Content-Type":"application/json",
            },
            body:JSON.stringify({name,email,password,userName,lastName,phoneNumber})
        })

        const data =await respones.json();

        console.log(data);
        alert("user created seccessfuly");
        naviget("/login")
		
	};

	return (
		<form
			noValidate
			
			onSubmit={handleSubmit}
			className="w-full mt-6"
		>
			<div className="flex justify-center mb-4">
				
				
			</div>
			<div className="w-full relative mb-4">
				<input
					type="text"
					className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
					id="uname"
					placeholder="Fist Name"
                    value={name}
                    onChange={(e)=>setname(e.target.value)}
				/>
				<FontAwesomeIcon
					icon={faUser}
					className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
				/>
			</div>

			<div className="w-full relative mb-4">
				<input
					type="text"
					className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
					id="pass"
					placeholder="Last Name"
					value={lastName}
					onChange={(e)=>setLastName(e.target.value)}
                    
                    
				/>
				<FontAwesomeIcon
					icon={faLock}
					className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
				/>
			</div>

			<div className="w-full relative mb-4">
				<input
					type="text"
					className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
					id="pass"
					placeholder="Username"
					value={userName}
					onChange={(e)=>setuserNmae(e.target.value)}
                   
				/>
				<FontAwesomeIcon
					icon={faLock}
					className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
				/>
			</div>

			

			<div className="w-full relative mb-4">
				<input
					type="email"
					className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
					id="email"
					placeholder="Email Address"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
				/>
				<FontAwesomeIcon
					icon={faEnvelope}
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
                    onChange={(e)=>setpassword(e.target.value)}
				/>
				<FontAwesomeIcon
					icon={faLock}
					className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
				/>
			</div>
			
			<div className="w-full relative mb-4">
				<input
					type="text"
					className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
					id="pass"
					placeholder="Phone Number"
					value={phoneNumber}
					onChange={(e)=>setNumber(e.target.value)}
                   
				/>
				<FontAwesomeIcon
					icon={faLock}
					className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
				/>
			</div>

			<div className="w-full relative mb-4">
				<input
					type="date"
					className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
					id="pass"
					placeholder="date"
					// value={date}
					// onChange={(e)=>setDate(e.target.value)}
                   
				/>
				
			</div>
			
			{/* <div className="w-full relative mb-4">
				
				<FontAwesomeIcon
					icon={faLock}
					className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
				/>
			</div> */}

			<button
				type="submit"
				className="bg-gray-700 py-4 px-10 text-white hover:bg-opacity-95 mt-4"
			>
				Register <FontAwesomeIcon icon={faArrowRight} />
			</button>

			<div className="text-center mt-4">
				<p className="mb-0 text-sm">
					Already have an account?
					<a href="#!" className="hover:text-blue-600 font-bold">
						 <Link to={"/login"}>Log In</Link>
					</a>
				</p>
			</div>
		</form>
	);
};

const SignUp= () => {
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
											REGISTRATION FORM
										</h2>

										<SignUpForm />
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

export default SignUp;