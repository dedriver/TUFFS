import { createContext, useState, useEffect } from "react";

export const ContextApi = createContext();

export default function ContextApiProvider({ children }) {
    const [current, setCurrent] = useState(false);
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [renderCounter, setRenderCounter] = useState(3);
    const [category, setCategory] = useState(1);
    const [currentPrice, setCurrentPrice] = useState({
        name: '',
        images: [],
        description: '',
        price: 0
    });

    const [loading, setLoading] = useState(false);
    const [filterProducts, setFilterProducts] = useState('');
    const [filterProductsResp, setfilterProductsResp] = useState([]);
    const [basket, setBasket] = useState({
        product: [],
        totalPrice: 0,
        count: 0,
        itemCounter:0
    });
    const [favorite, setFavorite] = useState({
        product: [],
        totalPrice: 0,
        count: 0,
        itemCounter:0
    });

    function setFilterProduct(filter) {
        setFilterProducts(filter.target.value);
    }

    function OpenMore() {
        setRenderCounter(prev => prev + 9);
    }

    async function fetchFilterProducts() {
        if (filterProducts.trim() === '') {
            setfilterProductsResp([]);
            return;
        }

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${filterProducts}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const responseData = await response.json();
            setfilterProductsResp(responseData);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    }

    function setProductForAboutProduct(product) {
        setCurrentPrice({
            name: product.title,
            images: product.images,
            description: product.description,
            price: product.price,
        });
        setCurrent(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function fetchCategory() {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/categories");
            if (!response.ok) throw new Error("Network response was not ok");
            const responseData = await response.json();
            setData(responseData.slice(0, 5));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function fetchProduct() {
        setLoading(true);
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${category}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const responseData = await response.json();
            setProduct(responseData.slice(0, renderCounter));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    }

    function Backet(product) {
        setBasket((prevBasket) => {
            const isProductInBasket = prevBasket.product.some(
                (item) => item.name === product.title
            );
            if (isProductInBasket) {
                return {
                    ...prevBasket,
                    product: prevBasket.product.map((item) =>
                        item.name === product.title
                            ? { ...item, count: item.count + 1 }
                            : item
                    ),
                    totalPrice: prevBasket.totalPrice + product.price,
                };
            }
            return {
                ...prevBasket,
                product: [
                    ...prevBasket.product,
                    {
                        name: product.title,
                        images: product.images,
                        description: product.description,
                        price: product.price,
                        category: product.category,
                        count: 1
                    }
                ],
                totalPrice: prevBasket.totalPrice + product.price,
                itemCounter: prevBasket.itemCounter + 1
            };
        });
    }


    function addFavorite(product) {
        setFavorite((prevFavorite) => {
            const isProductInFavorite = prevFavorite.product.some(
                (item) => item.name === product.title
            );

            if (isProductInFavorite) {
                const updatedProducts = prevFavorite.product.filter(item => item.name !== product.title);
                return {
                    ...prevFavorite,
                    product: updatedProducts,
                    totalPrice: prevFavorite.totalPrice - product.price,
                    itemCounter: prevFavorite.itemCounter - 1
                };
            }
            return {
                ...prevFavorite,
                product: [
                    ...prevFavorite.product,
                    {
                        name: product.title,
                        images: product.images,
                        description: product.description,
                        price: product.price,
                        category: product.category,
                        count: 1
                    }
                ],
                totalPrice: prevFavorite.totalPrice + product.price,
                itemCounter: prevFavorite.itemCounter + 1
            };
        });
    }


    function RemoveItem(productName) {
        setBasket((prevState) => {
            const productToRemove = prevState.product.find(item => item.name === productName);
            if (!productToRemove) return prevState;
            const updatedProducts = prevState.product.filter(item => item.name !== productName);
            const updatedTotalPrice = prevState.totalPrice - productToRemove.price * productToRemove.count;
            const updatedCount = prevState.count - productToRemove.count;

            return {
                ...prevState,
                product: updatedProducts,
                totalPrice: updatedTotalPrice,
                count: updatedCount,
                itemCounter: prevState.itemCounter - 1
            };
        });
    }

    function PlusCount(productName) {
        setBasket((prevBasket) => {
            return {
                ...prevBasket,
                product: prevBasket.product.map((item) =>
                    item.name === productName
                        ? { ...item, count: item.count + 1 }
                        : item
                ),
                totalPrice: prevBasket.totalPrice + prevBasket.product.find((item) => item.name === productName).price,
                count: prevBasket.count + 1
            };
        });
    }

    function MinusCount(productName) {
        setBasket((prevBasket) => {
            return {
                ...prevBasket,
                product: prevBasket.product.map((item) =>
                    item.name === productName
                        ? { ...item, count: item.count - 1 }
                        : item
                ),
                totalPrice: prevBasket.totalPrice - prevBasket.product.find((item) => item.name === productName).price,
                count: prevBasket.count - 1
            };
        });
    }

    async function sendOrderToTelegram(basket) {
        const botToken = '6579180421:AAECXJ3FsbGxTJX8Z3D8pgUlcX95RZnOkPg';
        const chatId = '1008733102';
        if (!basket || !Array.isArray(basket.product) || basket.product.length === 0) {
            console.error('Basket is empty or not an array');
            return;
        }

        const productsList = basket.product.map(item =>
            `Назва: ${item.name}\nКількість: ${item.count}\nЦіна: ${item.price}`
        ).join('\n\n');

        const message = `Замовлення:\n\n${productsList}\n\nЗагальна ціна: ${basket.totalPrice}`;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Order sent to Telegram');
        } catch (error) {
            console.error('Error sending order to Telegram:', error);
        }
    }



    useEffect(() => {
        fetchCategory();
        fetchProduct();
    }, []);

    useEffect(() => {
        fetchFilterProducts();
    }, [filterProducts]);

    useEffect(() => {
        fetchProduct();
    }, [renderCounter, category]);

    const CtxApi = {
        data,
        product,
        fetchCategory,
        fetchProduct,
        OpenMore,
        renderCounter,
        setCategory,
        current,
        setCurrent,
        setProductForAboutProduct,
        currentPrice,
        loading,
        setFilterProduct,
        filterProducts,
        filterProductsResp,
        fetchFilterProducts,
        Backet,
        basket,
        setBasket,
        PlusCount,
        MinusCount,
        RemoveItem,
        sendOrderToTelegram,
        favorite,
        setFavorite,
        addFavorite
    };

    return <ContextApi.Provider value={CtxApi}>{children}</ContextApi.Provider>;
}
