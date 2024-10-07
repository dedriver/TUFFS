    import WorthSeeingCoponent from "./WorthSeeingCoponent.jsx";

    export default function WorthSeeing(){
        return(
            <div className='w-full mt-5 h-auto rounded-lg bg-compTem flex flex-col items-center justify-between p-6'>
                <div className={'font-montserrat font-bold text-white text-lg mb-2'}>Worth seeing</div>
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4  '}>
                    <WorthSeeingCoponent/>
                    <WorthSeeingCoponent/>
                    <WorthSeeingCoponent/>
                    <WorthSeeingCoponent/>
                </div>
            </div>
        );
    }