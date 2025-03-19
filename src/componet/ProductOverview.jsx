import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPreviews = ({ product }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-gray-100 bg-white p-6 rounded-lg">
      <div className="flex justify-center py-4 cursor-pointer">
        <img
          src={`https://ecom-12-616h.onrender.com${product.imageUrl}`}
          alt="Product Preview"
          className="w-64 h-auto rounded-lg shadow-lg"
        />
      </div>
      <ul className="flex gap-3 justify-center">
       
      </ul>
    </div>
  );
};

ProductPreviews.propTypes = {
  previews: PropTypes.array.isRequired,
};

const ProductOverview = () => {
  const [show, setShow] = useState(true);
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function GetProductById() {
      try {
        const response = await fetch(`https://ecom-12-616h.onrender.com/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product details.");
      }
    }

    GetProductById();
  }, [id]);

  async function AddToCart() {
    const addToProduct = {
      productId: id,
      quantity: 1,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://ecom-12-616h.onrender.com/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addToProduct),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product added to cart!", { position: "top-right" });
      } else {
        toast.error(data.message || "Failed to add product to cart", { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-right" });
      console.error("Error:", error);
    }
  }

  async function AddToWishList() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in first!");
      return;
    }
  
    try {
      const response = await fetch("https://ecom-12-616h.onrender.com/wistlist/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get full error response
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("An error occurred while adding to wishlist.");
      console.error("Error:", error);
    }
  }
  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <Fragment>
      {show && (
        <div className="bg-white text-gray-900 text-black p-6 rounded-lg shadow-xl relative">
          <button
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-500"
            onClick={() => setShow(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <ProductPreviews product={product} />
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <h3 className="text-blue-600 text-xl font-semibold">Rs. {product.price}</h3>
              <p className=" mt-4">{product.description}</p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => AddToCart()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  Add To Cart
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
                  View Details
                </button>
              </div>
              <div className="flex gap-4 mt-4">
               <button
                  onClick={() => AddToWishList()}
                  className="flex items-center gap-2 text-black  hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faHeart} /> Add to wishlist
                </button> 
                <button className="flex items-center gap-2 text-black hover:text-blue-500">
                  <FontAwesomeIcon icon={faShareAlt} /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductOverview;
