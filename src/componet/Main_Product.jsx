import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";

const ProductItem = ({ product }) => {


  
  async function AddToCart() {
  
    
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://ecom-12-616h.onrender.com/cart/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      const data =await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Product added to cart!", { position: "top-right" });
      } else {
        toast.error("Failed to add product to cart", { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
      console.error("Error:", error);
    }
  }

  async function AddToWishList() {
    
    const productId = product._id;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://ecom-12-616h.onrender.com/wistlist/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data=await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Product added to WishList", { position: "top-right" });
      } else {
        toast.error("Failed to add product to WishList", { position: "top-right" });
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 relative hover:scale-105 transition-transform duration-300">
      <button
        onClick={AddToWishList}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-red-500 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="p-4 flex justify-center items-center">
        <Link to={`/productoverview/${product._id}`}>
          <img
            src={`https://ecom-12-616h.onrender.com${product.imageUrl}`}
            alt={product.name}
            className="max-h-40 object-contain"
          />
        </Link>
      </div>
      <div className="text-start p-4">
        <h5 className="text-lg font-semibold text-black">{product.name}</h5>
        <p className="text-blue-600 text-lg font-bold my-2">${product.price}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center text-yellow-500 font-medium">
            <FontAwesomeIcon icon={faStar} className="mr-1" />
            {product.rating}
          </span>
        </div>
        <button
          onClick={AddToCart}
          className="w-full flex items-center justify-center gap-2 text-white font-bold py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

const Main_Product = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [responce, setresponce] = useState();

  useEffect(() => {
    async function GetProducts() {
      try {
        const response = await fetch("https://ecom-12-616h.onrender.com/product/all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        setresponce(responce);

        const data = await response.json();
        console.log(data.allProduct)
        if (Array.isArray(data.allProduct)) {
          setProducts(data.allProduct);
        } else {
          setProducts([]);
        }
       
          
        
      } catch (error) {
        console.error("Fetch Error:", error);
        setProducts([]);
      }
    }
    GetProducts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://ecom-12-616h.onrender.com/product/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (Array.isArray(data.products)) {
        setSearchResults(data.products);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
      setSearchResults([]);
    }
  };

  return (
    <section className="ezy__epgrid1 light py-14 md:py-24 bg-white text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="w-full max-w-md mx-auto">
        <div className="relative flex items-center border rounded-lg overflow-hidden shadow-md dark:border-neutral-600">
          <input
            type="search"
            className="w-full px-4 py-2 text-base text-black outline-none dark:bg-transparent"
            placeholder="Search..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TERipple color="light">
            <button
              className="flex items-center justify-center px-4 py-2 bg-primary text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
              type="button"
              aria-label="Search button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </TERipple>
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6 text-black text-center mt-12">
          {(searchResults.length > 0 ? searchResults : products).map(
            (product, i) => (
              <div
                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 px-2 my-2"
                key={i}
              >
                <ProductItem product={product} responce={responce} />
              </div>
            )
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Main_Product;
