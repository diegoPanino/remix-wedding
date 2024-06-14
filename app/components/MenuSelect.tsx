import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputBlockFieldsProps } from "./InputsBlock";

type TmenuOption = {
    value: string;
    label: string;
}

export default function MenuSelect({index}:InputBlockFieldsProps) {
    let { t } = useTranslation();
    const menuOptions: TmenuOption[] = [
        { value: "normal", label: t("Normal menu") },
        { value: "veggy", label: t("Vegan menu") },
        { value: "celiac", label: t("Celiac menu") },
        { value: "kid", label: t("Kid menu") }
    ];
    const [selectedMenu, setSelectedMenu] = useState<TmenuOption>(menuOptions[0]);

    return (
        <Listbox value={selectedMenu} onChange={setSelectedMenu}>
            <ListboxButton className="styledInput relative">{selectedMenu.label}</ListboxButton>
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
            <input type="hidden" value={selectedMenu.value} name={`menu-${index}`} />
        </Listbox>
    )
}