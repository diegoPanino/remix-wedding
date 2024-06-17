import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import Icon from './Icon';

export default function LangSwitcher() {
    let { t, i18n } = useTranslation();
    
    const handleLanguangeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = event.currentTarget;
        i18n.changeLanguage(value);
    };

    return (
        <Menu>
            <MenuButton className="lg:inline-block w-full text-end cursor-pointer">
                <span className='hidden lg:inline-block'>{t("Choose language")}</span>
                <Icon className='lg:hidden ml-auto' size={24} icon={i18n.language} />
            </MenuButton>
            <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems anchor="bottom end" className="min-w-max lg:w-auto text-white bg-sky-950/50 rounded p-3 flex origin-top flex-col transition gap-2.5">
                    <MenuItem>
                        <button className='flex gap-2 justify-end align-center' value="it" onClick={handleLanguangeSelect}>
                            <span className='break-keep'>Mamma mia!</span>
                            <Icon icon='it' size={24}/>
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button className='flex gap-2 justify-end align-center' type="button" value="cat" onClick={handleLanguangeSelect}>
                            <span className='break-keep'>Mara meva!</span>
                            <Icon icon="cat" size={24}/>
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button className='flex gap-2 justify-end align-center' type="button" value="en" onClick={handleLanguangeSelect}>
                            <span className='break-keep'>Oh my gosh!</span>
                            <Icon icon="en" size={24} />
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button className='flex gap-2 justify-end align-center' type="button" value="es" onClick={handleLanguangeSelect}>
                            <span className='break-keep'>!Què fuerte!</span>
                            <Icon icon="es" size={24}/>
                        </button>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    );
}