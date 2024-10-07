import {useContext} from "react";
import { ContextApi } from '../../context/contextApi.jsx';2

export default function Category() {

    const ctxAPI = useContext(ContextApi);

    return (
        <div className='flex flex-col justify-between p-4 bg-compTem w-full md:w-[23%] h-auto text-dGrey rounded-lg'>
            <div className='space-y-6'>
                <div className='text-white text-lg font-bold'>CATEGORIES</div>
                <div className='text-sm space-y-2 ' >
                    {
                        ctxAPI.data.length > 0
                            ? ctxAPI.data.map((name, index) => (
                                <p className={'hover:text-purpure'} key={index} onClick={() => ctxAPI.setCategory(name.id)}>{name.name}</p>
                            ))
                            : <p>Loading categories...</p>
                    }

                </div>
            </div>
            <div className='text-xs flex justify-between items-center mt-4'>
                <p>Help</p>
                <p>Terms & Conditions</p>
            </div>
        </div>
    );
}
