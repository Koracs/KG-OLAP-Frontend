export default function LandingResultItem() {
    const uuid = "My-Latest-Query-Result";
    const queryText = "SELECT time_month=2000-01 AND location_territory=France ROLLUP ON topic_all, location_all, time_all";

    return (
        <div className={"resultitem-container"}>
            <span className={"resultitem-uuid"} href={`/results/${uuid}`}>{uuid}</span>
            <span className={"resultitem-queryText"}><b>Query:</b> {queryText}</span>
            <span className={"resultitem-lastUpdate"}><b>Last Update:</b> {Date.now().toLocaleString()}</span>
            <button className={"button resultitem-table"}>Show Table</button>
            <button className={"button resultitem-contexts"}>Show Contexts</button>
            <button className={"button resultitem-metrics"}>Show Metrics</button>
            <button className={"button resultitem-rerun"}>Re-Run Query</button>
            <button className={"button error-button resultitem-delete"}>Delete</button>
        </div>
    )
}