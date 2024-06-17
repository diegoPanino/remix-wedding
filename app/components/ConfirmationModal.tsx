import { Button } from "@headlessui/react";
import type { TResumeData } from "./RegistrationForm";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useActionData } from "@remix-run/react";
import { action } from "~/routes/_index";

interface ConfimationModalProps {
    resumeData: TResumeData[];
    toggleModal: () => void;
    submit: () => void;
}

export default function ConfimationModal({ resumeData, toggleModal, submit }: ConfimationModalProps) {
    let { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const actionData = useActionData<typeof action>();

    const submitHandler = () => {
        setIsLoading(true);
        submit();
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.document.body.style.overflowY = 'hidden';

        return () => {
            if (typeof window !== "undefined") window.document.body.style.overflowY = 'hidden';
        }

    }, [])
    
    useEffect(() => {
        if (actionData) {
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }, [actionData]);

    const grid = useMemo(() => {
        if (resumeData.length > 1) return "grid-cols-1 lg:grid-cols-2 gap-4"
        else return "grid-cols-1";
    }, [resumeData]);

    return (
        <>  
            {(isLoading && !actionData) && (
                <div className="fixed top-0 left-0 w-screen h-screen flex-col flex justify-center items-center bg-emerald-950/50 backdrop-blur-md overflow-y-auto">
                    <div className="flex flex-col bg-sky-700 p-8 rounded-lg items-center">
                        <img className="mb-4 max-h-[50vh]" src="/assets/images/pray.png" />
                        <div className="loader"></div>
                    </div>
                </div>
            )} 

            {(actionData && actionData.status) && (
                <div className="fixed top-0 left-0 w-screen h-screen flex-col flex justify-center items-center bg-emerald-950/50 backdrop-blur-md overflow-y-auto">
                    <div className="flex flex-col bg-sky-700 p-8 rounded-lg">
                        <div className="flex gap-2">
                            <img className="w-[50%] lg:max-w-[20vw]" src="/assets/images/Dsucced.png" />
                            <img className="w-[50%] lg:max-w-[20vw]" src="/assets/images/Osucced.png" />
                        </div>
                        <div className="mt-5 flex gap-3 justify-center items-center">
                            <p className="text-center">{t("YES! We see you there!")}</p>
                            <div id="DOanimation"></div>
                        </div>
                    </div>
                </div>
            )}

            {(actionData && !actionData.status) && (
                <div className="fixed top-0 left-0 w-screen h-screen flex-col flex justify-center items-center bg-emerald-950/50 backdrop-blur-md overflow-y-auto">
                    <div className="flex flex-col bg-sky-700 p-8 rounded-lg">
                        <p className="text-center mb-5">{t("oh snap! something didn't work out as expected, turn it off and turn it on always works. (Refresh and try again, otherwise text us!!)")}</p>
                        <img className="max-h-[50vh] object-contain" src="/assets/images/grinch.png" />
                    </div>
                </div>
            )}
            {((!isLoading && !actionData) && resumeData && resumeData.length) &&
                
                <div className="fixed top-0 left-0 w-screen h-screen flex-col flex justify-center items-center bg-emerald-950/50 backdrop-blur-md overflow-y-auto">
                    <div className="flex flex-col bg-sky-700 p-8 rounded-lg">
                        <p className="text-center mb-5">{t("Confirming for:")} {resumeData.length}</p>
                        <div className={`grid ${grid}`}>
                            {resumeData.map(data => (
                                <div className="flex flex-col gap-1 shadow-md p-8 bg-sky-600/25">
                                    <div className="flex gap-3">
                                        <p>{t("Name")}:</p>
                                        <p className="font-semibold">{data.name}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p>Menu:</p>
                                        <p className="font-semibold">{data.menu}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p>{t("Alimentar intollerance")}:</p>
                                        <p className="font-semibold">{data.intollerance}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p>{t("Need a place to sleep?")}:</p>
                                        <p className="font-semibold">{data.bed}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p>{t("Which day you'll arrive?")}:</p>
                                        <p className="font-semibold">{data.eta}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p>{t("Anything you believe make sense for us to know!")}:</p>
                                        <p className="font-semibold">{data.note}</p>
                                    </div>
                                </div>         
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {!isLoading
                                ? <Button
                                        className="w-full mt-10 flex justify-center items-center text-lg gap-3 normal-case text-center px-6 py-3 text-black hover:underline transition-all cursor-pointer"
                                        type="button"
                                        onClick={toggleModal}
                                >
                                    {t("Need to change something")}
                                </Button>
                                : null
                            }
                            <Button
                                className="w-full mt-10 flex justify-center items-center text-lg gap-3 normal-case bg-black text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-gray-900 cursor-pointer"
                                type="button"
                                onClick={submitHandler}
                                disabled={isLoading}
                            >
                                {t("Confirm")}
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}