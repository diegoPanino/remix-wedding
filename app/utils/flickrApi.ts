interface fetchFlickrFilesProps {
    key: string;
    assetId: string;
    userId: string;
}

interface FlickrAsset {
    id: string;
    secret: string;
    server: number;
    farm: number;
    title: string;
    isprimary: boolean;
    ispublic: boolean;
    isfriend: boolean;
    isfamily: boolean;
}

interface FlickrAssetResponse {
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
        photo: FlickrAsset
    };
    stat: string;
}


export async function fetchFlickrFiles({ key, assetId, userId } : fetchFlickrFilesProps) : Promise<FlickrAssetResponse> {

    const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${key}&photoset_id=${assetId}&user_id=${userId}&format=json&nojsoncallback=1`;

    const response = await fetch(url);
    if (response.status !== 200) throw new Error(response.statusText);
    
    const data = await response.json() as FlickrAssetResponse;
    return data;
}