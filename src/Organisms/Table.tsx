/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender } from "@tanstack/react-table";
import { TableRow } from "./TableRow";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

interface TableProps {
    table: any;
    onEdit: any;
    onRowReorder: any;
}
export const Table = ({ table, onEdit, onRowReorder }: TableProps) => {
    const rows = table.getRowModel().rows;

    const handleRowDragEnd = (event: { active: any; over: any; }) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = rows.findIndex((row: { id: any; }) => row.id === active.id);
        const newIndex = rows.findIndex((row: { id: any; }) => row.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            onRowReorder(oldIndex, newIndex);
        }
    };


    return (
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
            <DndContext collisionDetection={closestCenter} onDragEnd={handleRowDragEnd}>
                <SortableContext items={rows.map((row: { id: any; }) => row.id)}>
                    <tbody>
                        {rows.map((row: unknown) => (
                            <TableRow key={row.id} row={row} onEdit={onEdit} />
                        ))}
                    </tbody>
                </SortableContext>
            </DndContext>
        </table>
    );
};
