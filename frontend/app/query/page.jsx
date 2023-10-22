import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function QueryPage(){
    const session = await getServerSession(options)

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/query")
    }

    return (
        <>
            <p1>Query</p1>
            <p>{session?.user.name}</p>
        </>
    );
}