
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const items = [
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_1.png",
		title: "Toys",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
		title: "Kids",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png",
		title: "Bags",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png",
		title: "Babies",
	},
];

const Item = () => {
	return items.map((item, index) => (
		<div className="col-span-12 sm:col-span-6 md:col-span-3 my-12" key={index}>
			<a
				href="#!"
				className="bg-white dark:bg-slate-800 shadow-xl relative flex items-end justify-center min-h-[155px] rounded-t-[30px] rounded-b-[15px] border dark:border-slate-700"
			>
				<div className="absolute -top-[75px] left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow border dark:border-slate-700 rounded-full flex justify-center items-center h-40 w-40">
					<img src={item.imageUrl} alt="" className="w-20" />
				</div>
				<h4 className="text-2xl font-medium mb-6">{item.title}</h4>
			</a>
		</div>
	));
};

const Category = () => {
	return (
		<section className="py-14 md:py-24 bg-white  text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="absolute top-0 right-0">
				<img
					src="https://cdn.easyfrontend.com/pictures/ecommerce/grid_10_shape1.png"
					alt=""
				/>
			</div>

			<div className="container px-4 mx-auto relative">
				<h2 className="text-[32px] md:text-5xl text-black leading-tight font-bold text-center mb-12">
					Top Category
				</h2>

				<div className="relative">
					<div className="grid grid-cols-12 gap-6">
						<Item />
					</div>
					<div className="flex items-center">
						<button className="absolute top-1/2 left-0 md:-left-7 -translate-y-1/2 bg-white bg-opacity-50 shadow-xl text-pink-500 text-xl font-bold flex justify-center items-center rounded-full px-5 py-4 mr-4">
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>

						<button className="absolute top-1/2 right-0 md:-right-7 -translate-y-1/2 bg-white bg-opacity-50 shadow-xl text-pink-500 text-xl font-bold flex justify-center items-center rounded-full px-5 py-4">
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Category;
