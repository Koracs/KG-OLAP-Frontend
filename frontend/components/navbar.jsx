"use client"

import Link from "next/link";
import AuthStatus from "./authstatus";
import {usePathname} from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className={"navBar"}>
            <ul>
                <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link></li>
                <li><Link className={`link ${pathname === '/query' ? 'active' : ''}`} href="/query">Query</Link></li>
            </ul>
        </nav>
    );
}