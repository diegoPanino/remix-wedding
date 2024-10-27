import { useCallback, useEffect, useRef } from "react";
import { type driveFiles } from "~/utils/googleDrive";

interface GalleryProps{
    files: driveFiles[]
}

export default function VideoGallery(props: GalleryProps) {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const { files } = props;
    let currentPage = 1;
    const PAGINATED_BY = 25;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.75, // 75% del target visibile
    };
    if (!files || files.length < 1) return <p>No img</p>
    
    useEffect(() => { 
        renderImages();
    }, []);

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

    const renderImages = async () => {
        let delay = 0;
        let upperLimit = PAGINATED_BY * currentPage;
        if (upperLimit > files.length) upperLimit = files.length;
        const bottomLimit = upperLimit - PAGINATED_BY;
        const videos = files.slice(bottomLimit, upperLimit);
        const galleryContainer = galleryRef.current;
        if (!galleryContainer) return;
        videos.forEach((file, index) => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://drive.google.com/file/d/${file.id}/preview`;
            iframe.classList.add('w-full', 'object-cover');
            iframe.style.aspectRatio = "1";
            iframe.onerror = (e) => {
                console.error('---iframe error---',e,file.id)
                iframe.remove();
            };
            setTimeout(() => {
                if (galleryContainer.children[index + bottomLimit]) {
                    galleryContainer.replaceChild(iframe, galleryContainer.children[index + bottomLimit]);  
                }
                else galleryContainer.appendChild(iframe);
            },delay)
        
            delay += 100;
        });
    }

    const renderImagePlaceholder = useCallback((number:number, hasString = false) => {
        let placeholders : JSX.Element[] | string = [];
        if (hasString) placeholders = "";
        
        const containerClass = "space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center";
        const innerContainerClass = "flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-cyan-800 min-h-80 w-full h-full lg:min-h-0";
        const svgClass = "w-10 h-10 text-crema-pastello"

        for (let i = 0; i < number; i++){
            if (typeof placeholders !== 'string') {
                placeholders.push(
                    <div key={`placeholder-${i}`} role="status" className={containerClass}>
                        <div className={innerContainerClass}>
                            <svg className={svgClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                            </svg>
                        </div>
                    </div>
                )
            }
            else {
                placeholders += `
                    <div key="placeholder-${i}" role="status" class="${containerClass}">
                        <div class="${innerContainerClass}">
                            <svg class="${svgClass}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
                            </svg>
                        </div>
                    </div>
                `;
            }
        }
        return placeholders;
    }, [PAGINATED_BY]);
 
    const intersectionCallback = useCallback<IntersectionObserverCallback>((entries, observer) => {
        const galleryContainer = galleryRef.current;
        if (!galleryContainer) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.75) {
                    currentPage++;
                    let offset = PAGINATED_BY;
                    let upperLimit = PAGINATED_BY * currentPage;
                    if (upperLimit > files.length) {
                        upperLimit = files.length;
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
    }, [files, PAGINATED_BY]);
    
    return (
        <div className="p-8 bg-gradient-to-b from-cyan-900 to-emerald-600 relative">
            <div ref={galleryRef} className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                {renderImagePlaceholder(PAGINATED_BY)}
            </div>
            <div className="h-1 absolute left-0 right-0 bottom-1/4" ref={sentinelRef}></div>
        </div>
    );

}