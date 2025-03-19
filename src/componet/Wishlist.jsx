import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    // const imageUrl = item?.productId?.imageUrl || "";

    async function removeFromWishlist(product) {
        if (!product || !product._id) {
            console.error("Product is missing or invalid:", product);
            return;
        }

        const productId = product._id;
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://ecom-12-616h.onrender.com/wistlist/remove", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId }),
            });

            const data = await response.json();
            console.log("Wishlist response:", data);

            if (response.ok) {
                setWishlist((prevWishlist) => prevWishlist.filter((item) => item.productId._id !== productId));
            } else {
                console.error("Failed to remove item:", data.message);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    }

    async function clearWishlist() {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://ecom-12-616h.onrender.com/wistlist/clear", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Clear Wishlist response:", data);

            if (response.ok) {
                setWishlist([]);
            } else {
                console.error("Failed to clear wishlist:", data.message);
            }
        } catch (error) {
            console.error("Error clearing wishlist:", error);
        }
    }

    useEffect(() => {
        async function fetchWishlist() {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("https://ecom-12-616h.onrender.com/wistlist/get", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("Fetched wishlist:", data);

                setWishlist(data.products || []);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        }

        fetchWishlist();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Wishlist</h2>

            {wishlist.length > 0 && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={clearWishlist}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
                    >
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                        Clear Wishlist
                    </button>
                </div>
            )}

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <Link to={`/productoverview/${item.productId._id}`}> <img
                                src={`https://ecom-12-616h.onrender.com${item.productId?.imageUrl}`}
                                alt={item.productId?.name || "Product"}
                                className="w-2/-4 h-60 mx-auto object-cover rounded-md mb-4"
                            /> </Link>
                            <h3 className="text-lg font-semibold text-gray-800 text-center">
                                {item.productId?.name || "Unknown Product"}
                            </h3>
                            <p className="text-gray-600 mb-4 text-center">₹{item.productId?.price || 0}</p>
                            <div className="flex justify-between items-center">
                                <Link
                                    to={`/product/${item.productId._id}`}
                                    className="text-blue-500 font-medium hover:underline"
                                >
                                    View
                                </Link>
                                <button
                                    className="text-red-500 hover:text-red-700 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                                    onClick={() => removeFromWishlist(item.productId)}
                                >
                                    <FontAwesomeIcon icon={faHeartBroken} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">Your wishlist is empty.</p>
            )}
        </div>
    );
}
