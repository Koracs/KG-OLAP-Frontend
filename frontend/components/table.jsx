"use client"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
} from "@tanstack/react-table"

const columns = [
    {
        header: 'Subject', accessorKey: 'subject'
    }, {
        header: 'Predicate', accessorKey: 'predicate'
    }, {
        header: 'Object', accessorKey: 'object'
    }, {
        header: 'Context', accessorKey: 'context'
    }]

export default function Table({data}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div>
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
                <button className={"button"} onClick={() => table.setPageIndex(0)}>First page</button>
                <button className={"button"} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                    Previous page
                </button>
                <button className={"button"} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                    Next page
                </button>
                <button className={"button"} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Last page
                </button>
            </div>
        </div>
    );
};
