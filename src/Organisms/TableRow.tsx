import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";

export const TableRow = ({ row, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: row.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
    };

    return (
        <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id} onClick={() => onEdit(cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
            
        </tr>
    );
};