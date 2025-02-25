import { useCallback, useEffect, useRef } from "react";
import { type GalleryType } from "~/utils/flickrApi";
interface GalleryProps {
    gallery: GalleryType[];
}

export default function Gallery({ gallery }: GalleryProps) {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    let currentPage = 1;
    const PAGINATED_BY = 25;
    const imgWidth = 2048;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.75, // 75% del target visibile
    };
    if (!gallery.length) return <p>No img</p>
    
    // useEffect(() => {
    //     renderImages();
    // }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCallback, observerOptions);
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        }
    }, []);
    
    // function loadImagesWithDelay(url: string, delay: number): Promise<HTMLImageElement> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             const img = new Image();
    //             img.src = url;
    //             img.classList.add('w-full', 'h-full', 'object-cover');
    //             img.onload = () => resolve(img);
    //             img.onerror = (error) => reject({url,error});
    //         }, delay);
    //     });
    // };

    const renderImages = async () => {
        let delay = 0;
        let upperLimit = PAGINATED_BY * currentPage;
        if (upperLimit > gallery.length) upperLimit = gallery.length;
        const bottomLimit = upperLimit - PAGINATED_BY;
        const images = gallery.slice(bottomLimit, upperLimit);
        const galleryContainer = galleryRef.current;
        if (!galleryContainer) return;
        images.forEach((file, index) => {
            console.log(index,file.src);
            const img = new Image();
            img.src = file.src;
            img.classList.add('w-full', 'h-full', 'object-cover', 'opacity-0', 'transition-opacity', 'duration-500', 'ease-in-out');
            img.onload = () => {
                console.log('on load')
                const placeholder = window.document.getElementById(`placeholder-${index}`);
                if (!placeholder) {
                    console.log('placeholder', index, file, 'no exist');
                    return;
                }
                const container = placeholder?.closest('.relative');
                container?.appendChild(img);
                img.classList.remove('opacity-0');
                placeholder.classList.add('opacity-0', 'transition-opacity', 'duration-500');
                setTimeout(() => placeholder.remove(), 500);
            }
        });
    }

    const renderImagePlaceholder = useCallback((number:number, hasString = false) => {
        let placeholders : JSX.Element[] | string = [];
        if (hasString) placeholders = "";
        
        const containerClass = "space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center lg:min-h-80";
        const innerContainerClass = "flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-cyan-800 min-h-80 w-full h-full lg:min-h-0";
        const svgClass = "w-10 h-10 text-crema-pastello"

        for (let i = 0; i < number; i++){
            if (typeof placeholders !== 'string') {
                placeholders.push(
                    <div className="relative space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center lg:min-h-80">
                        <div key={`placeholder-${i}`} id={`placeholder-${i}`} role="status" className={`absolute top-0 left-0 bottom-0 right-0 ${containerClass}`}>
                            <div className={innerContainerClass}>
                                <svg className={svgClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                placeholders += `
                    <div className="relative space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center lg:min-h-80">
                        <div key="placeholder-${i}" id="placeholder-${i}" role="status" class="absolute top-0 left-0 bottom-0 right-0 ${containerClass}">
                            <div class="${innerContainerClass}">
                                <svg class="${svgClass}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        return placeholders;
    }, [PAGINATED_BY]);
    
    const renderImagesHTML = useCallback((file: GalleryType ) => {
        return `<img src="${file.src}" loading="lazy" />`;
    }, [imgWidth]);
 
    const intersectionCallback = useCallback<IntersectionObserverCallback>((entries, observer) => {
        const galleryContainer = galleryRef.current;
        if (!galleryContainer) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.75) {
                    currentPage++;
                    let offset = PAGINATED_BY;
                    let upperLimit = PAGINATED_BY * currentPage;
                    if (upperLimit > gallery.length) {
                        upperLimit = gallery.length;
                        offset = upperLimit - galleryContainer.children.length;
                        if (sentinelRef.current)
                            observer.unobserve(sentinelRef.current);
                    }
                    
                    const placeholder = renderImagePlaceholder(offset, true);
                    console.log('created ', offset, 'element on page:', currentPage);
                    if (galleryContainer && typeof placeholder === 'string')
                        galleryContainer.children[galleryContainer.children.length - 1].insertAdjacentHTML('afterend', placeholder);

                    renderImages();
                    
                }
            }
        })
    }, [gallery, PAGINATED_BY, renderImagesHTML]);
    
    return (
        <div className="p-8 bg-gradient-to-b from-cyan-900 to-emerald-600 relative">
            <div ref={galleryRef} className="grid gap-3 grid-cols-1 lg:grid-cols-3">
                {renderImagePlaceholder(PAGINATED_BY)}
            </div>
            <div className="h-1 absolute left-0 right-0 bottom-1/4" ref={sentinelRef}></div>
        </div>
    );

}