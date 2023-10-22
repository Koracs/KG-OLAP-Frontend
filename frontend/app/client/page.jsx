"use client"


import {useSession} from "next-auth/react";

export default function ClientPage(){
    const { data: session } = useSession();

    console.log(session);

    return (
        <>
            <p1>Client</p1>
            <p>{session?.user.name}</p>
        </>
    )
}