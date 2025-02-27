import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { createInstance } from "i18next";
import i18next from "./i18next.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import i18n from "./i18n"; // your i18n configuration file
import { resolve } from "node:path";
import path from "path";
import { handleRequest, type EntryContext } from '@vercel/remix';


export default async function (
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	let callbackName = isbot(request.headers.get("user-agent"))
		? "onAllReady"
		: "onShellReady";

	let instance = createInstance();
	let lng = await i18next.getLocale(request);

	await instance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.use(Backend) // Setup our backend
		.init({
			...i18n, // spread the configuration
			lng, // The locale we detected above
            backend: {
                localePath: path.resolve("./public/locales"),
                loadPath: resolve("./public/locales/{{lng}}.json")
            },
		});
	let remixServer = (
		<I18nextProvider i18n={instance}>
			<RemixServer context={remixContext} url={request.url} />
		</I18nextProvider>
	);

	return handleRequest(
		request,
		responseStatusCode,
		responseHeaders,
		remixServer
	)

	// return new Promise((resolve, reject) => {
	// 	let didError = false;

	// 	let { pipe, abort } = renderToPipeableStream(
	// 		<I18nextProvider i18n={instance}>
	// 			<RemixServer context={remixContext} url={request.url} />
	// 		</I18nextProvider>,
	// 		{
	// 			[callbackName]: () => {
	// 				let body = new PassThrough();
	// 				const stream = createReadableStreamFromReadable(body);
	// 				responseHeaders.set("Content-Type", "text/html");

	// 				resolve(
	// 					new Response(stream, {
	// 						headers: responseHeaders,
	// 						status: didError ? 500 : responseStatusCode,
	// 					}),
	// 				);

	// 				pipe(body);
	// 			},
	// 			onShellError(error: unknown) {
	// 				reject(error);
	// 			},
	// 			onError(error: unknown) {
	// 				didError = true;

	// 				console.error(error);
	// 			},
	// 		},
	// 	);

	// 	setTimeout(abort, ABORT_DELAY);
	// });
}