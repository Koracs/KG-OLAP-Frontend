import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
export default async function QueryPage(){
    const session = await getServerSession(options)

    if(!session){
        console.log("No session");
    }

    return (
        <>
            <p1>Query</p1>
            <p>{session?.user.name}</p>
        </>
    );
}