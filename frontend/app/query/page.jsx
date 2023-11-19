import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import QueryWindow from "./queryWindow";
import QueryTable from "./queryTable";

export default async function QueryPage() {
    const session = await getServerSession(options)

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/query")
    }

    return (
        <>
            <h1>Query</h1>
            <QueryWindow/>
            <br/>
            <QueryTable/>
            <br/>
            <h2>Example Queries</h2>
            <ul style={{fontSize:"small"}}>
                <li>SELECT * ROLLUP ON topic_all, location_all, time_all</li>
                <li>SELECT time_month=2021-05 AND location_location=LOWS</li>
                <li>SELECT time_year=2021 AND location_fir=EDMM AND topic_family=FlightRestrictions ROLLUP ON time_all, location_fir</li>
                <li>SELECT time_day=2021-12-01 AND location_territory=Germany ROLLUP ON location_fir, topic_all</li>
            </ul>
        </>
    );
}