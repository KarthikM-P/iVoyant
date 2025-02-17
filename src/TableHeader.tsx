import { flexRender } from "@tanstack/react-table";

const TableHeader = ({ table }) => {
    return (
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
    );
};

export default TableHeader;
