import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@vercel/remix";
import Header from "~/components/Header";
import { driveFiles, fetchGooleDriveFiles, getMediaTypes } from "~/utils/googleDrive";
import { fetchFlickrFiles } from "~/utils/flickrApi";
import { commitSession, getSession } from "~/utils/session";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Gallery from "~/components/Gallery";
import VideoGallery from "~/components/VideoGallery";

interface loaderReturnValue {
    videos: driveFiles[],
    images: driveFiles[]
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    const folderId = process.env.GOOGLE_DRIVE_SHARED_FOLDER_ID;
    let data: loaderReturnValue = {
        videos: [],
        images: []
    }
    try {
        fetchFlickrFiles();
        if (!(apiKey && typeof apiKey === 'string') ||
            !(folderId && typeof folderId === 'string')) throw new Error('Cannot connect to Drive');
        
        const files = await fetchGooleDriveFiles({ folderId, apiKey });
        const { videos, images } = getMediaTypes(files);

        data = {
            videos,
            images,
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
        console.error('Gallery Loader error',error)
        return json({...data,error});
    }
}

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const { images, videos } = data;
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
                            <Gallery files={images} />
                        </TabPanel>
                        <TabPanel>
                            <VideoGallery files={videos} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}