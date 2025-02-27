import {ColumnsPhotoAlbum, type Image, type Photo} from "react-photo-album";
import "react-photo-album/columns.css";

interface VideoGalleryProps {
    gallery: Photo[];
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
                columns={(containerWidth) => {
                    if (containerWidth <= 480 ) return 1;
                    else if (containerWidth > 480 && containerWidth <= 768) return 2;
                    else if (containerWidth > 768 && containerWidth <= 990) return 3;
                    else if (containerWidth > 990 && containerWidth <= 1440) return 4;
                    else return 5;
                }}
                componentsProps={()=>({
                    link: {target: '_blank', rel: 'noopener noreferrer'},
                })}

            />
        </>

    );
}