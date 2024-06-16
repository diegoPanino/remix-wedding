import { Input, type _internal_ComponentInput } from "@headlessui/react"
import { ComponentProps } from "react"

export type MyInputProps = ComponentProps<typeof Input> & JSX.IntrinsicElements['input'];

export default function MyInput(props: MyInputProps) {
    const { className } = props;
    return (
        <Input className={`${className ? className : ""} styledInput` } {...props} />
    )
}