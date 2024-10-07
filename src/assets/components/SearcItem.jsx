
export default function searcItem({imgs , text ,price , Click}) {
    return <div onClick={Click} className={'opacity-100 text-white font-montserrat flex items-center px-2 justify-between  w-[100%] h-[40px] border-black border-solid bg-purpure rounded-[6px]'}>
        <img src={imgs} className={'w-[30px] h-[30px]'} alt=""/> <p>{text}</p> <p>3{price}</p>
    </div>
}