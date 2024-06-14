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
    console.log(await request.formData());
    return json({status:"ok"});
}

export default function Index() {
  let { t } = useTranslation();
  const actionData = useActionData();
  console.log('🚀 ~ Index ~ actionData:', actionData);
  return (
    <>
      <Header />
      <main>
        <ImgTextOverlay img="/assets/images/casas-de-posada.jpg">
            <h3 className="font-black text-4xl w-fit text-center">
              <span className="bg-verde-salvia">{t('Enjoy is mandatory')}</span><br/>
              <span className="bg-verde-salvia">{t('Fomalities are optionals')}</span>
            </h3>
            <h3 className="font-black text-4xl w-fit text-center">
              <span className="bg-crema-pastello">{t("7 September 2024")}</span><br/>
              <span className="bg-crema-pastello">{t("Cases altes de posada, Navés")}</span><br/>
              <span className="bg-crema-pastello">{t("Catalunya")}</span><br/>
            </h3>
            <a 
              href="https://calendar.app.google/kbeJU79R2cF8TkMc6"
              target="_blank"
              className="text-sm normal-case bg-black text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-gray-900 cursor-pointer"
            >
              {t("Stick it in your agenda")}
          </a>
        </ImgTextOverlay>
        <section className="flex">
          <div className="p-8 text-center basis-3/6 bg-verde-salvia flex flex-col justify-center">
            <h5 className="text-5xl underline pb-10">{t("Diego & Olga")}</h5>
            <div className="text-start text-3xl">
              <p>{t("Congratulations")}!!</p>
              <p>{t("You have been selected as guest to our party. The journey is long, the reward is fleeting")}</p>
              <p>{t("Ready")}?</p>
            </div>
          </div>
          <div className="basis-3/6 relative pt-[50%]">
            <video controls autoPlay muted loop className="absolute top-0 left-0 w-full h-full">
              <source src="/assets/video/dont-own-me.mp4" type="video/mp4"></source>
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
