
import HeroSection from "./src/componet/HeroSecation";
import Product from "./src/componet/Products";
import Category from "./src/componet/Product_New";
import Footer from "./src/componet/Footer_2";
function Home() {
  return (
   <>
 <div className="bg-white">
   <HeroSection />
   <Product />
   <Category />
   <Footer />
   
   </div>
   </>
  )
}

export default Home;