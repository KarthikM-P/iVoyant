import { flexRender } from "@tanstack/react-table";

const TableBody = ({ table }) => {
    return (
        <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;


getFilteredRowModel: getFilteredRowModel(), 
        state: {
          globalFilter: searchdata, 
        },
        onGlobalFilterChange: setSearchdata,
