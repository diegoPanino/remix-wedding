import { json, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@vercel/remix";
import { useTranslation } from "react-i18next";
import Header from "~/components/Header";
import ImgTextOverlay from "~/components/ImgTextOverlay";
import RegistrationForm from "~/components/RegistrationForm";


export const meta: MetaFunction = () => {
	return [
		{ title: "E Giacomino si sposa.." },
		{ name: "description", content: "Olga&Diego Get marry !" },
	];
};

export async function action({ request }: ActionFunctionArgs) {
	const FORM_URL = "https://script.google.com/macros/s/AKfycbxl5bRL04AiiDWGmcejleCuQPRY0S8kILlm1biQOHpDdDI9YnT4e9Tyt-V7jvqjigYX/exec";
	const submittedForm = await request.formData();
	// console.log('🚀 ~ action ~ submittedForm:', submittedForm);
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
		return json({ status: "ok",resume:registerFormData });
	}
	catch (e) {
		return json({ status: false, error: e });
	}
}

export default function Index() {
	let { t } = useTranslation();
	const actionData = useActionData<typeof action>();
	console.log(actionData);
	return (
		<>
			<Header />
			<main>
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
							{t("7 September 2024")}
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
						className='text-sm normal-case bg-black text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-gray-900 cursor-pointer'>
						{t("Stick it in your agenda")}
					</a>
				</ImgTextOverlay>
				<section className='flex flex-wrap lg:flex-nowrap'>
					<div className='p-8 text-center basis-full lg:basis-3/6 bg-verde-salvia flex flex-col justify-center'>
						<h5 className='text-5xl underline pb-10'>
							{t("Diego & Olga")}
						</h5>
						<div className='text-start text-3xl'>
							<p>{t("Congratulations")}!!</p>
							<p>
								{t(
									"You have been selected as guest to our party. The journey is long, the reward is fleeting"
								)}
							</p>
							<p>{t("Ready")}?</p>
						</div>
					</div>
					<div className='basis-full lg:basis-3/6 relative pt-[50%]'>
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
				<section>
					<RegistrationForm />
				</section>
			</main>
		</>
	);
}
