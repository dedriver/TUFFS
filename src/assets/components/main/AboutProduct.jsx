import { useContext, useState } from "react";
import { ContextApi } from "../../context/contextApi.jsx";

const SmoleImg = 'w-[70px] h-[70px] object-cover border-2 border-gray-200 rounded-lg cursor-pointer';

export default function AboutProduct({ name, price, description, imgs, category }) {
    const ctxAPI = useContext(ContextApi);

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const isFavorite = ctxAPI.favorite.product.some((item) => item.name === name);

    function handleThumbnailClick(index) {
        setActiveImageIndex(index);
    }

    return (
        <div className="bg-compTem w-full md:w-[85%] h-auto rounded-lg p-5 md:p-10 flex flex-col lg:flex-row justify-between space-y-10 space-x-8 lg:space-y-0">
            <div className="flex w-full lg:w-[55%] space-x-3">
                <div className="flex-shrink-0 w-full lg:w-[75%]">
                    <img className="w-full h-[300px] object-cover rounded-lg shadow-lg" src={imgs[activeImageIndex]} alt="Product" />
                </div>
                <div className="flex flex-col space-y-2 justify-start">
                    {imgs.map((img, index) => (
                        <img
                            key={index}
                            className={SmoleImg}
                            src={img}
                            alt={`Product thumbnail ${index + 1}`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-[45%] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">{name}</h2>
                    <p className="text-lg font-semibold text-white">{price}$</p>
                </div>
                <div className="space-y-1">
                    <p className="text-gray-400 font-medium">Color:</p>
                    <p className="text-white">Blanc</p>
                </div>
                <div className="space-y-1">
                    <p className="text-gray-400 font-medium">Sizes:</p>
                    <div className="flex space-x-2">
                        <p className="border px-2 py-1 rounded-md text-white">4.5</p>
                        <p className="border px-2 py-1 rounded-md text-white">5</p>
                        <p className="border px-2 py-1 rounded-md text-white">5.5</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-400 text-sm">
                        {description}
                    </p>
                </div>
                <div className="flex space-x-3 pt-2 font-montserrat">
                    <button className="bg-purple-700 text-white px-4 py-1 rounded-lg hover:bg-purple-600 transition" onClick={() => ctxAPI.Backet({ title: name, images: imgs, category: category, price: price })}>
                        Add to cart
                    </button>
                    <button
                        onClick={() => ctxAPI.addFavorite({ title: name, images: imgs, category: category, price: price })}
                        className={`px-4 py-1 rounded-lg transition ${isFavorite ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-400 hover:bg-gray-300'} text-white`}
                    >
                        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    </button>
                </div>
                <div className="flex space-x-2 text-gray-400 pt-1 text-sm">
                    <p>19 people purchased</p>
                    <p className="underline cursor-pointer hover:text-white">Find in a store</p>
                </div>
            </div>
        </div>
    );
}
