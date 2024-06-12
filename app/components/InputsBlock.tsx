import { Description, Field, Label, Textarea } from '@headlessui/react'
import MenuSelect from './MenuSelect';
import { useTranslation } from 'react-i18next';
import MyInput from './MyInput';
import RadioAccomodation from './RadioAccomodation';
import EtaSelector from './EtaSelector';

interface InputsBlokProps {
    index: number;
    delete: () => void;
}

export default function InputsBlock({ index }: InputsBlokProps) {
    let { t } = useTranslation();
    return (
        <>
            <div className='grid grid-cols-12 gap-10'>
                <Field className="col-span-7">
                    <Label className="text-sm/6 font-medium text-white">{ t("Name") }</Label>
                    <Description className="text-sm/6 text-white/50">{ t("Something that help us recognize you!")}</Description>
                    <MyInput name={`name${index}`} type='text' />
                </Field>
                <Field className="col-span-5">
                    <Label className="text-sm/6 font-medium text-white">{t("What do you eat?")}</Label>
                    <Description className="text-sm/6 text-white/50">{ t("Choose the menu!")}</Description>
                    <MenuSelect />
                </Field>
            </div>
            <div className='mt-8 grid grid-cols-12 gap-10'>
                <Field className="col-span-full">
                    <Label className="text-sm/6 font-medium text-white">{t("Alimentar intollerance")}</Label>
                    <Description className="text-sm/6 text-white/50">{ t("What make you sick")}</Description>
                    <Textarea className='styledInput' rows={3}/>
                </Field>
            </div>
            <div className='mt-8 grid grid-cols-12 gap-10'>
                <Field className="col-span-7">
                    <Label className="text-sm/6 font-medium text-white">{t("Name")}</Label>
                    <RadioAccomodation />
                </Field>
                {/* <Field className="col-span-5">
                    <Label className="text-sm/6 font-medium text-white">{t("Name")}</Label>
                    <EtaSelector />
                </Field> */}
            </div>
        </>
    )
}   