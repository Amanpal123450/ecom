import { Fragment, useState, useEffect } from "react";
import { faChevronDown, faChevronUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// Sidebar Component
const SideBar = ({ products }) => {
    console.log(products);
    const totalprice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = (totalprice * 18) / 100;
    const totalProductPrice = totalprice?totalprice + tax + 50:0;

    return (
        <div className="bg-blue-50 dark:bg-slate-800 rounded-xl flex flex-col gap-6 p-4 md:p-6">
            <h6 className="font-medium mb-6 opacity-75">Order Summary</h6>

            <div className="flex justify-between items-center">
                <span>Sub total</span>
                <span className="font-bold">₹{totalprice.toFixed(2)}</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />

            <div className="flex justify-between items-center">
                <span>Shipping Fee</span>
                <span className="font-bold">₹50</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />

            <div className="flex justify-between items-center">
                <span>Tax (18%)</span>
                <span className="font-bold">₹{tax.toFixed(2)}</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />

            <div className="flex justify-between items-center">
                <span className="fs-5 font-bold">Total</span>
                <span className="font-bold text-green-600">₹{totalProductPrice.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 rounded-md text-white hover:bg-opacity-90 py-2.5">
                BUY ({products.length})
            </button>
        </div>
    );
};

// Quantity Field Component
const QtyField = ({ item, setProducts }) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);

    useEffect(() => {
        const updateProduct = async () => {
            const token = localStorage.getItem("token");
            try {
                await fetch("https://ecom-12-616h.onrender.com/cart/update", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId: item.productId._id, quantity }),
                });

                setProducts((prev) =>
                    prev.map((p) =>
                        p.productId._id === item.productId._id ? { ...p, quantity } : p
                    )
                );
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        };

        updateProduct();
    }, [quantity]);

    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex h-11 w-24 mb-4">
            <input
                type="number"
                className="w-2/3 pl-2 text-center border border-black dark:border-slate-600 bg-transparent focus:outline-none rounded-lg overflow-hidden"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <div className="w-1/3 border border-black dark:border-slate-600 rounded-lg overflow-hidden flex flex-col bg-transparent p-0">
                <button className="text-[12px] hover:bg-blue-600 hover:text-white h-1/2" type="button" onClick={increaseQty}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </button>
                <button className="text-[12px] hover:bg-blue-600 hover:text-white h-1/2" type="button" onClick={decreaseQty}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </button>
            </div>
        </div>
    );
};

// Product Item Component
const ProductItem = ({ item, setProducts }) => {
    const { price } = item;
    const name = item?.productId?.name || "Unknown Product";
    const imageUrl = item?.productId?.imageUrl || "";
  console.log(item.imageUrl)
    const removeItem = async () => {
        const token = localStorage.getItem("token");

        try {
            await fetch("https://ecom-12-616h.onrender.com/cart/remove", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: item.productId._id }),
            });

            setProducts((prev) => prev.filter((p) => p.productId._id !== item.productId._id));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4">
            <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
            <Link to={`/productoverview/${item.productId._id}`}> <a href="#!">
                   <img src={`https://ecom-12-616h.onrender.com${imageUrl}`} alt="" className="max-w-full h-auto rounded-xl mx-auto" />
                </a> </Link>
            </div>

            <div className="flex">
                <div>
                    <div className="text-base md:text-lg hover:text-blue-600 mb-4">
                        <Link>{name}</Link>
                    </div>
                    <div>
                        <QtyField item={item} setProducts={setProducts} />
                        <h3 className="text-xl font-bold text-blue-600">Rs.{price}</h3>
                    </div>
                </div>

                <div>
                    <button className="w-10 h-10 hover:bg-blue-200 dark:bg-opacity-20 inline-flex justify-center items-center rounded-full" onClick={removeItem}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Cart Component
const AddToCart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function GetProduct() {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://ecom-12-616h.onrender.com/cart/get", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data.item)
                setProducts(data.item);
            } catch (error) {
                console.log("Error fetching cart:", error);
                setProducts([]);
            }
        }
        GetProduct();
    }, []);

    return (
        <section className="ezy__epcart4 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl overflow-hidden w-full lg:w-2/3">
                        {products.length > 0 ? (
                            products.map((item, i) => (
                                <Fragment key={i}>
                                    {!!i && <hr className="my-4 dark:border-slate-700" />}
                                    <ProductItem item={item} setProducts={setProducts} />
                                </Fragment>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No products in cart</p>
                        )}
                    </div>

                    <div className="w-full lg:w-1/3">
                        <SideBar products={products} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddToCart;
