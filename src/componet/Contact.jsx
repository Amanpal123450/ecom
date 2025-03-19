import { useState } from "react";

const Contact = () => {
  

  const [name,setname]=useState();
  const [email,setemail]=useState();
  const [message,setmessage]=useState();

  

  const handleSubmit =  async(e) => {
    e.preventDefault();
     
    const responce= await fetch("https://ecom-12-616h.onrender.com/contact/add",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({name,email,message})
    })

    const date=await responce.json();

    console.log(date);

    alert(date.message);
   

  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white text-black shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e)=>setmessage(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        //   onClick={()=>handleSubmit()}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;