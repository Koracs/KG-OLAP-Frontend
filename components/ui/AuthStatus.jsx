"use client"
import {signIn, signOut, useSession} from "next-auth/react";
import {useEffect} from "react";

export default function AuthStatus() {
    const {data: session, status } = useSession();

    useEffect(() => {
        if (
            status !== "loading" &&
            session &&
            session?.error === "RefreshAccessTokenError"
        ) {
            signOut({ callbackUrl: "/" });
        }
    }, [session, status]);

    if(status === "loading") return (<li><span>Loading</span></li>)
    else return (
        <>
            {session? <li><span> {session?.user.name}</span></li> : <></>}
            <li>
                {session? <button className={"auth-status"} onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
                    : <button className={"auth-status"} onClick={() => signIn("keycloak")}>Sign in</button>}
            </li>
        </>
    );
}