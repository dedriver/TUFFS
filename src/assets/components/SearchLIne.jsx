import { useContext } from "react";
import { ContextApi } from "../context/contextApi.jsx";
import SearcItem from './SearcItem.jsx';

export default function SearchLine() {
    const ctxAPI = useContext(ContextApi);

    return (
        <div className={'w-[100%] rounded-[3px] absolute h-auto border border-white bg-compTem opacity-70 border-solid p-2 space-y-3'}>
            {ctxAPI.filterProductsResp && ctxAPI.filterProductsResp.length > 0 ? (
                ctxAPI.filterProductsResp.map((product, index) => (
                    <SearcItem
                        Click={() => ctxAPI.setProductForAboutProduct(product)}
                        text={product.title}
                        imgs={product.images}
                        price={product.price}
                        key={index}
                    />
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}
