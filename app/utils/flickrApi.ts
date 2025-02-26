import type {Photo} from "react-photo-album";

export interface FlickrAssetResponse {
    photoset: {
        id: string;
        primary: string;
        owner: string;
        ownername: string;
        page: number;
        per_page: number;
        perpage: number;
        pages: number;
        title: number;
        sorting_option_id: string;
        total: number;
        photo: FlickrAsset[]
    };
    stat: string;
}

interface FlickrSize {
    label: string;
    width: number;
    height: number;
    source: string;
    url: string;
    media: string;
}

interface FlickrSizes {
    size: FlickrSize[];
}

interface FlickrGetSizesResponse {
    canblog: number;
    canprint: number;
    candownload: number;
    sizes: FlickrSizes;
}

export interface GalleryType {
    src: string;
    alt?: string;
    title?: string;
    type?: 'img' | 'video';
    tags?: string;
}

export interface CustomImage {
  original: string;
}

interface FlickrFetchReturnValue {
    gallery: Photo[];
    fetchErrors: FlickrRequestError[];
}
interface fetchFlickrSizesProps {
    key: string;
    assetId: string;
    mediaType: 'videos' | 'photos';
}
interface fetchFlickrFilesProps {
    key: string;
    assetId: string;
    userId: string;
    mediaType: 'videos' | 'photos';
}

interface FlickrAsset {
    id: string;
    secret: string;
    server: number;
    farm: number;
    title: string;
    originalformat: string;
    originaleSecret: string;
    tags: string;
    isprimary: 0 | 1;
    ispublic: 0 | 1;
    isfriend: 0 | 1;
    isfamily: 0 | 1;
}

interface FlickrRequestErrorType extends Error {
    page?: number;
    code: number;
}

class FlickrRequestError extends Error implements FlickrRequestErrorType {
    page?: number;
    code: number;

    constructor(message: string, code: number, page?: number) {
        super(message);
        this.page = page || undefined;
        this.code = code;
        this.name = 'FlickrRequestError'; 
    }
}


export async function fetchFlickrFiles({ key, assetId, userId, mediaType } : fetchFlickrFilesProps) : Promise<FlickrFetchReturnValue> {

    let gallery: Photo[] = [];
    let fetchErrors: FlickrRequestError[] = [];
    let intents = 0;
    let pages = Infinity;
    let currentPage = 1;

    do {
        intents++
        try {
            const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${key}&photoset_id=${assetId}&user_id=${userId}&format=json&nojsoncallback=1&media=${mediaType}&page=${currentPage}&extras=original_format,o_dims,tags`;
            const response = await fetch(url);

            if (response.status !== 200) {
                console.error('assetId',assetId);
                throw new FlickrRequestError(response.statusText, response.status,currentPage);
            }

            const data = await response.json() as FlickrAssetResponse;
            const { photoset } = data;
            const galleryResult = await Promise.allSettled(photoset.photo .map(async (photo) => getFlickrSize({key, assetId: photo.id,mediaType})));
            gallery = [
                ...gallery,
                ...galleryResult
                    .filter(promise => promise.status === 'fulfilled')
                    .map(result => (result as PromiseFulfilledResult<Photo>).value)
            ];


            pages = data.photoset.pages;
            currentPage++
        }
        catch (error) {
            console.error('GetPhoto error')
            currentPage++;
            if (error instanceof FlickrRequestError) {
                fetchErrors.push(error);
            }

        }
    }
    while (currentPage <= pages && intents < 5)
    
    return {gallery, fetchErrors}
}

export async function getFlickrSize({key,assetId,mediaType} : fetchFlickrSizesProps) : Promise<Photo>{
    if (mediaType === 'photos') return [] as unknown as Photo;
    try{
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${key}&photo_id=${assetId}&format=json&nojsoncallback=1`;
        const response = await fetch(url);
        const label = mediaType === 'videos' ? 'Original' : 'Large';
        if (response.status !== 200) {
            throw new FlickrRequestError(response.statusText, response.status);
        }

        const data = await response.json() as FlickrGetSizesResponse;
        let defaultValue: FlickrSize[] = [];

        const srcSet: Photo[] = data.sizes.size.map( size => {
            if (size.label === label) defaultValue.push(size);

            return {
                src:size.source,
                width:size.width,
                height:size.height,
            }

        }).filter((item): item is Photo => item !== null)

        if (!defaultValue.length) {
            console.log(`Nessuna dimensione "Large" trovata per l'assetId: ${assetId}`);
            console.table(data.sizes.size.map(size => ({
                assetId,
                label: size.label,
                width: size.width,
                height: size.height,
                source: size.source
            })));
        }

        return {
            src: defaultValue[0].source,
            width: defaultValue[0].width,
            height: defaultValue[0].height,
            srcSet
        }
    }
    catch(error){
        console.error('Get size error',error);
        return [] as unknown as Photo;
    }
}