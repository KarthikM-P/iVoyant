import { flexRender } from "@tanstack/react-table";

export const TableRow = ({ row, onEdit }) => (
    <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
            <td key={cell.id} onClick={() => onEdit(cell)}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
        ))}
    </tr>
);