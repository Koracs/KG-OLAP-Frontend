
import Link from "next/link";
import AuthStatus from "./authstatus";

export default function NavBar() {

    return (
        <nav className={"navBar"}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/query">Query</Link></li>
                <li><Link href="/client">Client</Link></li>
                <AuthStatus/>
            </ul>
        </nav>
    );
}