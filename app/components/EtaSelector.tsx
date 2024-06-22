import { Listbox, ListboxButton, Transition, ListboxOptions, ListboxOption } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { InputBlockFieldsProps } from "./InputsBlock";

type tEtaDayOption = {
    value: string,
    label: string
};
export default function EtaSelector({ index }: InputBlockFieldsProps) {
    let { t } = useTranslation();
    const menuOptions: tEtaDayOption[] = [
        { value: "01/09/2024", label: t("Sunday 01") },
        { value: "02/09/2024", label: t("Monday 02") },
        { value: "03/09/2024", label: t("Tuesday 03") },
        { value: "04/09/2024", label: t("Wednesday 04") },
        { value: "05/09/2024", label: t("Thursday 05") },
        { value: "06/09/2024", label: t("Friday 06") },
        { value: "07/09/2024", label: t("Saturday 07") },
    ];
    const [selectedDay, setSelectedDay] = useState<tEtaDayOption>(menuOptions[5]);
    return (
        <div className="grid grid-cols-12 items-baseline gap-4">
            <div className="col-span-6">
                <Listbox value={selectedDay} onChange={setSelectedDay}>
                <ListboxButton className="styledInput relative">{selectedDay.label}</ListboxButton>
                    <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <ListboxOptions
                            anchor="bottom start"
                            className="w-[var(--button-width)] rounded-xl border border-white/5 bg-emerald-500 p-1 [--anchor-gap:5px] focus:outline-none"
                        >
                            {menuOptions.map((option, index) => (
                                <ListboxOption key={`${option.value}-${index}`} value={option} className="group text-white flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10">
                                    {option.label}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </Listbox>
            </div>
            <div className="col-span-6 text-white">{t('September')} '24</div>
            <input type="hidden" value={selectedDay.value} name={`etaDay-${index}`} />
        </div>
    )
}