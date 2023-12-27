import {fetchFilteredQuads} from "@/app/lib/data";

export default async function ResultTable({uuid, query, currentPage}){
    const quads = await fetchFilteredQuads(uuid, query, currentPage);

    return (
        <table>
            <thead>
            <tr>
                <th>Subject</th>
                <th>Predicate</th>
                <th>Object</th>
                <th>Context</th>
            </tr>
            </thead>
            <tbody>
            {quads.map((item) => {
                return (
                    <tr key={item.subject + item.predicate + item.object + item.context}>
                        <td>{item.subject}</td>
                        <td>{item.predicate}</td>
                        <td>{item.object}</td>
                        <td>{item.context}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}