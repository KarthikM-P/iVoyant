import { CSS } from "@dnd-kit/utilities";
import { useSortable} from "@dnd-kit/sortable";

const DraggableColumnHeader = ({ id, label }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    return (
        <span ref={setNodeRef} style={{transform: CSS.Transform.toString(transform), transition, cursor: "grab", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",}} {...attributes} {...listeners}>
            {label} 
        </span>
    );
};

export default DraggableColumnHeader;
