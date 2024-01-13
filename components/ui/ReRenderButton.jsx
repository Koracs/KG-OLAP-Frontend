"use client"
import {useFormStatus} from "react-dom";

export default function ReRenderButton({rerenderAction, className}) {
    const { pending } = useFormStatus();
    return (
        <button formAction={rerenderAction} className={className} disabled={pending}>
            {pending ? "Submitting..." : "Re-Render"}
        </button>
    );
}