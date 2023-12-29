
import QueryWindow from "@/components/queryWindow";

export default async function QueryPage() {

    return (
        <>
            <div style={{height:"1.75rem",margin:"1rem"}}></div>
            <h1>Query</h1>
            <h3>Enter Query to get Data from Cube</h3>
            <br/>
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