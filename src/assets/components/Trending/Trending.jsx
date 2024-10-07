import TrendingComponent from "./TrendingComponent.jsx";
import { useContext } from "react";
import { ContextApi } from '../../context/contextApi.jsx';

export default function Trending({ name }) {
    const ctxAPI = useContext(ContextApi);

    function Open() {
        ctxAPI.OpenMore();
    }

    return (
        <div className='w-full mt-5 h-auto rounded-lg bg-compTem flex flex-col items-center justify-between p-6'>
            <div>
                <p className='font-montserrat font-bold text-white text-lg mb-2'>{name}</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
                {ctxAPI.loading ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    ctxAPI.product.map((item) => (
                        <TrendingComponent
                            name={item.title}
                            img={item.images[2]}
                            key={item.id}
                            price={item.price}
                            newPrice={item.price}
                            category={item.category.name}
                            Click={() => ctxAPI.setProductForAboutProduct(item)}
                        />
                    ))
                )}
            </div>
            <div className='mt-4'>
                <button onClick={Open} className="bg-purpure text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    See more
                </button>
            </div>
        </div>
    );
}
