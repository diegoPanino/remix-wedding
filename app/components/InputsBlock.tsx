import { Description, Field, Label, Textarea } from '@headlessui/react'
import MenuSelect from './MenuSelect';
import { useTranslation } from 'react-i18next';
import MyInput from './MyInput';
import RadioAccomodation from './RadioAccomodation';
import EtaSelector from './EtaSelector';
import Icon from './Icon';

interface InputsBlokProps {
    index: number;
    deleteCb: () => void;
}

export type InputBlockFieldsProps = {
    index: number;
}

export default function InputsBlock({ index, deleteCb }: InputsBlokProps) {
    let { t } = useTranslation();

    const onDeleteHandler = () => {
        deleteCb();
    }

    return (
        <div className={`${index > 0 ? "mt-5 relative" : ""} border rounded-lg p-5 border-solid border-emerald-500`}>
            <div className='lg:grid grid-cols-12 gap-10'>
                <Field className="lg:col-span-7">
                    <Label className="text-sm/6 font-medium text-white">{ t("Name") }</Label>
                    <Description className="text-sm/6 text-white/50">{ t("Something that help us recognize you!")}</Description>
                    <MyInput required={true} name={`name-${index}`} type='text' />
                </Field>
                <Field className="mt-4 lg:mt-0 lg:col-span-5">
                    <Label className="text-sm/6 font-medium text-white">{t("What do you eat?")}</Label>
                    <Description className="text-sm/6 text-white/50">{ t("Choose the menu!")}</Description>
                    <MenuSelect index={index} />
                </Field>
            </div>
            <div className='mt-4 lg:mt-8 lg:grid grid-cols-12 gap-10'>
                <Field className="col-span-full">
                    <Label className="text-sm/6 font-medium text-white">{t("Alimentar intollerance")}</Label>
                    <Description className="text-sm/6 text-white/50">{ t("What make you sick")}</Description>
                    <Textarea name={`intollerance-${index}`} className='styledInput' rows={3}/>
                </Field>
            </div>
            <div className='mt-4 lg:mt-8 lg:grid grid-cols-12 gap-10'>
                <Field className="lg:col-span-7">
                    <Label className="text-sm/6 font-medium text-white">{t("Need a place to sleep?")}</Label>
                    <RadioAccomodation index={index} />
                </Field>
                <Field className="mt-4 lg:mt-0 lg:col-span-5">
                    <Label className="text-sm/6 font-medium text-white">{t("Which day you'll arrive?")}</Label>
                    <EtaSelector index={index} />
                </Field>
            </div>
            <div className='mt-4 lg:mt-8 lg:grid grid-cols-12 gap-10'>
                <Field className="col-span-full">
                    <Label className="text-sm/6 font-medium text-white">{t("Anything you believe make sense for us to know!")}</Label>
                    <Description className="text-sm/6 text-white/50">{ t("Don't use this, to say how sorry your are for missing the party. If you can't make it, text us, don't use the confirmation form!")}</Description>
                    <Textarea name={`extra-${index}`} className='styledInput' rows={3}/>
                </Field>
            </div>
            {index === 0
                ? null
                : (
                    <div
                        className="ml-4 absolute rounded-lg right-0 top-0 lg:left-full lg:top-1/2 lg:-translate-y-2/4 lg:rounded-none px-6 py-3 flex justify-center items-center text-lg gap-3 normal-case bg-black text-center text-white hover:scale-105 transition-all hover:bg-gray-900 cursor-pointer"
                        onClick={onDeleteHandler}
                        >
                        <Icon
                            icon='trash'
                            size={24}
                        />
                    </div>
                )
            }
        </div>
    )
}   