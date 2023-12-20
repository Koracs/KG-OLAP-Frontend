import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import QueryWindow from "../../components/queryWindow";
import { readFile } from 'fs/promises';

export default async function QueryPage() {
    const session = await getServerSession(options)

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/query")
    }
    const fileData = JSON.parse(await readFile("./testData/1.json", "utf8"));

    return (
        <>
            <h1>Query</h1>
            <QueryWindow/>
            <br/>
            <h2>Example Queries (small to large)</h2>
            <ul style={{fontSize:"small"}}>
                <li>SELECT time_month=2000-01 AND location_territory=France ROLLUP ON topic_all, location_all, time_all</li>
                <li>SELECT time_month=2000-02 ROLLUP ON time_all</li>
                <li>SELECT time_year=2000 AND location_fir=LOVV AND topic_category=Routes ROLLUP ON topic_category, location_location, time_month</li>
            </ul>
        </>
    );
}