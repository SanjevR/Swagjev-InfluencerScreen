import React, {useEffect, useState} from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import TableComponent from "../reactTable/tableComponet.jsx";
import "../styles/reactTable.css"
import {faMaximize, faMinimize, faRotateRight, faSquareFull} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlaceholderContainer from "../placeHolderContainer.jsx";


const TableGridRecords = ({ tableData }) => {
    const [maximizedTables, setMaximizedTables] = useState([]);

    useEffect(() => {
        setMaximizedTables(tableData.map((_, index) => index));
        },
        [tableData]);

    const handleTitleClick = (index) => {
        setMaximizedTables((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };
    console.log(tableData)
    const ResetButton= () => {
        return (
            <button className="reset-button" onClick={() => setMaximizedTables([])}>
                <FontAwesomeIcon icon={faRotateRight}
                                 size="2xl"
                                 mask={faSquareFull}
                                 style={{
                                     fontSize: '24px',
                                     color: "#ffffff",
                                     backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                 }}/>
            </button>
        )
    }

    const springConfig = { stiffness: 200, damping: 26 };



    return (
        <Flipper flipKey={maximizedTables.join(",")} spring={springConfig} >
            <div className="tables-grid">
                {tableData.map((data, index) => (
                    <Flipped flipId={`element-${index}`} key={index} stagger>
                        <div
                            className={`table-wrapper ${
                                maximizedTables.includes(index) ? "maximized" : "default"
                            }`}
                        >
                            <button
                                className="table-title"
                                onClick={() => handleTitleClick(index)}
                            >
                                {data.title}
                                <span className="span-icon">
                                {maximizedTables.includes(index) ?
                                    <FontAwesomeIcon icon={faMinimize} size="xl" mask={faSquareFull}
                                                     style={{
                                                         fontSize: '24px',
                                                         color: "#ffffff",
                                                         backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                                     }}/>:
                                    <FontAwesomeIcon icon={faMaximize} size="xl" mask={faSquareFull}
                                                     style={{
                                                         fontSize: '24px',
                                                         color: "#ffffff",
                                                         backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                                     }}/>}
                               </span>
                            </button>
                            <div
                                className={`table-content ${
                                    maximizedTables.includes(index) || maximizedTables.length === 0
                                        ? "show"
                                        : "hide"
                                }`}
                            >
                                {data.values && data.values.length < 1 ?
                                    <PlaceholderContainer/> :
                                <TableComponent
                                    columnProps={data.columnProps}
                                    tableData={data.values}
                                    editButtons={false}
                                    features={<ResetButton/>}
                                    subtotalColumns={data.subtotalColumns}
                                />
                                }
                            </div>
                        </div>
                    </Flipped>
                ))}
            </div>
        </Flipper>

    );
};

export default TableGridRecords;


