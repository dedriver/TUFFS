import '../../../../App.css'
import { useContext } from "react";
import { ContextApi } from "../../../context/contextApi.jsx";
import FavoriteComponent from "./FavoriteComponent.jsx";

export default function Favorite() {
    const ctxAPI = useContext(ContextApi);

    return (
        <div className={'space-y-5 bg-compTem w-full h-[400px] md:w-[74.57%] rounded-lg p-3 md:p-7 flex flex-col justify-between'}>
            <div>
                <p className={'font-montserrat text-white text-lg font-bold'}>Your Favorite</p>
            </div>
            <div className={'space-y-2 overflow-y-scroll hide-scrollbar'} style={{ maxHeight: '300px' }}>
                {ctxAPI.favorite.product.map((item, key) => (
                    <FavoriteComponent
                        name={item.name}
                        prise={item.price}
                        category={item.category}
                        key={key}
                        newPrise={item.price}
                        counter={item.count}
                        img={item.images}
                        plusCount={() => ctxAPI.PlusCount(item.name)}
                        minusCount={() => ctxAPI.MinusCount(item.name)}
                        Remove={() => ctxAPI.RemoveItem(item.name)}
                    />
                ))}
            </div>
            <div className={'flex justify-between items-center'}>
                <div className={'flex flex-row space-x-1'}>
                    <p className={'text-lGrey text-lg font-bold'}>TOTAL PRICE: </p>
                    <p className={'text-white text-lg font-bold'}>{ctxAPI.favorite.totalPrice}$</p>
                </div>
            </div>
        </div>
    );
}
