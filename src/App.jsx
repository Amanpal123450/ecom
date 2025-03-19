import Login from "./login"
import Home from "../Home"
import Signup from "./Signup"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import { useState } from "react"
import Navber from "./componet/Navber"
import Main_Product from "./componet/Main_Product"
import AddtoCaer from "./componet/AddToCaer"
import About from "../About"
import Wishlist from "./componet/Wishlist"
import Profile from "./componet/Profile"
import Forgetpass from "./componet/Forgetpass"
import ResetPass from "./componet/ResetPass"
import ProductOverview from "./componet/ProductOverview"
// import Settings from "./componet/Setting"
import Setting from "./componet/Setting"
import OTPVerify from "./componet/otpverify"
import Contact from "./componet/Contact"
import NotFound from "./componet/Page404"
import Footer from "./componet/Footer_2"
import FAQ from "./componet/Faq"
import PaymentIntegration from "./componet/payment"


function App() {
  
const [toggle,Settoggle]=useState(false)
  return (
   <>
   <BrowserRouter>
   <Navber toggle={toggle}/>
   <Routes>
   
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login Settoggle={Settoggle} />} />
    <Route path="/products" element={<Main_Product />} />
    <Route path="cart" element={<AddtoCaer />} />
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/forget" element={<Forgetpass />} />
    <Route path="/resetpass" element={<ResetPass />} />
    <Route path="/productoverview/:id" element={<ProductOverview />} />
    <Route path="/setting" element={<Setting />} />
    <Route path="/verify" element={<OTPVerify />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/*" element={<NotFound />} />
    <Route path="/footer1" element={<Footer />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/payment" element={<PaymentIntegration />} />
   </Routes>
   
   </BrowserRouter>
 
  
   </>
  )
}

export default App


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const email = localStorage.getItem("email");
//       if (!email) throw new Error("No email found in local storage");

//       const response = await fetch(`http://localhost:8000/getdata?email=${email}`);
//       if (!response.ok) throw new Error("Failed to fetch user data");

//       const data = await response.json();
//       setUser(data);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchData();
// }, []);