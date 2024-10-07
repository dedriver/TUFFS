import wortSeeingLgo from '../../img/wortSeeingLgo.png'

export default function WorthSeeingCoponent(){
    return(
        <div className={'flex items-center space-y-2 flex-col'}>
            <div><img src={wortSeeingLgo} className={'w-[200px] h-[200px]'} alt="wortSeeingLgo.png"/></div>
            <div className={'font-montserrat font-bold text-white text-base mb-2'}><p>Sneakers</p></div>
        </div>
    );
}