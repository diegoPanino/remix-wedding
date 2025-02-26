import {ColumnsPhotoAlbum, type Photo} from "react-photo-album";
import "react-photo-album/columns.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {useState} from "react";
import {Fullscreen, Slideshow, Zoom, Download} from "yet-another-react-lightbox/plugins";

export default function GalleryContainer({gallery}: {gallery: Photo[]}) {
    const [index, setIndex] = useState(-1);

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