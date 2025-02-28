import {ColumnsPhotoAlbum, type Photo} from "react-photo-album";
import "react-photo-album/columns.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {useCallback, useEffect, useState} from "react";
import {Fullscreen, Slideshow, Zoom, Download} from "yet-another-react-lightbox/plugins";

export default function GalleryContainer({gallery}: {gallery: Photo[]}) {
    const [index, setIndex] = useState(-1);

    const onPopState = useCallback((event: PopStateEvent) => {
        if (index >= 0) setIndex((-1));
    },[index]);

    useEffect(()=>{
        if (index >= 0) window.history.pushState({lightboxOpen: true},"",window.location.pathname);
        else if (window.history.state?.lightboxOpen) window.history.back();
    },[index]);

    useEffect(() => {
        window.addEventListener("popstate", onPopState);
        return () => {
            window.removeEventListener("popstate", onPopState);
        }
    }, [onPopState]);

    const onClickHandler = ({index}: {index: number}) => {
        setIndex(index);
    }

    const onCloseHandler = () =>{
        setIndex(-1);
    }

    return (
        <>
            <ColumnsPhotoAlbum
                photos={gallery}
                columns={(containerWidth) => {
                    if (containerWidth <= 480 ) return 1;
                    else if (containerWidth > 480 && containerWidth <= 768) return 2;
                    else if (containerWidth > 768 && containerWidth <= 990) return 3;
                    else if (containerWidth > 990 && containerWidth <= 1440) return 4;
                    else return 5;
                }}
                onClick={onClickHandler}
            />
            <Lightbox
                slides={gallery}
                open={index >= 0}
                index={index}
                close={onCloseHandler}
                plugins={[Fullscreen, Slideshow, Zoom, Download]}
            />
        </>

    );
}