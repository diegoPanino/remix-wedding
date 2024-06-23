import { Form, useSubmit } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import InputsBlock from "./InputsBlock";
import { FormEvent, useRef, useState } from "react";
import { Button } from '@headlessui/react'
import { useTranslation } from "react-i18next";
import Icon from "./Icon";
import ConfimationModal from "./ConfirmationModal";

type TUsers = {
    id: string;
}
export type TResumeData = {
    name: string;
    menu: string;
    intollerance: string;
    bed: string;
    eta: string;
    note: string;
}

export default function RegistrationForm() {
    let { t } = useTranslation();
    const submit = useSubmit();
    const [showResume, setShowResume] = useState(false);
    const [resumeData, setResumeData] = useState<TResumeData[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

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
        let emptyNames = false;
        for (let i = 0; i < users.length; i++){
            const name = formData.get(`name-${i}`);
            if (name?.toString().trim() === "" || !name) emptyNames = true;
        }
        if (!emptyNames) {
            const newResumeData: TResumeData[] = [];
            for (let i = 0; i < users.length; i++) {
                const name = formData.get(`name-${i}`)?.toString() || "";
                const menu = formData.get(`menu-${i}`)?.toString() || "";
                const intollerance = formData.get(`intollerance-${i}`)?.toString() || "";
                const bed = formData.get(`accomodation-${i}[value]`)?.toString() || "";
                const eta = formData.get(`etaDay-${i}`)?.toString() || "";
                const note = formData.get(`extra-${i}`)?.toString() || "";
                newResumeData.push({
                    name,
                    menu,
                    intollerance,
                    bed,
                    eta,
                    note
                });
            }
            setResumeData([...resumeData, ...newResumeData]);
            setShowResume(true);
        }
        // if (!emptyNames) {submit(formData, { method: "post" });}
        else alert(t("We need at least a name!"));
    }

    const onConfirmSubmitHandler = () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        formData.append("totalRegistrations", users.length.toFixed(0));
        submit(formData, { method: "post" });
    }

    const toggleModal = () => {
        setShowResume(s => !s);
        setResumeData([]);
    }

    return (
        <div className="px-0 py-8 lg:p-8 mx-auto w-full max-w-[90vw] lg:max-w-[75vw]">
            <Form method="post" onSubmit={onSubmitHandler} ref={formRef}>
                {users.map((user, index) => (
                    <InputsBlock
                        key={user.id}
                        index={index}
                        deleteCb={() => handleDeleteField(user.id)}
                    />
                ))}
                <div className="flex w-full justify-center">
                    <Button
                        className="mt-5 flex gap-3 text-sm border border-emerald-500 rounded-lg normal-case underline text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-emerald-600 cursor-pointer"
                        type="button"
                        onClick={handleAddUser}
                    >
                        {t("Give me one more!")}
                        <Icon color="#fff" icon="userPlus" width={24} />
                    </Button>
                </div>
                <div className="flex w-full">
                    <Button
                        className="w-full mt-10 rounded-lg flex justify-center items-center text-lg gap-3 normal-case bg-emerald-500 text-center px-6 py-3 text-white hover:scale-105 transition-all hover:bg-emerald-600 cursor-pointer"
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
            {showResume
                ? <ConfimationModal
                    resumeData={resumeData}
                    toggleModal={toggleModal}
                    submit={onConfirmSubmitHandler}
                />
                : null
            }
        </div>
        
    )
}