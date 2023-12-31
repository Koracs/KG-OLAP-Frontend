import graph from "@/app/public/graph.svg";
import Image from "next/image";
import LandingForceGraph from "@/components/LandingForceGraph";

export default function Home() {
    return (
        <>
            <div className={"hero"}>
                <div>
                    <h1>Big-KG OLAP</h1>
                    <h2>Query Frontend</h2>
                </div>
                <Image src={graph} alt={"Graph"} width={250} height={250}/>
            </div>
            <div style={{width: "70%", margin: "auto", textAlign: "justify"}}>
                <h2>Big-KG OLAP</h2>
                <p>Big-KG OLAP is a framework for knowledge graph OLAP systems, where the user can ingest vast amount of
                    data and then perform analytics using <strong>SQL-like queries</strong>. The system is based on
                    Knowledge
                    graphs and <strong>provides a RESTful API</strong> to allow the user to ingest new data to the
                    system and
                    query from the system. <br/>
                    This frontend is a <strong>Next.js</strong> application that provides a user interface for the
                    system.</p>

                <br/>
                <br/>
                <h2>Features</h2>
                <br/>
                <h3>Login / Authentication</h3>
                <p>The interface should provide the user with a login page, and using the backend RESTful API it should
                    allow the user to authenticate. For every request from
                    the client the UI will include the proper security header establish when the user logged in.
                </p>
                <br/>
                <h3>Query IDE</h3>
                <p>The backend allows the user to query using special queries, the UI should be able to parse and
                    validate given queries by the user, pass them on
                    the backend system and show the result upon arrival. All done via RESTful API request to the backend
                    system.</p>
                <br/>
                <h3>Display Query Results</h3>
                <p>The backend system keeps matric information about the activities of the whole system, the UI should
                    retrieve
                    these information and display it in a nice way.</p>
            </div>

        </>
    )
}
