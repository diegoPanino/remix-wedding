import { json, useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs } from "@vercel/remix";
import Header from "~/components/Header";
import VideoGallery from "~/components/VideoGallery";
import { fetchFlickrFiles } from "~/utils/flickrApi";
import { commitSession, getSession } from "~/utils/session";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

import GalleryContainer from "~/components/GalleryContainer";
import {flickrGetSizesTest} from "~/utils/flickrTest";
import {useTranslation} from "react-i18next";

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
            images:imagesResponse.gallery,
            videos:videosResponse.gallery,
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
        let images =  flickrGetSizesTest('photo');
        let videos =  flickrGetSizesTest('videos');

        let data = {
            images,
            videos,
        }
        return json({...data,error});
    }
}

export default function Index() {
    let { t } = useTranslation();
    const data = useLoaderData<typeof loader>();
    const { images, videos } = data;

    return (
        <>
            <Header />
            <main>
                <TabGroup>
                    <TabList className="flex justify-center gap-4 mb-6">
                        <Tab className="data-[selected]:bg-emerald-600 rounded-lg text-sm normal-case bg-emerald-500 text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-emerald-600 cursor-pointer">{t("Photos")}</Tab>
                        <Tab className="data-[selected]:bg-emerald-600 rounded-lg text-sm normal-case bg-emerald-500 text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-emerald-600 cursor-pointer">{t("Videos")}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <GalleryContainer gallery= {images} />
                        </TabPanel>
                        <TabPanel>
                            <VideoGallery gallery= {videos} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}