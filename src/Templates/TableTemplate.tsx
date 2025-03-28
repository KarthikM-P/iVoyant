/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Filter } from "../Molecules/Filter";
import { Table } from "../Organisms/Table";
import Header from "../Molecules/Header";
import MainContent from "../Molecules/MainContent";

export const TableTemplate = ({ table, searchdata, onSearchChange, onEdit, onRowReorder, handleFileUpload, exportToData,}: any) => {
    const [switching, setswitching] = useState('json');
    

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileUpload({ target: { files: acceptedFiles } });
        }
    }, [handleFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".json, .xlsx, .xls, .csv",
    });

    function switchs() {
        setswitching((prevFormat) =>
            prevFormat === "json" ? "excel" : prevFormat === "excel" ? "csv" : "json"
        );
    }

    return (
        <div className="bg-blue-900 text-white">
            <Header />
            <div className="table-container">
                <MainContent switching={switching} />
                
                {/* Drag and Drop Zone */}
                <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer bg-gray-800 rounded-md">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-200">Drop the file here...</p>
                    ) : (
                        <p className="text-gray-400">Drag & drop a JSON, Excel, or CSV file here, or click to select</p>
                    )}
                </div>

                <div className="flex justify-between min-w-4/12">
                    <button onClick={switchs} className="bg-white text-blue-800 px-4 py-2 rounded font-bold">Change format </button>
                    <button
                    className="bg-blue-900 text-white px-4 py-2 rounded flex items-center space-x-2 border-dashed border-2 border-gray-300"
                    onClick={() => exportToData(switching)}
                >
                    Export as {switching.toUpperCase()}
                </button>
                </div>
                <div className="w-full px-24">
                    <Filter value={searchdata} onChange={onSearchChange} />
                </div>
                <div className="table-wrapper ">
                    <Table table={table} onEdit={onEdit} onRowReorder={onRowReorder} />
                </div>
                {/* <MainContent switching={switching}/> */}
            </div>
        </div>
    );
};
