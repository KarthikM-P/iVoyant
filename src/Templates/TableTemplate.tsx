
import { useState } from "react";
import { Filter } from "../Molecules/Filter";
import { Table } from "../Organisms/Table";


export const TableTemplate = ({  table, searchdata,  onSearchChange,  onEdit,  onRowReorder, handleFileUpload, exportToData }) => {
    
    const [switching, setswitching] = useState(false);

    function switchs(){
        setswitching(!switching);
    }
    return (
        <div className="table-container">
            <h1>GRID TABLE</h1>
            <Filter value={searchdata} onChange={onSearchChange} />
            <span>
                {switching ? (
                    <div>
                    <h2>Excel file</h2>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{ margin: '10px 0' }} />
                    <button onClick={() => exportToData("excel")}>Export as excel</button>
                    </div>
                ) : (
                    <div>
                    <h2>Json file</h2>
                    <input type="file" accept=".json" onChange={handleFileUpload} style={{ margin: '10px 0' }} />
                    <button onClick={() => exportToData("json")}>Export as json</button>
                    </div>
                )}
            </span>
            <button onClick={switchs}>change file format</button>
           
            <div className="table-wrapper">
                <Table table={table} onEdit={onEdit} onRowReorder={onRowReorder} />
            </div>
        </div>
    );
};
