import { useTranslation } from "react-i18next";

export default function ImportantInfo() {
    const {t} = useTranslation();
    return (
        <div className="bg-melanzana p-8">
            <h5 className="text-5xl underline pb-10">{t("Important Information")}</h5>
            <div className="text-xl">
                <p>{t("Les Cases Altes de Posada is a farmhouse in the middle of the Vall de Lord, in Solsonès, Catalunya (¡Visca!). This is our home, and we hope you like it as much as we do. Since we like to live in a remote place, there are a few things to keep in mind.")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Transportation")}</h6>
                <p className="font-semibold">{t("From Barcelona Airport")}</p>
                <ul className="list-decimal pl-4 px-2">
                    <li>
                        <p>{t("Goal: Get to the bus station (Estació del Nord). How?")}</p>
                        <ul className="list-['*'] pl-4 px-2">
                            <li><p>{t("Take the bus (Aerobus) from the airport and then, once at Plaça Catalunya, take the metro to Arc de Triomf (L1 metro stop).")}</p></li>
                            <li><p>{t("Alternatively, you can take a taxi directly from the airport to the bus station.")}</p></li>
                        </ul>
                    </li>
                    <li>
                        <p>{t("From there, take the bus to Solsona (Alsa company). It is a two-hour trip.")}</p>
                        <p>{t("Cost: 20 euros (buy online or on the bus).")}</p>
                    </li>
                </ul>
                <p className="font-semibold">{t("Bus Schedules")}</p>
                <ul>
                    <li><p>06/09/2024</p></li>
                    <li><p>07/09/2024</p></li>
                    <li><p>08/09/2024</p></li>
                </ul>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Temperature")}</h6>
                <p>{t("We are 950m above sea level, so it gets cooler in the evening. If you tend to get cold, we recommend bringing something warm.")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Pre-Party")}</h6>
                <p>{t("The day before the wedding, there will be a pre-party. (Details to follow!)")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Camping")}</h6>
                <p>{t("It is possible to camp. In the village, there are paid parking spaces for equipped camping. Where we are getting married, there is plenty of space, so on Friday and Saturday you can sleep in your van, free of charge and without additional costs.")}</p>
            </div>
        </div>
    );
}