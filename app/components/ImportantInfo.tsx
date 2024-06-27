import { Button, Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export default function ImportantInfo() {
    const { t, i18n } = useTranslation();
    const [vBusModal, setVBusModal] = useState(false);
    const [sBusModal, setSBusModal] = useState(false);
    const [dBusModal, setDBusModal] = useState(false);


    return (
        <div className="bg-crema-pastello p-8">
            <h5 className="text-5xl underline pb-10">{t("Important Information")}</h5>
            <div className="text-xl">
                <p>{t("Les Cases Altes de Posada is a farmhouse in the middle of the Vall de Lord, in Solsonès, Catalunya (¡Visca!). This is our home, and we hope you like it as much as we do. Since we like to live in a remote place, there are a few things to keep in mind.")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Transportation")}</h6>
                <p className="font-semibold">{t("From Barcelona Airport")}</p>
                <ul className="list-decimal pl-4 px-2">
                    <li>
                        <Trans
                            i18nKey="Goal: Get to the bus station (Estació del Nord). How?"
                            components={[<Link target="_blank" to="https://maps.app.goo.gl/c2MEx58Ys613BWXs8" />]}
                        />
                        <ul className="list-['*'] pl-4 px-2">
                            <li>
                                <p>
                                    <Trans
                                        i18nKey="Take the bus (Aerobus) from the airport and then, once at Plaça Catalunya, take the metro to Arc de Triomf (L1 metro stop)."
                                        components={[
                                            <Link target="_blank" to="https://aerobusbarcelona.es/" />,
                                            <Link target="_blank" to="https://maps.app.goo.gl/WbMq3g4NpEzHK3R27" />,
                                            <Link target="_blank" to="https://maps.app.goo.gl/YMGYBBEJnxpcDM9s8" />
                                        ]}
                                    />
                                </p>
                            </li>
                            <li>
                                <p>
                                    {t("Alternatively, you can take a taxi directly from the airport to the bus station.")}
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>
                            <Trans
                                i18nKey="From there, take the bus to Solsona (Alsa company). It is a two-hour trip."
                                components={[
                                    <Link target="_blank" to="https://www.alsa.es/" />
                                ]}
                            />
                        </p>
                        <p>{t("Cost: 20 euros (buy online or on the bus).")}</p>
                    </li>
                </ul>
                <p className="font-semibold mt-2">{t("Bus Schedules")}</p>
                <ul>
                    <li className="font-semibold underline cursor-pointer w-fit" onClick={() => setVBusModal(true)}>
                        <p>06/09/2024</p>
                        <Dialog open={vBusModal} as="div" className="relative z-10 focus:outline-none" onClose={()=>setVBusModal(false)}>
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-emerald-900/5 p-6 backdrop-blur-2xl">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <DialogPanel
                                        className="w-full max-w-[90%] rounded-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                    >
                                        <DialogTitle as="h3" className="text-base/7 font-medium text-black mb-2">
                                            {t("Be carefull because this schedule may not be updated!")}
                                        </DialogTitle>
                                        <div className="flex flex-col items-center lg:flex-row gap-2">
                                            <div className="basis-full lg:basis-1/2">
                                                <img src={`/assets/images/bus/${i18n.language}-v-1.png`} />
                                            </div>
                                            <div className="basis-full lg:basis-1/2">
                                                <img src={`/assets/images/bus/${i18n.language}-v-2.png`} />
                                            </div>
                                        </div>
                                    <div className="mt-4 flex justify-end">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                            onClick={()=>setVBusModal(false)}
                                        >
                                            {t("Got it, thanks!")}
                                        </Button>
                                    </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>
                    </li>
                    <li className="font-semibold underline cursor-pointer w-fit" onClick={() => setSBusModal(true)}>
                        <p>07/09/2024</p>
                        <Dialog open={sBusModal} as="div" className="relative z-10 focus:outline-none" onClose={()=>setSBusModal(false)}>
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-emerald-900/5 p-6 backdrop-blur-2xl">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <DialogPanel
                                        className="w-full max-w-[90%] rounded-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                    >
                                        <DialogTitle as="h3" className="text-base/7 font-medium text-black mb-2">
                                            {t("Be carefull because this schedule may not be updated!")}
                                        </DialogTitle>
                                        <div className="flex flex-col items-center lg:flex-row gap-2">
                                            <div className="basis-full">
                                                <img src={`/assets/images/bus/${i18n.language}-s-1.png`} />
                                            </div>
                                        </div>
                                    <div className="mt-4 flex justify-end">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                            onClick={()=>setSBusModal(false)}
                                        >
                                            {t("Got it, thanks!")}
                                        </Button>
                                    </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>
                    </li>
                    <li className="font-semibold underline cursor-pointer w-fit" onClick={() => setDBusModal(true)}>
                        <p>08/09/2024</p>
                        <Dialog open={dBusModal} as="div" className="relative z-10 focus:outline-none" onClose={()=>setDBusModal(false)}>
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-emerald-900/5 p-6 backdrop-blur-2xl">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <DialogPanel
                                        className="w-full max-w-[90%] rounded-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                    >
                                        <DialogTitle as="h3" className="text-base/7 font-medium text-black mb-2">
                                            {t("Be carefull because this schedule may not be updated!")}
                                        </DialogTitle>
                                        <div className="flex flex-col items-center lg:flex-row gap-2">
                                            <div className="basis-full">
                                                <img src={`/assets/images/bus/${i18n.language}-d-1.png`} />
                                            </div>
                                        </div>
                                    <div className="mt-4 flex justify-end">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                            onClick={()=>setDBusModal(false)}
                                        >
                                            {t("Got it, thanks!")}
                                        </Button>
                                    </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>
                    </li>
                </ul>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Temperature")}</h6>
                <p>{t("We are 950m above sea level, so it gets cooler in the evening. If you tend to get cold, we recommend bringing something warm.")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Pre-Party")}</h6>
                <p>{t("The day before the wedding, there will be a pre-party. (Details to follow!)")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Camping")}</h6>
                <p>{t("It is possible to camp. In the village, there are paid parking spaces for equipped camping. Where we are getting married, there is plenty of space, so on Friday and Saturday you can sleep in your van, free of charge and without additional costs.")}</p>
                <h6 className="text-2xl font-semibold mt-4 mb-1">{t("Alloggio")}</h6>
                <p>{t("Il posto dove ci sposiamo ha circa 50 posti letti, letti a castello. Cases Altes si trova a circa 10 minuti di macchina dal paese dove viviamo, Sant LLorenc de Morunys. Sant LLorenc de Morunys è il posto dove cercare se volete trovare un alloggio diverso")}</p>
            </div>
        </div>
    );
}