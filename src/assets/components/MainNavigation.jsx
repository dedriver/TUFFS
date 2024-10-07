import { useState, useRef, useEffect } from "react";
import Logo from '../img/logo.svg';
import Heart from '../img/heart.svg';
import Burket from '../img/burket.svg';
import SearchLIne from "./SearchLIne.jsx";
import {useContext } from "react";
import { ContextApi } from '../context/contextApi.jsx';

export default function MainNavigation({cartClick , HeartClick}) {

    const ctxAPI = useContext(ContextApi);

    const [open, setOpen] = useState(false);
    const searchRef = useRef(null);

    function Open() {
        setOpen(true);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    return (
        <div className="py-5 px-4 flex flex-col md:flex-row justify-between ">
            <div className="mb-4 md:mb-0">
                <img src={Logo} alt="logo" className="h-8 md:h-10" />
            </div>
            <div className="flex space-x-4 mb-4 md:mb-0">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                </div>
                <p className="text-sm md:text-base">Sasha Chun</p>
            </div>
            <div ref={searchRef} className="relative mb-4 md:mb-0 w-full md:w-auto">
                <input
                    onClick={Open}
                    type="text"
                    className="w-full md:w-[300px] bg-mainFone px-4 py-2 rounded-lg text-sm md:text-base"
                    placeholder="Search..."
                    onChange={ctxAPI.setFilterProduct}
                />
                {
                    open ? <SearchLIne /> : ''
                }
            </div>
            <div className="flex space-x-4">
                <img className="w-6 h-6" src={Heart} alt="heart"
                 onClick={HeartClick}/>
                <div className="relative">
                    <img
                        onClick={cartClick}
                        className="w-8 h-8"
                        src={Burket}
                        alt="cart"
                    />
                    <span
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 text-xs rounded-full bg-purple-500 text-white flex items-center justify-center"
                    >
        {ctxAPI.basket.itemCounter}
    </span>
                </div>
            </div>
        </div>
    );
}
