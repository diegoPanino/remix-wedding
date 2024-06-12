import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

type TnightOptions = {
    value: string;
    label: string;
}

export default function RadioAccomodation() {
    let { t } = useTranslation();
    const nightOptions: TnightOptions[] = [
        { value: "no", label: t("Nah, I'm good") },
        { value: "yes", label: t("Yes, I need a bed") },
        { value: "maybe", label: t("I have a place to sleep, but if I'm to stoned, it's good to have a place where to crash") },
    ];
    const [selected, setSelected] = useState<TnightOptions>(nightOptions[0]);
    
    return (
        <RadioGroup by={"value"} value={selected} onChange={setSelected} className="space-y-2">
            {nightOptions.map(option => (
                <Radio
                    key={option.value}
                    value={option}
                    className="styledInput group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                >
                    <div className="flex w-full items-center justify-between">
                        <div className="text-sm/6">
                            <p className="font-semibold text-white">{option.label}</p>
                        </div>
                        <Icon icon="checkCircle" width={24} className="min-w-[24px] fill-white opacity-0 transition group-data-[checked]:opacity-100"/>
                    </div>
                </Radio>
            ))}
        </RadioGroup>
    )
}