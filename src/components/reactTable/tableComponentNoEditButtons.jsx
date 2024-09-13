import React, {useMemo, useState, useEffect, useRef} from "react";
import {useExpanded, useGroupBy, useSortBy, useTable, useFilters, useGlobalFilter} from "react-table";
import {IconContext} from "react-icons";
import {BsArrowRight, BsArrow90DegDown} from "react-icons/bs";
import {RxDotsVertical} from "react-icons/rx";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup,
    IoMdArrowDropright,
} from "react-icons/io";
import {
    faCheck,
    faFilter,
    faPenToSquare,
    faPlus,
    faSort, faSortDown,
    faSortUp,
    faTrashCan,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import "../styles/reactTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CheckboxFilter from "./CheckboxFilter";
import {handleSaveEdit, handleSaveNewRow} from "./handleTableButtons";
import {ConfirmDialog} from "../confirmDialogComponent.jsx";



export default function TableComponentNoEditButtons({columnProps, tableData, setTableData, editButtons, features, crudFns, tableTitle}) {

    const [editingRowIndex, setEditingRowIndex] = useState(null);
    const [newRow, setNewRow] = useState(null);
    const [isFilterOpen, setFilterOpen] = useState({});
    const [activeFilters, setActiveFilters] = useState({});
    const filterMenuRef = useRef(null);
    console.log("tableComponent", tableTitle)
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

    const handleAdd = () => {
        const newEmptyRow = tableData.length > 0
            ? Object.keys(tableData[0]).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {})
            : {};
        setNewRow(newEmptyRow);
    };


    const handleEdit = (index) => {
        setEditingRowIndex(index);
    };


    const handleChange = (index, key, value) => {
        setTableData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index][key] = value;
            return updatedData;
        });
    };

    const data = useMemo(() => {
        return (tableData)
    }, [tableData]);

    const columns = useMemo(() => {
        if (columnProps == undefined || columnProps.length === 0)
            return [];

        return columnProps.map((item) => {
            return {
                Header: item.title.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(),
                accessor: item.name,
                Filter: CheckboxFilter,
                filter: 'includes',
            };
        });

    }, [columnProps]);

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
            border: '1px solid #DDD',
        },
        tableHeaderColumnText: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 16px',
        },
        tableFixedHeaderColumn: {
            textAlign: 'center',
            fontWeight: 'bolder',
        },
    };


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

                                <IconContext.Provider value={{color: '#333'}}>
                                    <div className="header-container">
                                        <div className="group-container">
                                            {column.canGroupBy ? (
                                                <span {...column.getGroupByToggleProps()}>
                                                  {column.isGrouped ? <BsArrowRight/> : <BsArrow90DegDown/>}
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
                                                    <div ref={filterMenuRef} className="filter-list">
                                                        <button className="clear-filter-button"
                                                                onClick={() => handleFilterChange(column.id, '')}>Clear
                                                        </button>
                                                        {column.render('Filter')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </IconContext.Provider>

                            </th>
                        ))}
                        {editButtons ? (
                            <th className="fixed-column-header normalTableHeader"
                                style={tableStyle.tableFixedHeaderColumn}>
                                ACTIONS
                            </th>
                        ) : null}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr tabIndex={1} key={'row' + i} {...row.getRowProps()}>
                            {row.cells.map((cell, j) => (
                                <td className="react-table-td" key={'cell' + j} {...cell.getCellProps()}>
                                    {editingRowIndex === i ? (

                                        <input
                                            className="input-table"
                                            type="text"
                                            value={tableData[i][cell.column.id] || ''}
                                            onChange={(e) => handleChange(i, cell.column.id, e.target.value)}
                                            disabled={j === 0}
                                        />

                                    ) : cell.isGrouped ? (
                                        <>
                        <span className="input-border" {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? <IoMdArrowDropright/> : <IoMdArrowDropdown/>}
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
                                    {editingRowIndex === i ? (
                                        <>
                                            <button className="button-edit"
                                                // onClick={() => handleSaveEdit(editingRowIndex, url.edit, setTableData, setEditingRowIndex, tableData)}>
                                                    onClick={() => {
                                                        crudFns({
                                                            id: i, action: "edit", entity: tableTitle,
                                                            formData: tableData[editingRowIndex],
                                                            buttonStyles: {
                                                                acceptButton: {
                                                                    text: "Add",
                                                                    className: "accept-option-confirmDialog",
                                                                },
                                                                cancelButton: {
                                                                    text: "Cancel",
                                                                    className: "cancel-option-confirmDialog"
                                                                }
                                                            }
                                                        });
                                                        setEditingRowIndex(null);
                                                    }}>
                                                <FontAwesomeIcon icon={faCheck} size="lg"
                                                                 style={{color: "#4CAF50",}}/>
                                            </button>
                                            <button className="button-del"
                                                    onClick={() => setEditingRowIndex(null)}>
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
                                            <button className="button-edit" onClick={() => handleEdit(i)}>
                                                <FontAwesomeIcon icon={faPenToSquare} style={{color: '#4CAF50'}} size="lg"/>
                                            </button>
                                            <button className="button-del"
                                                    onClick={() => crudFns({
                                                            id: i, action: "delete", entity: tableTitle,
                                                            buttonStyles: {
                                                                acceptButton: {
                                                                    text: "Delete",
                                                                    className: "delete-option-confirmDialog",
                                                                },
                                                                cancelButton: {
                                                                    text: "Cancel",
                                                                    className: "cancel-option-confirmDialog"
                                                                }
                                                            }
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
                    <tr>
                        {Object.keys(newRow).map((key, index) => (
                            <td key={index}>
                                <input
                                    className="input-table"
                                    value={newRow[key]}
                                    name={key}
                                    onChange={(e) => setNewRow({...newRow, [key]: e.target.value})}
                                />

                            </td>
                        ))}
                        <td className="fixed-column">
                            <button className="button-edit"
                                // onClick={() => handleSaveNewRow(newRow, url.add, setTableData, setNewRow)}>
                                    onClick={() => crudFns({
                                            id: null, action: "add", entity: tableTitle,
                                            formData: newRow,
                                            buttonStyles: {
                                                acceptButton: {
                                                    text: "Add",
                                                    className: "accept-option-confirmDialog",
                                                },
                                                cancelButton: {
                                                    text: "Cancel",
                                                    className: "cancel-option-confirmDialog"
                                                }
                                            }
                                        }
                                    )}>
                                <FontAwesomeIcon icon={faCheck} size="lg" style={{color: '#4CAF50'}}/>
                            </button>
                            <button className="button-del" onClick={() => setNewRow(null)}>
                                <FontAwesomeIcon icon={faXmark} size="lg" style={{color: '#f44336'}}/>
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

        </div>
    );
}















