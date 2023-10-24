export default function QueryWindow({validateQuery}) {
    return (
        <div>
            <form action={validateQuery} className={"queryWindow"}>
                <textarea name="queryInput" placeholder={"Enter Query"} rows={5}/>
                <p/>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}