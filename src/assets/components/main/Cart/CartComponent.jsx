export default function CartComponent({name , category ,counter ,plusCount ,minusCount , prise ,newPrise , Remove, img}){
    return <div className={'text-white text-lg font-bold w-[100%] h-[70px] bg-mainFone rounded-[8px] flex items-center px-3 justify-between'}>
        <div><img  className={'h-[50px] w-[90px] rounded-[6px]'}  src={img} alt="testImg"/></div>
        <div className={'text-sm'}><p>{name}</p><p>{category}</p></div>
        <div><p>{prise}$</p></div>
        <div className={'flex space-x-5'}>
            <button onClick={minusCount} className={'w-[25px] rounded-[6px] text-black flex items-center text-lg font-montserrat justify-center h-[25px] bg-white'}>-</button>
            <p>{counter}</p>
            <button onClick={plusCount} className={'w-[25px] rounded-[6px] text-white flex items-center text-lg font-montserrat justify-center h-[25px] bg-purpure'}>+</button>
        </div>
        <div><p className={'text-purpure'}>{newPrise}$</p></div>
        <div>
            <button onClick={Remove}>x</button>
        </div>
    </div>
}