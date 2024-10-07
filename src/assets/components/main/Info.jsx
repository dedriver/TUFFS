import pcPhoto from '../../img/compucter.png';

export default function Info() {
    return (
        <div className="bg-compTem w-full md:w-[74.57%] h-auto rounded-lg p-5 md:p-10 flex flex-col justify-between">
            <div className="text-center mb-4">
                <p className="font-bold text-mainFone text-[60px] md:text-[80px]">BIG SALE 20%</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex-1 mb-4 md:mb-0">
                    <p className="text-dGrey text-base mb-2">the bestseller of 2022</p>
                    <h1 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-4">LENNON r2d2 <br/> with NVIDIA 5090 TI</h1>
                    <button className="bg-purpure text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                        Shop Now
                    </button>
                </div>
                <div className="flex-1">
                    <img src={pcPhoto} alt="comp photo" className="rounded shadow-lg w-full h-auto" />
                </div>
            </div>
        </div>
    );
}
