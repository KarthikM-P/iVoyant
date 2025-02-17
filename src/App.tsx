import { useState, useMemo } from "react";
import { flexRender, getCoreRowModel, createColumnHelper, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import DraggableColumnHeader from "./DraggableColumnHeader"; 
import datas from "../db.json"; 
import "./index.css";




const App = () => {
    const columnHelper = createColumnHelper();
    const allKeys = [...new Set(datas.flatMap(item => Object.keys(item)))];
    const [searchdata, setSearchdata] = useState('');
    const [cell, setCell] = useState({ rowIndex: null, columnId: null });
    const [data, setData] = useState(datas);
    const [columnOrder, setColumnOrder] = useState(allKeys); 
    const [pinnedColumns, setPinnedColumns] = useState({ left: [], right: [] });
    const [openDropdownId, setOpenDropdownId] = useState();

    const columns = useMemo(() =>
        columnOrder.map((key) =>
            columnHelper.accessor(key, {
                id: key,
                header: () => (
                    <div className="header-container">
                        <DraggableColumnHeader id={key} label={key} />
                        <div className="header-actions">
                            <button 
                                className="dots-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdownId(prev => prev === key ? null : key);
                                }}
                            >
                                ⋮
                            </button>
                            {openDropdownId === key && (
                                <div className="dropdown-menu">
                                    <button onClick={() => pinColumn(key, "left")}>⬅️</button>
                                    <button onClick={() => pinColumn(key, "right")}>➡️</button>
                                    <button onClick={() => pinColumn(key, "none")}>❌</button>
                                </div>
                            )}
                        </div>
                    </div>
                ),

                

                cell: ({ getValue, row }) => {
                    const isEditing = cell.rowIndex === row.index && cell.columnId === key;
                    return isEditing ? (
                        <input
                            type="text"
                            value={getValue()}
                            onChange={(e) => handleEdit(row.index, key, e.target.value)}
                            onBlur={() => setCell({ rowIndex: null, columnId: null })}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setCell({ rowIndex: row.index, columnId: key })}>
                            {getValue()}
                        </span>
                    );
                },
            })
        ), [columnOrder, cell, data,openDropdownId] 
    );

    const handleEdit = (rowIndex, columnId, newValue) => {
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: newValue };
            return updatedData;
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = columnOrder.findIndex((col) => col === active.id);
        const newIndex = columnOrder.findIndex((col) => col === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const updatedColumnOrder = arrayMove(columnOrder, oldIndex, newIndex);
            setColumnOrder(updatedColumnOrder);
        }
    };
    const pinColumn = (columnId, position) => {
        setPinnedColumns((prev) => {
            let newPinned = { left: [...prev.left], right: [...prev.right] };

            // Remove column from both left and right before reassigning
            newPinned.left = newPinned.left.filter(col => col !== columnId);
            newPinned.right = newPinned.right.filter(col => col !== columnId);

            if (position === "left") {
                newPinned.left.push(columnId);
            } else if (position === "right") {
                newPinned.right.push(columnId);
            }

            return newPinned;
        });
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        globalFilter: searchdata,
        columnPinning: pinnedColumns 
        },
        onGlobalFilterChange: setSearchdata,
        

    });

    return (
            <div className="table-container">
                <h1>GRID TABLE</h1>
                    <div className="filter-container">
                        <label className="filter-label">Filter:</label>
                        <input
                            type="text"
                            placeholder="Filter by name..."
                            value={searchdata}
                            onChange={(e) => setSearchdata(e.target.value)}
                            className="filter-input"
                        />
                    </div>
                <div className="table-wrapper">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={columnOrder}>
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
                                    {table.getRowModel().rows.map((bodys) => (
                                        <tr key={bodys.id}>
                                            {bodys.getVisibleCells().map((cell) => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        );
    };

export default App;
