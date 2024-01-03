import Link from "next/link";
import AuthStatus from "./authstatus";
import ThemeChanger from "./themechanger";

export default function NavBar() {

    return (
        <nav className={"navBar"}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/query">Query</Link></li>
                <li><Link href="/results">Query Results</Link></li>
                <div style={{float: "right"}}>
                    <ThemeChanger/>
                    <AuthStatus/>
                </div>
            </ul>

        </nav>
    );
}