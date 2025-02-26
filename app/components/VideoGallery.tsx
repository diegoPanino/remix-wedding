import {ColumnsPhotoAlbum, type Image, type Photo} from "react-photo-album";
import "react-photo-album/columns.css";

interface VideoGalleryProps {
    gallery: Photo[]
}

export default function VideoGallery({gallery} : VideoGalleryProps) {
    let galleryPhoto: Photo[] = [];

    gallery.forEach((photo: Photo) => {
        let imgSrcSet: Image[] = [];
        let videoSrcSet: Image[] = [];
        photo.srcSet?.forEach(size => {
            if (size.src.indexOf('.swf') === -1) {
                if (size.src.indexOf('/play/') !== -1) videoSrcSet.push(size);
                else imgSrcSet.push(size);
            }
        })
        galleryPhoto.push({
            ...photo,
            href: videoSrcSet[0].src,
            srcSet: imgSrcSet
        })
    })


    return (
        <>
            <ColumnsPhotoAlbum
                photos={galleryPhoto}
                componentsProps={()=>({
                    link: {target: '_blank', rel: 'noopener noreferrer'},
                })}

            />
        </>

    );
}