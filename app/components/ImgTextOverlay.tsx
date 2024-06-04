import { ReactNode, useEffect, useRef, useState } from "react";

interface ImgTextOverlayProps {
    img: string;
    children: ReactNode;
}
export default function ImgTextOverlay({ img, children }: ImgTextOverlayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayContainer = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [minHeight, setMinHeight] = useState<number>(0);
    const resizeTimer = useRef<number | null>(null);

    useEffect(() => {
        const updateMinHeight = () => {
            if (overlayContainer.current && window.innerWidth < 1024) {
                setMinHeight(overlayContainer.current.clientHeight);
            }
        };

        const handleResize = () => {
            if (resizeTimer.current !== null) {
                clearTimeout(resizeTimer.current);
            }
            resizeTimer.current = window.setTimeout(() => {
                updateMinHeight();
                resizeTimer.current = null;
            }, 200); 
        };

        updateMinHeight();

        window.addEventListener('resize', handleResize);

        return () => {
        if (resizeTimer.current !== null) {
            clearTimeout(resizeTimer.current);
        }
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="relative">
            <img
                src={img}
                className="transition-all md:min-h-[75vh] xl:min-h-[50vh] h-full w-full object-cover"
                ref={imgRef}
                style={{ height: minHeight + "px" }} />
            <div ref={overlayContainer}  className="absolute top-0 left-0 w-full md:h-full flex justify-center items-center uppercase flex-col gap-8 p-8">
                {children}
            </div>
        </section>
    )
}