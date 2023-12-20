"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
} from "@tanstack/react-table"
import {useState} from "react";

const data = [
    {
    subject: "subject1", predicate: "predicate1", object: "object1", context: "context1"
}, {
    subject: "subject2", predicate: "predicate2", object: "object2", context: "context2"
}, {
    subject: "subject3", predicate: "predicate3", object: "object3", context: "context3"
}, {
    subject: "subject4", predicate: "predicate4", object: "object4", context: "context4"
}, {
    subject: "subject5", predicate: "predicate5", object: "object5", context: "context5"
}, {
    subject: "subject6", predicate: "predicate6", object: "object6", context: "context6"
}, {
    subject: "subject7", predicate: "predicate7", object: "object7", context: "context7"
}, {
    subject: "subject8", predicate: "predicate8", object: "object8", context: "context8"
}, {
    subject: "subject9", predicate: "predicate9", object: "object9", context: "context9"
}, {
    subject: "subject10", predicate: "predicate10", object: "object10", context: "context10"
}, {
    subject: "subject11", predicate: "predicate11", object: "object11", context: "context11"
}, {
    subject: "subject12", predicate: "predicate12", object: "object12", context: "context12"
}, {
    subject: "subject13", predicate: "predicate13", object: "object13", context: "context13"
}, {
    subject: "subject14", predicate: "predicate14", object: "object14", context: "context14"
}, {
    subject: "subject15", predicate: "predicate15", object: "object15", context: "context15"
}, {
    subject: "subject16", predicate: "predicate16", object: "object16", context: "context16"
}, {
    subject: "subject17", predicate: "predicate17", object: "object17", context: "context17"
}]

const columns = [
    {
    header: 'subject', accessorKey: 'subject'
}, {
    header: 'predicate', accessorKey: 'predicate'
}, {
    header: 'object', accessorKey: 'object'
}, {
    header: 'context', accessorKey: 'context'
}]

export default function QueryTable() {
    const [filtering, setFilerting] = useState("");
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering
        },
        onGlobalFilterChange: setFilerting
    });

    return (
        <div>
        <input value={filtering} onChange={e => setFilerting(e.target.value)}/>
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (<tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {header.isPlaceholder ? null : (
                            <div>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>)}
                    </th>))}
            </tr>))}
            </thead>

            <tbody>
            {table.getRowModel().rows.map(row => (<tr key={row.id}>
                {row.getVisibleCells().map(cell => (<td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>))}
            </tr>))}
            </tbody>
        </table>
        <div>
            <button onClick={() => table.setPageIndex(0)}>First page</button>
            <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                Previous page
            </button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                Next page
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                Last page
            </button>
        </div>
    </div>
    );
};
