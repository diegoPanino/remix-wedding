import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@vercel/remix";
import Header from "~/components/Header";
import { createGallery, fetchFlickrFiles, type FlickrAssetResponse, type GalleryType } from "~/utils/flickrApi";
import { commitSession, getSession } from "~/utils/session";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
// import Gallery from "~/components/Gallery";
import VideoGallery from "~/components/VideoGallery";
import GalleryContainer from "~/components/GalleryContainer";
interface loaderReturnValue {
    videos: GalleryType | [];
    images: GalleryType | [];
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const key = process.env.FLICKR_KEY;
    const assetId = process.env.FLICKR_ASSET_ID;
    const userId = process.env.FLICKR_USER_ID

    try {
        if (!(key && typeof key === 'string') ||
            !(assetId && typeof assetId === 'string') ||
            !(userId && typeof userId === 'string') 
        ) throw new Error('Cannot connect to cloud');

        const imagesResponse = await fetchFlickrFiles({ key, assetId, userId, mediaType: 'photos' });
        const videosResponse = await fetchFlickrFiles({ key, assetId, userId, mediaType: 'videos' });

        const data = { 
            images: imagesResponse.gallery,
            videos: videosResponse.gallery
        }
		return json(
            {...data},
			{
				headers: {
					"Set-Cookie": await commitSession(session)
				}
			}
		);
    }
    catch (error) {
        let data = {
            images: [],
            videos: []
        }
        return json({...data,error});
    }
}

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const { images, videos } = data;
    // console.log('🚀 ~ Index ~ images:', images);
    return (
        <>
            <Header />
            <main>
                <TabGroup>
                    <TabList>
                        <Tab>Pictures</Tab>
                        <Tab>Videos</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <GalleryContainer gallery = {images} />
                        </TabPanel>
                        <TabPanel>
                            {/* <VideoGallery files={videos} /> */}
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}