"use client"
import {useFormStatus} from "react-dom";

export default function ReRunButton({rerunAction, className}) {
    const { pending } = useFormStatus();
    return (
        <button formAction={rerunAction} className={className} disabled={pending}>
            {pending ? "Submitting..." : "Re-Run Query"}
        </button>
    );
}