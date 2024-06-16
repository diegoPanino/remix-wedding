import { Popover, PopoverButton, PopoverOverlay,  PopoverPanel, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import Icon from './Icon';

export default function LangSwitcher() {
    let { t, i18n } = useTranslation();
    
    const handleLanguangeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = event.currentTarget;
        i18n.changeLanguage(value);
    };

    return (
        <Popover className="relative w-full line-h-0"> {/* TODO Line Height-0 tailwind*/}
            <PopoverButton className="hidden lg:inline-block w-full text-end">{t("Choose language")}</PopoverButton>
            <PopoverButton className="lg:hidden w-full text-end">
                <Icon size={24} icon={i18n.language} className='ml-auto'/>
            </PopoverButton>
            <Transition
                enter="duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="duration-200 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                {/* Close Panel with click outside or click options */}
                <PopoverPanel anchor="bottom" className="text-white bg-sky-950/50 rounded p-3 w-[20%] flex origin-top flex-col transition">
                    <button className='flex gap-2 justify-end align-center' value="it" onClick={handleLanguangeSelect}>
                        Mamma mia!
                        <Icon icon='it' size={24}/>
                    </button>
                    <button className='flex gap-2 justify-end align-center' type="button" value="cat" onClick={handleLanguangeSelect}>
                        Mara meva!
                        <Icon icon="cat" size={24}/>
                    </button>
                    <button className='flex gap-2 justify-end align-center' type="button" value="en" onClick={handleLanguangeSelect}>
                        Oh my gosh!
                        <Icon icon="en" size={24} />
                    </button>
                    <button className='flex gap-2 justify-end align-center' type="button" value="es" onClick={handleLanguangeSelect}>
                        !Què fuerte!
                        <Icon icon="es" size={24}/>
                    </button>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}