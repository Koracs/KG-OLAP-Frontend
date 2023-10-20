import getServerSession from "next-auth/next";
import {options} from "../app/api/auth/[...nextauth]/options";
import Link from "next/link";

export default async function AuthStatus() {
    const session = await getServerSession(options);

    console.log(session.user);

    return (
        <div style={{float: "right"}}>
            <li><span>User: {session?.user}</span></li>
            <li>
                {session?.user ? <Link href="/api/auth/signout?callbackUrl=/">Sign out</Link>
                    : <Link href="/api/auth/signin">Sign in</Link>}
            </li>
        </div>
    );
}