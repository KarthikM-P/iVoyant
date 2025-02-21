
import { Filter } from "../Molecules/Filter";
import { Table } from "../Organisms/Table";


export const TableTemplate = ({  table, searchdata,  onSearchChange,  onEdit,  onRowReorder, handleFileUpload, exportToExcel }) => {
    // console.log("TableTemplate Props:", { table, searchdata, onEdit, onRowReorder, handleFileUpload });
    return (
        <div className="table-container">
            <h1>GRID TABLE</h1>
            <Filter value={searchdata} onChange={onSearchChange} />
            <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleFileUpload} 
                style={{ margin: '10px 0' }}
            />
            <button onClick={exportToExcel}>Export to Excel</button>
           
            <div className="table-wrapper">
                <Table table={table} onEdit={onEdit} onRowReorder={onRowReorder} />
            </div>
        </div>
    );
};
