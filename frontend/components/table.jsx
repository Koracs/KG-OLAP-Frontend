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
        header: 'subject', accessorKey: 'subject'
    }, {
        header: 'predicate', accessorKey: 'predicate'
    }, {
        header: 'object', accessorKey: 'object'
    }, {
        header: 'context', accessorKey: 'context'
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
