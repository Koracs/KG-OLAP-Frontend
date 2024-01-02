import graph from "@/app/public/graph.svg";
import Image from "next/image";

export default function LandingGraph() {

    return (
        <Image src={graph} alt={"Graph"} width={250} height={250}/>
    )
}