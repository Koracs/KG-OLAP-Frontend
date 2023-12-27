"use client"
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
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
                {session? <Link href="/api/auth/signout?callbackUrl=/">Sign out</Link>
                    : <Link href="/api/auth/signin">Sign in</Link>}
            </li>
        </>
    );
}