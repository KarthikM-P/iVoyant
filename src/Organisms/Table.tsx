import { flexRender } from "@tanstack/react-table";
// import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export const Table = ({ table, onEdit }) => (
    <table className="custom-table">
        <thead>
            {table.getHeaderGroups().map((header) => (
                <tr key={header.id}>
                    {header.headers.map((head) => (
                        <th key={head.id}>
                            {flexRender(head.column.columnDef.header, head.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} row={row} onEdit={onEdit} />
            ))}
        </tbody>
    </table>
);