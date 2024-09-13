import React, {useMemo, useState, useEffect, useRef, useCallback} from "react";
import {useExpanded, useGroupBy, useSortBy, useTable, useFilters, useGlobalFilter, getTableProps, getTableBodyProps} from "react-table";
import {
    faCheck,
    faFilter,
    faPenToSquare,
    faPlus, faRightFromBracket, faRightToBracket,
    faSort, faSortDown,
    faSortUp,
    faTrashCan,
    faXmark,
    faChevronDown, faFilterCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import "../styles/reactTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CheckboxFilter from "./CheckboxFilter";
import {handleGenerateId, handleSaveEdit, handleSaveNewRow} from "./handleTableButtons";
import {ConfirmDialog} from "../confirmDialogComponent.jsx";
import {EditRow, NewRow} from "./RowInput.jsx";



export default function SourceTargetTableComponent({columns, data, features}) {

    const [editingRowId, setEditingRowId] = useState(null);
    const [newRow, setNewRow] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [isFilterOpen, setFilterOpen] = useState({});
    const [activeFilters, setActiveFilters] = useState({});
    const filterMenuRef = useRef(null);

    console.log("source and target tableComponent")

    const aggregateFunctions = {
        sum: (values) => values.reduce((sum, value) => sum + (value || 0), 0),
        total: (values) => values.reduce((total, value) => total + (value || 0), 0),
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
                setFilterOpen((prev) => {
                    const updatedFilterOpen = {...prev};
                    Object.keys(updatedFilterOpen).forEach((key) => {
                        updatedFilterOpen[key] = false;
                    });
                    return updatedFilterOpen;
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleFilter = (columnId) => {
        setFilterOpen((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };

    

    

    const defaultColumn = useMemo(() => ({
        Filter: CheckboxFilter,
    }), []);

    const filterTypes = useMemo(() => ({
        includes: (rows, id, filterValue) => {
            if (filterValue.length === 0) return rows;
            return rows.filter(row => filterValue.includes(row.values[id]));
        },
    }), []);

    const getFilterValue = (columnId) => {
        return filters.find(filter => filter.id === columnId)?.value || '';
    };
    const handleFilterChange = (columnId, filterValue) => {
        tableInstance.setFilter(columnId, filterValue || undefined);
        if (filterValue) {
            setActiveFilters((prev) => ({...prev, [columnId]: filterValue,}));
        } else {
            setActiveFilters((prev) => {
                const {[columnId]: _, ...rest} = prev;
                return rest;
            });
        }
    };

    const handleOnChange = (rowId, columnName, newValue) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [rowId]:{
                ...prevValues[rowId],
                [columnName]: newValue
            }
        }));
    }

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        filterTypes,
    }, useFilters, useGlobalFilter, useGroupBy, useSortBy, useExpanded);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        state: {filters},

    } = tableInstance;


    const tableStyle = {
        tableHeader: {
            width: '150px',
            fontWeight: 'normal',
            textAlign: 'left',
            margin: 'none',

        },
        tableHeaderColumnText: {
            width: '100%',
            display: 'flex',
            minHeight: '24px',
            alignItems: 'center',
            flexDirection:'row',
        },
        tableFixedHeaderColumn: {
            textAlign: 'center',
            fontWeight: 'bolder',
        },
    };


    const calculateTotals = (data, columns) => {
        const totals = {};

        columns.forEach(column => {
            if (subtotalColumns.includes(column.accessor)) {
                console.log(`Calculating total for column ${column.accessor}`);

                const columnValues = data.map(row => {
                    const value = row[column.accessor] !== undefined ? row[column.accessor] : 0;
                    return parseFloat(value) || 0;
                });

                console.log(`Column values: ${columnValues}`);

                totals[column.accessor] = aggregateFunctions.sum(columnValues);
            }
        });

        console.log(`Totals: ${JSON.stringify(totals)}`);
        return totals;
    };


    const totals = calculateTotals(data, columns);


    return (
        <div className="table-container">
            <div className="search-reset-container">
                <input
                    className="input-table-filter"
                    value={state.globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value || undefined)}
                    placeholder="Search all columns"
                />
                {features}
            </div>
            <table {...getTableProps()} className="reactTable">
                <thead className="reactTableHeader">
                {headerGroups.map((headerGroup, i) => (
                    <tr key={'headerGroup' + i} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, i) => (
                            <th
                                tabIndex={1}
                                key={'column' + i}
                                style={tableStyle.tableHeader}
                                {...column.getHeaderProps()}
                                className={`${(column.isGrouped || column.isSorted ||
                                    isFilterOpen[column.id] || getFilterValue(column.id)) ?
                                    'activeTableHeader' : 'normalTableHeader'}`}
                            >
                                    <div className="header-container">
                                        <div className="group-container">
                                            {column.canGroupBy ? (
                                                <span {...column.getGroupByToggleProps()}>
                                                  {column.isGrouped ?  <FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{color: "#4f4f4f",}} />:
                                                                       <FontAwesomeIcon icon={faRightToBracket} size="lg" rotation={180} style={{color: "#4f4f4f",}} />}

                                                </span>
                                            ) : null}
                                        </div>
                                        <div
                                            className="header-column-container"
                                            {...column.getSortByToggleProps()}
                                            style={tableStyle.tableHeaderColumnText}
                                        >
                                            <div
                                                style={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    minWidth: '90px',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {column.render('Header')}
                                            </div>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <FontAwesomeIcon icon={faSortDown}
                                                                     size="lg"
                                                                     style={{color: "#4f4f4f",}}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon icon={faSortUp}
                                                                     size="lg"
                                                                     style={{color: "#4f4f4f",}}
                                                    />
                                                )
                                            ) : (
                                                <FontAwesomeIcon icon={faSort}
                                                                 size="lg"
                                                                 style={{color: "#4f4f4f",}}
                                                />
                                            )}
                                        </div>
                                        <div className="filter-container">
                                            <div className="table-filter-parent">
                                                    <span className="filter-icon"
                                                          onClick={() => toggleFilter(column.id)
                                                          }>
                                                     {getFilterValue(column.id) || isFilterOpen[column.id] ?
                                                         <FontAwesomeIcon icon={faFilter}
                                                                          size="lg"
                                                                          style={{color: "#1b73b6",}}
                                                         /> :
                                                         <FontAwesomeIcon icon={faFilter}
                                                                          size="lg"
                                                                          style={{color: "#4f4f4f"}}/>
                                                     }
                                                    </span>
                                                {isFilterOpen[column.id] && (
                                                    <div ref={filterMenuRef} className="filter-list"  style={{zIndex: "9999", position:"absolute"}}>
                                                        <button className="clear-filter-button"
                                                                onClick={() => handleFilterChange(column.id, '')}><FontAwesomeIcon icon={faFilterCircleXmark} size="xl" style={{color: "#4f4f4f",}} />
                                                        </button>
                                                        {column.render('Filter')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                            </th>
                        ))}
                        {editButtons ? (
                            <th className="fixed-column-header normalTableHeader"
                                style={tableStyle.tableFixedHeaderColumn}>
                                Actions
                            </th>
                        ) : null}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr className={editingRowId === row.values[idProperty] ? "input-row reactTable-row" : "reactTable-row"} tabIndex={1} key={'row' + i} {...row.getRowProps()}>
                            {row.cells.map((cell, j) => (
                                <td className="react-table-td" key={'cell' + j} {...cell.getCellProps()}>
                                    {editingRowId === row.values[idProperty] ? (
                                        <EditRow
                                            rowId={row.values[idProperty]}
                                            columnName={cell.column.id}
                                            value={tableData[i][cell.column.id]}
                                            prevData={row.values}
                                            idProperty={idProperty}
                                            onChange={handleOnChange}
                                        />

                                    ) : cell.isGrouped ? (
                                        <>
                        <span className="input-border" {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? <FontAwesomeIcon icon={faChevronDown} rotation={270} size="sm" style={{color: "#4f4f4f",}} /> :
                                            <FontAwesomeIcon icon={faChevronDown} size="sm" style={{color: "#4f4f4f",}} />}
                        </span>
                                        {cell.render('Cell')} ({row.subRows.length})
                                        </>
                                    ) : cell.isAggregated ? (
                                        cell.render('Aggregated')
                                    ) : cell.isPlaceholder ? null : (
                                        cell.render('Cell')
                                    )}
                                </td>
                            ))}

                            {editButtons ? (
                                <td className="fixed-column">
                                    {editingRowId === row.values[idProperty] ? (
                                        <>
                                            <button className="button-edit"
                                                    onClick={handleOnSave}>
                                                <FontAwesomeIcon icon={faCheck} size="lg"
                                                                 style={{color: "#4CAF50",}}/>
                                            </button>
                                            <button className="button-del"
                                                    onClick={() => setEditingRowId(null)}>
                                                <FontAwesomeIcon icon={faXmark} size="lg"
                                                                 style={{color: "#f44336",}}/>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="button-add" onClick={() => handleAdd()}>
                                                <FontAwesomeIcon icon={faPlus} size="lg"
                                                                 style={{color: '#007bff'}}/>
                                            </button>
                                            <button className="button-edit" onClick={() => {
                                                setEditingRowId(row.values[idProperty]);
                                            }}>
                                                <FontAwesomeIcon icon={faPenToSquare} style={{color: '#4CAF50'}} size="lg"/>
                                            </button>
                                            <button className="button-del"
                                                    onClick={() => crudFns({
                                                            id: row.values[idProperty], action: "delete", idProperty: idProperty,

                                                        }
                                                    )}>
                                                <FontAwesomeIcon icon={faTrashCan} style={{color: '#f44336'}}
                                                                 size="lg"/>
                                            </button>

                                        </>
                                    )}
                                </td>
                            ) : null}
                        </tr>

                    );
                })}
                {newRow && (
                        <NewRow newRow={newRow} setNewRow={setNewRow} crudFns={crudFns} tableTitle={idProperty}/>

                        )
                }
                {(subtotalColumns.length > 0) && (
                    <tr className="total-row">
                        {(() => {
                            const firstSubtotalIndex = columns.findIndex(col => subtotalColumns.includes(col.accessor));
                            let cells = [];
                            cells.push(
                                <td
                                    key="total"
                                    colSpan={firstSubtotalIndex}
                                    style={{textAlign: 'left', fontWeight: 'bold'}}
                                >
                                    Total
                                </td>
                            );

                            columns.forEach((column, index) => {
                                if (subtotalColumns.includes(column.accessor)) {
                                    cells.push(
                                        <td key={index} className="totals-cell" style={{fontWeight: 'bold'}}>
                                            {totals[column.accessor] != null ? totals[column.accessor].toFixed(2) : '0.00'}
                                        </td>
                                    );
                                }
                            });
                            return cells;
                        })()}
                    </tr>
                )}
                </tbody>
            </table>

        </div>
    );
}















