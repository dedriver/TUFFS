import { useEffect, useState, useContext, forwardRef } from "react";
import { ContextApi } from '../../context/contextApi.jsx';

function TrendingComponent(
    { name, category, price, newPrice, img, Click }
) {
    const [rnd, setRnd] = useState(0);
    const ctxAPI = useContext(ContextApi);

    useEffect(() => {
        const randomInt = Math.floor(Math.random() * 100);
        setRnd(randomInt);
    }, []);

    const selery = rnd;

    return (
        <div onClick={Click} className="w-full h-auto rounded-lg bg-mainFone flex flex-col">
            <div className='h-[50%] bg-white w-full flex items-center justify-center rounded-t-lg'>
                <img className='w-full h-full object-cover p-2' src={img} alt={name} />
            </div>
            <div className='h-auto p-3 flex flex-col'>
                <div className='font-montserrat font-bold text-white text-base mb-2'>
                    <p>{name}</p>
                </div>
                <div className='font-montserrat font-bold text-lGrey text-sm mb-2'>
                    {category}
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-end space-x-2'>
                        <p className='font-montserrat font-bold text-purpure text-lg mb-2'>{price} $</p>
                        <p className='font-montserrat font-bold text-lGrey text-sm line-through mb-2'>{newPrice - 10} $</p>
                    </div>
                    <div className='font-montserrat text-lGrey text-sm mb-2'>
                        {selery} people purchased
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendingComponent;
