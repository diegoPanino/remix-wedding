import { type Photo, type Image} from "react-photo-album";

interface FlickrVideoComponentProps{
    photo: Photo,
    width: number,
    height: number,
    onClick?: (e: MouseEvent) => void,
}

export default function FlickrVideoComponent({photo,width,height,onClick}: FlickrVideoComponentProps) {

    let videoSrcSet: Image[] = [];
    let imgSrcSet: Image[] = [];

    photo.srcSet?.forEach(size => {
        if (size.src.indexOf('.swf') === -1) {
            if (size.src.indexOf('/play/') !== -1) videoSrcSet.push(size);
            else imgSrcSet.push(size);
        }
    })

    return (
        <div>
            <img src={photo.src} height={height} width={width} />
        </div>
    );
}