import { json, Link, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { useTranslation } from "react-i18next";
import Header from "~/components/Header";
import ImgTextOverlay from "~/components/ImgTextOverlay";
import ImportantInfo from "~/components/ImportantInfo";
import RegistrationForm from "~/components/RegistrationForm";
import Sponsor from "~/components/Sponsor";
import { commitSession, getSession } from "~/utils/session";
import ParticlesBackground from "~/components/ParticlesBackground";

export const meta: MetaFunction = () => {
	return [
		{ title: "E Giacomino si sposa.." },
		{ name: "description", content: "Olga&Diego Get marry !" },
	];
};

export async function loader({request}: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const isWelcome = url.searchParams.has("welcome");

	const data = {
		isWelcome
	}
	const session = await getSession(request.headers.get("Cookie"));

	return json(
		{data},
		{
			headers: {
				"Set-Cookie": await commitSession(session)
			}
		}
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const FORM_URL = "https://script.google.com/macros/s/AKfycbxl5bRL04AiiDWGmcejleCuQPRY0S8kILlm1biQOHpDdDI9YnT4e9Tyt-V7jvqjigYX/exec";
	const submittedForm = await request.formData();

	const totalRegistrationsValue = submittedForm.get("totalRegistrations");
	const registerFormData = [];

	if (totalRegistrationsValue === null)
		return json({ status: false, error: "Total registrations is null" });

	const totalRegistrations = parseInt(totalRegistrationsValue as string, 10);
	if (isNaN(totalRegistrations))
		return json({ status: false, error: "Total registrations is not a number" });

	for (let i = 0; i < totalRegistrations; i++){
		const currentSet: { [key: string]: any } = {};
		currentSet['NAME'] = submittedForm.get(`name-${i}`);
		currentSet['MENU'] = submittedForm.get(`menu-${i}`);
		currentSet['INTOLLERANCE'] = submittedForm.get(`intollerance-${i}`);
		currentSet['BED'] = submittedForm.get(`accomodation-${i}[value]`);
		currentSet['ETA'] = submittedForm.get(`etaDay-${i}`);
		currentSet['NOTE'] = submittedForm.get(`extra-${i}`);
		registerFormData.push(currentSet);
	}
	try {
		const response = await fetch(FORM_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(registerFormData),
		});
		const data = await response.json();
		
		if (!response.ok && data.result) throw new Error(response.statusText);
		return json({ status: true,resume:registerFormData });
	}
	catch (e) {
		return json({ status: false, error: e });
	}
}

export default function Index() {
	let { t } = useTranslation();
	const loaderData = useLoaderData<typeof loader>();
	const { isWelcome } = loaderData.data;	
	
	return (
		<>
			<Header />
			<main>
				{isWelcome
					? (
						<>
						<ImgTextOverlay img='/assets/images/casas-de-posada.jpg'>
							<h3 className='font-black text-4xl w-fit text-center'>
								<span className='bg-verde-salvia'>
									{t("Enjoy is mandatory")}
								</span>
								<br />
								<span className='bg-verde-salvia'>
									{t("Fomalities are optionals")}
								</span>
							</h3>
							<h3 className='font-black text-4xl w-fit text-center'>
								<span className='bg-crema-pastello'>
									{t("7 September 2024")}, 17:00
								</span>
								<br />
								<span className='bg-crema-pastello'>
									{t("Cases altes de posada, Navés")}
								</span>
								<br />
								<span className='bg-crema-pastello'>
									{t("Catalunya")}
								</span>
								<br />
							</h3>
							<a
								href='https://calendar.app.google/kbeJU79R2cF8TkMc6'
								target='_blank'
								className='rounded-lg text-sm normal-case bg-emerald-500 text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-emerald-600 cursor-pointer'>
								{t("Stick it in your agenda")}
							</a>
						</ImgTextOverlay>
						<section className='flex flex-wrap lg:flex-nowrap'>
							<div className='p-8 text-center basis-full lg:basis-3/6 bg-verde-salvia flex flex-col gap-4'>
								<div className="flex gap-2">
									<div className="basis-1/2 relative ">
										<img className=" top-0 left-0 w-full object-cover h-full" src="/assets/images/do-puerta.jpeg" />
									</div>
									<div className="basis-1/2 relative ">
										<img className=" top-0 left-0 w-full object-cover h-full" src="/assets/images/do-grey.jpeg" />
									</div>
								</div>
								<div className="flex h-full flex-col justify-center items-center">
									<h5 className='font-black text-4xl text-5xl uppercase pb-10'>
										{t("Diego & Olga")}
									</h5>
									<div className='text-center text-3xl'>
										<p>{t("Congratulations")}!!</p>
										<p>
											{t(
												"You have been selected as guest to our party. The journey is long, the reward is fleeting"
											)}
										</p>
										<p>{t("Ready")}?</p>
									</div>
								</div>
							</div>
							<div className='basis-full lg:basis-3/6 relative pt-[100%] lg:pt-[50%]'>
								<video
									controls
									autoPlay
									muted
									loop
									className='absolute top-0 left-0 w-full h-full'>
									<source
										src='/assets/video/dont-own-me.mp4'
										type='video/mp4'></source>
								</video>
							</div>
						</section>
						<section className="important-info">
							<ImportantInfo />
						</section>
						
						<section className="grid grid-rows-2 gap-4 p-8 bg-verde-salvia">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="col-span-1">
									<h2 className="underline text-2xl mb-3">Sant Llorenç de Morunys</h2>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20311.696101422487!2d1.5681588631547285!3d42.13077302712952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a5b950bf5e3a45%3A0xeccf2cdf344670df!2sSant%20Lloren%C3%A7%20de%20Morunys%2C%20Lleida!5e1!3m2!1sen!2ses!4v1718661339675!5m2!1sen!2ses"
										className="w-full"
										height="450"
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
								<div className="col-span-1">
									<h2 className="underline text-2xl mb-3">Les Cases Altes de Posada</h2>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.7262163771234!2d1.595641010920338!3d42.11170415063699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a5b97dffe53467%3A0x74b3d4a1a13f0140!2sLes%20Cases%20Altes%20de%20Posada!5e1!3m2!1sen!2ses!4v1718661229474!5m2!1sen!2ses"
										className="w-full"
										height="450"
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="col-span-1">
									<h2 className="underline text-2xl mb-3">Catalunya</h2>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1309022.600888293!2d0.42368590457722155!3d41.68671863311926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a45bdc8530f5f3%3A0x100fae021a3c850!2sCatalonia!5e1!3m2!1sen!2ses!4v1718661659566!5m2!1sen!2ses"
										className="w-full"
										height="450"
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
								<div className="col-span-1">
									<h2 className="underline text-2xl mb-3">{t("Earth")}</h2>
									<a href="https://theflatearthsociety.org/home/" target="_blank">
										<img className="h-[450px] w-full object-cover" src="/assets/images/flatEarth.webp" />
									</a>
								</div>
							</div>
						</section>
						<section>
							<RegistrationForm />
						</section>
						<section className="mt-10 bg-white">
							<Sponsor />
						</section>
					</>
					)
					: (
						<div className="h-[calc(100vh-72px)] w-full flex justify-center items-center">
							<ParticlesBackground>
									<Link className="z-10 rounded-lg text-sm normal-case bg-crema-pastello text-center text-emerald-600 hover:scale-105 transition-all hover:bg-emerald-600 hover:text-crema-pastello cursor-pointer px-6 py-3" to="/gallery" >{t("Gallery")}</Link>
							</ParticlesBackground>
						</div>

					)
					
				}
			</main>
		</>
	);
}
