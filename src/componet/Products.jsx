import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
	return (
		<div className="p-2">
			<div>
			<Link to={`/productoverview/${product._id}`}>	<img  
				  className="w-2/-4 h-60 mx-auto object-cover rounded-md mb-4"
				src={`https://ecom-12-616h.onrender.com${product?.imageUrl}`} alt="Product" /> </Link>
			</div>
			<div className="py-4 lg:py-6 text-start px-1">
				<h5 className="font-medium cursor-pointer">{product?.name}</h5>
				<h5 className="font-medium text-blue-600 my-2">₹{product.price}</h5>
				<div className="flex justify-between items-center px-1">
					<h5 className="font-medium">
						<span className="text-yellow-500 mr-1">
							<FontAwesomeIcon icon={faStar} />
						</span>
						{product.rating}
					</h5>
					<a href="#!">
						<h5 className="font-medium hover:text-blue-600">
							<FontAwesomeIcon icon={faShoppingCart} />
						</h5>
					</a>
				</div>
			</div>
		</div>
	);
};

ProductItem.propTypes = {
	product: PropTypes.object.isRequired,
};

const Product = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function GetProducts() {
			try {
				const response = await fetch("https://ecom-12-616h.onrender.com/product/all", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				const data = await response.json();
				console.log(data.allProduct);
				if (Array.isArray(data.allProduct)) {
					setProducts(data.allProduct.slice(0, 4)); // ✅ Only keep the first 4 products
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

	return (
		<section className="ezy__epgrid2 light py-14 bg-white text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="container px-4 mx-auto">
				<h2 className="text-2xl font-bold text-black leading-none md:text-[40px] text-center">
					Product Category
				</h2>

				<div className="grid grid-cols-12 text-center text-black mt-12">
					{products.map((product, i) => (
						<div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3" key={i}>
							<ProductItem product={product} />
						</div>
					))}
				</div>
			</div>
			<div className="text-center mt-12">
				<div className="ezy__epgrid2-button mt-5">
					<button className="text-white font-bold py-3 px-11 bg-blue-600 hover:bg-opacity-90 rounded">
				<Link to={"/products"}>See All </Link>
					</button>
				</div>
			</div>
		</section>
	);
};
export default Product;
