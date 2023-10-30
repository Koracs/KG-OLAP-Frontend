import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import QueryWindow from "../../components/queryWindow";

export default async function QueryPage(){
    const session = await getServerSession(options)

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/query")
    }

    async function validateQuery(query) {
        "use server"

        const text = query.get("queryInput")?.valueOf();
        const match = text.match(/^SELECT((\s\*)|(?:\s\w+=[^\s]+)(?:\sAND\s\w+=[^\s]+)*)(\sROLLUP ON(\s\w+)((,\s\w+)+))?/)

        console.log(match)
    }

    return (
        <>
            <h1>Query</h1>
            <p>{session?.user.name}</p>
            <QueryWindow validateQuery={validateQuery}/>
        </>
    );
}