import './App.css';
import MainNavigation from "./assets/components/MainNavigation.jsx";
import Info from "./assets/components/main/Info.jsx";
import Category from "./assets/components/main/Category.jsx";
import Trending from "./assets/components/Trending/Trending.jsx";
import WorthSeeing from "./assets/components/WorthSeeing/WorthSeeing.jsx";
import Sale from "./assets/components/Sale/Sale.jsx";
import AboutProduct from "./assets/components/main/AboutProduct.jsx";
import { useContext, useState } from "react";
import { ContextApi } from "./assets/context/contextApi.jsx";
import Cart from "./assets/components/main/Cart/Cart.jsx";
import Heart from "./assets/components/main/favorite/Favorite.jsx";

export default function App() {
    const ctxAPI = useContext(ContextApi);
    const [cartOpen, setCartOpen] = useState(false);
    const [heartOpen, setHeartOpen] = useState(false);

    return (
        <div className='bg-mainFone w-full h-auto px-4 md:px-[16.82%]'>
            <MainNavigation
                HeartClick={() => setHeartOpen(prevState => !prevState)}
                cartClick={()=> setCartOpen(prevState => !prevState)}
            />
            <main className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                <Category />
                {cartOpen ? (
                    <Cart />
                ) : heartOpen ? (
                    <Heart />
                ) : ctxAPI.current ? (
                    Array.isArray(ctxAPI.currentPrice) ? (
                        <div>
                            {ctxAPI.currentPrice.map((item, index) => (
                                <AboutProduct
                                    key={index}
                                    name={item.name}
                                    price={item.price}
                                    imgs={item.images}
                                    description={item.description}
                                    category={item.category}
                                />
                            ))}
                        </div>
                    ) : (
                        <AboutProduct
                            name={ctxAPI.currentPrice.name}
                            price={ctxAPI.currentPrice.price}
                            imgs={ctxAPI.currentPrice.images}
                            description={ctxAPI.currentPrice.description}
                            category={ctxAPI.currentPrice.category}
                        />
                    )
                ) : <Info />}
            </main>
            <Trending name={'Products'} />
            <WorthSeeing />
            <Sale />
        </div>
    );
}
