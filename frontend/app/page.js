export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <div style={{width: "70%", margin: "auto",textAlign:"justify"}}>
                <p>Big-KG OLAP is a framework for knowledge graph OLAP system, where the user can ingest vast amount of
                    data and then perform analytics query using SQL-like queries. The system is based on Knowledge
                    graphs and <strong>provide a RESTful API</strong> to allow user to ingest new data to the system and
                    query from the system. Currently, the usage of the system is done manually using RESTful API request
                    from a simple python client program. We need to create a web user interface <strong>using
                        NextJS</strong>, so the user can perform these operations at ease. The user interface should
                    satisfy the following requirements:</p>
                <br/>
                <p>✔️ <strong>Login / Authentication</strong>: The interface should provide the user with a login page,
                    and using the backend RESTful API it should allow the user to authenticate. For every request from
                    the client the UI will include the proper security header establish when the user logged in.
                </p>
                <br/>
                <p>🛠️ <strong>Provide a query IDE for the KGs</strong>: the backend allows the user to query using
                    special queries, the UI should be able to parse and validate given queries by the user, pass them on
                    the backend system and show the result upon arrival. All done via RESTful API request to the backend
                    system.</p>
                <br/>
                <p>🔜 <strong>Monitoring capabilities of the ingestion and queries activities</strong>: the backend
                    system keeps matric information about the activities of the whole system, the UI should retrieve
                    these information and display it in a nice way.</p>
            </div>
        </>
    )
}
