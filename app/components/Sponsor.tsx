import MarqueeText from "react-marquee-text";


export default function Sponsor() {
    return (
        <>
            <h2 className="text-3xl underline text-center">SPONSOR</h2>
            <MarqueeText duration={25} textSpacing="20px" pauseOnHover={false} direction="right" className="!flex items-center">
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <a className="hover:underline animate-pulse" href="https://www.flowersofcris.com/" target="_blank">
                        flowersofcris.com
                    </a>
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <a className="hover:underline animate-pulse" href="https://www.instagram.com/sakundi/" target="_blank">
                        saKundi
                    </a>
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <a className="hover:underline animate-pulse" href="https://www.flowersofcris.com/" target="_blank">
                        <img src="/assets/images/logoHatimu.webp" className="" />
                    </a>
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <img className="col-span-2" src="/assets/images/pumba.jpeg" />
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <img className="col-span-2" src="/assets/images/dietorelle.png" />
                </div>

                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <a className="hover:underline animate-pulse" href="https://www.flowersofcris.com/" target="_blank">
                        flowersofcris.com
                    </a>
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <a className="hover:underline animate-pulse" href="https://www.instagram.com/sakundi/" target="_blank">
                        saKundi
                    </a>
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <a className="hover:underline animate-pulse" href="https://www.flowersofcris.com/" target="_blank">
                        <img src="/assets/images/logoHatimu.webp" className="" />
                    </a>
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <img className="col-span-2" src="/assets/images/pumba.jpeg" />
                </div>
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <img className="col-span-2" src="/assets/images/dietorelle.png" />
                </div>
            </MarqueeText>
        </>
            
        
    )
}