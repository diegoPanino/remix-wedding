import { Form, useSubmit } from "@remix-run/react";
import InputsBlock from "./InputsBlock";
import { FormEvent, useState } from "react";
import { Button } from '@headlessui/react'
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

type TUsers = {
    index: number;
    name: string;
    menu: string;
    intollerance: string;
    eta: string;
    needBeed: string;
}

export default function RegistrationForm() {
    let { t } = useTranslation();
    const submit = useSubmit();
    const emptyUser: TUsers = {
        index:0,
        name: "",
        menu: "",
        intollerance: "",
        eta: "",
        needBeed: ""
    }
    const [users, setUsers] = useState<TUsers[]>([emptyUser]);

    const handleAddUser = () => {
        const newUser = { ...emptyUser, index: users.length };
        setUsers([...users, newUser]);
    }

    const handleDeleteField = (index: number) => {
        const newUsers = users.filter((user, i) => i !== index);
        setUsers(newUsers);
    }

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        const { currentTarget } = event;
        const totUser = users.   d
        console.log('🚀 ~ onSubmitHandler ~ currentTarget:', currentTarget);
        const formData = new FormData(currentTarget);
        submit(formData, { method: "post" });
        
    }

    return (
        <div className="p-8 mx-auto w-full max-w-[90vw] lg:max-w-[75vw]">
            <Form method="post" onSubmit={onSubmitHandler}>
                {users.map((user, index) => (
                    <InputsBlock
                        key={index}
                        index={index}
                        delete={() => handleDeleteField(index)}
                    />
                ))}
                <div className="flex w-full justify-center">
                    <Button
                        className="mt-5 flex gap-3 text-sm normal-case bg-black text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-gray-900 cursor-pointer"
                        type="button"
                        onClick={handleAddUser}
                    >
                        {t("Give me one more!")}
                        <Icon color="#fff" icon="userPlus" width={24} />
                    </Button>
                </div>
                <div className="flex w-full">
                     <Button
                        className="w-full mt-10 flex justify-center items-center text-lg gap-3 normal-case bg-black text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-gray-900 cursor-pointer"
                        type="submit"
                    >
                        {users.length > 1
                            ? t("CONFIRM WE'LL BE THERE")
                            : t("I CONFIRM I'LL BE THERE")
                        }
                        <Icon color="#fff" icon="smile" width={24} />
                    </Button>
                </div>
            </Form>
        </div>
        
    )
}