import { Form } from "@remix-run/react";
import InputsBlock from "./InputsBlock";
import { useState } from "react";
import { Button } from '@headlessui/react'
import { useTranslation } from "react-i18next";

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

    return (
        <div className="p-8 mx-auto w-full max-w-[90vw] lg:max-w-[75vw]">
            <Form action="/events" method="post">
                {users.map((user, index) => (
                    <InputsBlock
                        key={index}
                        index={index}
                        delete={() => handleDeleteField(index)}
                    />
                ))}
            </Form>
            <Button type="button" onClick={handleAddUser}>
                {t("Give me one more!")}
            </Button>
        </div>
        
    )
}