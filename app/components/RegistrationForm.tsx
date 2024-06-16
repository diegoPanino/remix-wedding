import { Form, useSubmit } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import InputsBlock from "./InputsBlock";
import { FormEvent, useState } from "react";
import { Button } from '@headlessui/react'
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

type TUsers = {
    id: string;
}

export default function RegistrationForm() {
    let { t } = useTranslation();
    const submit = useSubmit();
    const emptyUser: TUsers = {
        id: uuidv4(),
    }
    const [users, setUsers] = useState<TUsers[]>([emptyUser]);

    const handleAddUser = () => {
        const newUser = { id: uuidv4() };
        setUsers([...users, newUser]);
    }

    const handleDeleteField = (id: string) => {
        const newUsers = users.filter((user) => user.id !== id );
        setUsers(newUsers);
    }

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        formData.append("totalRegistrations", users.length.toFixed(0));
        submit(formData, { method: "post" });
    }

    return (
        <div className="px-0 py-8 lg:p-8 mx-auto w-full max-w-[90vw] lg:max-w-[75vw]">
            <Form method="post" onSubmit={onSubmitHandler}>
                {users.map((user, index) => (
                    <InputsBlock
                        key={user.id}
                        index={index}
                        deleteCb={() => handleDeleteField(user.id)}
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