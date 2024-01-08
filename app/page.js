import LandingGraph from "@/components/landingpage/LandingGraph";
import AuthStatus from "@/components/ui/AuthStatus";
import LandingCodeEditor from "@/components/landingpage/LandingCodeEditor";
import LandingResultItem from "@/components/landingpage/LandingResultItem";

export default function Home() {
    return (
        <>
            <div className={"hero"}>
                <div>
                    <h1>Big-KG OLAP</h1>
                    <h2>Query Frontend</h2>
                </div>
                <LandingGraph/>
            </div>
            <div style={{width: "60%", margin: "auto", textAlign: "justify"}}>
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
                <p>This Application uses <strong>Keycloak</strong> as an authentication server.
                    Through <strong>NextAuth.js</strong>, the user can login
                    to create a Keycloak session and then use the application.
                </p>
                <br/>
                <div className={"navBar"} style={{margin: "auto", width: "fit-content"}}>
                    <ul>
                        <AuthStatus/>
                    </ul>
                </div>
                <br/>
                <h3>Query IDE</h3>
                <p>The KG-OLAP backend allows the user to query using <strong>SQL-Like queries</strong>.
                    Through this frontend application, queries are parsed, validated and passed on to the backend
                    system.
                    These results are then stored in a <strong>Redis cache</strong> and displayed upon arrival.
                </p>
                <br/>
                    <LandingCodeEditor/>
                <br/>
                <h3>Display Query Results</h3>
                <p>After receiving a query, the backend system returns the requested data and information such as
                    performance timestamps and result file sizes.
                    These results are displayed in various ways.
                    <br/>
                    The user can view the results in a <strong>table</strong>, list the <strong>contexts of the
                        results</strong>, or view the results of a
                    given context as a <strong>graph</strong>. The graph is rendered using <strong>D3.js</strong> and
                    is <strong>pre-rendered on the server</strong>.
                    The result metrics are also displayed to the user.
                    <br/>
                    The results, which are stored in a <strong>Redis cache</strong>, can
                    be <strong>re-executed</strong> with the original query to view the newest results again.
                </p>
                <br/>
                <LandingResultItem/>
            </div>

        </>
    )
}
