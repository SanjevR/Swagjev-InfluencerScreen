import React, {useMemo, useState, ReactNode} from "react";
import {ColumnDef, ColumnFiltersState, filterFns, flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getSortedRowModel, GroupingState, Row, SortingState, useReactTable} from "@tanstack/react-table";
import {
    faSort, faSortDown,
    faSortUp,
    faRightToBracket,
    faRightFromBracket,
    faUpLong,
    faDownLong,
    faFilterCircleXmark,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import "../styles/reactTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactTableColumns } from "../../scripts/interfaces";
import FilterDialog from "./filterDialog";

const tableStyle: TableComponentStyles = {
    tableHeader: {
        width: '150px',
        fontWeight: 'normal',
        textAlign: 'left',
        margin: 'none',
        border: '1px solid #ccc',
    },
    tableHeaderWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr 1fr",
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
    tableHeaderLegend: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        minWidth: '90px',
        textOverflow: 'ellipsis',
    }
};

interface TableComponentProps<D>{
    columns: ReactTableColumns[];
    data: D[];
    editButtons: boolean;
    features: ReactNode | undefined;
}

type TableComponentStyles = {
    tableHeader: React.CSSProperties;
    tableHeaderWrapper: React.CSSProperties;
    tableHeaderLegend: React.CSSProperties;
    tableHeaderColumnText: React.CSSProperties;
    tableFixedHeaderColumn: React.CSSProperties;
}


export default function TableComponent<D>(props: TableComponentProps<D>) {

    const columns = useMemo<ColumnDef<D, {accessorKey: string; accessorHeader: string}>[]>(() => (props.columns.map((item)=>({
        accessorKey: item.accessorKey, 
        accessorHeader: item.header,
    }))), [props.columns]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [grouping, setGrouping] = React.useState<GroupingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        columns: columns,
        data: props.data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            grouping,
            columnFilters,
        },
        onSortingChange: setSorting,
        onGroupingChange: setGrouping,
        onColumnFiltersChange: setColumnFilters,
        filterFns: {
            stdCustomFilter: (row: Row<D>, columnId: string, filterValue: string[] | number[])=> {
                let result = false;
                for (let i = 0; i < filterValue.length; i++){
                    if (row.getValue<string | number>(columnId).toString() === filterValue[i].toString()){
                        result = true;
                        break;
                    }
                }
                return result;
            } 
        },
        defaultColumn:{
            //filterFn: 'stdCustomFilter',
        }
    });


    return (
        <div className="table-container">
            <div className="search-reset-container">
                {props.features}
            </div>
            <table className="reactTable">
                <thead className="reactTableHeader">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const columnDefinitions:any = header.column.columnDef;
                                return(
                                <th 
                                    tabIndex={1} 
                                    key={header.id} 
                                    style={tableStyle.tableHeader}
                                    className={header.column.getIsGrouped() || header.column.getIsSorted() !== false ? 'activeTableHeader': 'normalTableHeader'}
                                >
                                    <div style={tableStyle.tableHeaderWrapper}>
                                        <a onClick={header.column.getToggleGroupingHandler()}>
                                            {header.column.getIsGrouped()?
                                                <FontAwesomeIcon icon={faRightFromBracket} />:
                                                <FontAwesomeIcon icon={faRightToBracket} rotation={180} />
                                            }
                                        </a>
                                        <a style={tableStyle.tableHeaderLegend} className="headerTitle">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </a>
                                        <a onClick={header.column.getToggleSortingHandler()} title="Hold Shift for multiple column sorting.">
                                            {
                                                {
                                                    asc: <FontAwesomeIcon icon={faSort} size="lg" color="#4f4f4f" />,
                                                    desc: <FontAwesomeIcon icon={faSortDown} size="lg" color="#4f4f4f" />
                                                }[header.column.getIsSorted() as string] ??
                                                <FontAwesomeIcon icon={faSortUp} size="lg" color="#4f4f4f" />
                                            }
                                        </a>
                                        <FilterDialog column={header.column} accessor={columnDefinitions.accessorKey as string} data={props.data}/>
                                        </div>
                                    </th>)
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr tabIndex={1} key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {cell.getIsGrouped() && (<>
                                        <a
                                            tabIndex={1}
                                            onClick={row.getToggleExpandedHandler()}
                                        >
                                            {row.getIsExpanded() ?
                                                <FontAwesomeIcon icon={faUpLong} /> :
                                                <FontAwesomeIcon icon={faDownLong} />}

                                        </a>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}{' '}
                                        ({row.subRows.length})
                                    </>)}
                                    {cell.getIsAggregated() ? (
                                        // If the cell is aggregated, use the Aggregated
                                        // renderer for cell
                                        flexRender(
                                            cell.column.columnDef.aggregatedCell ??
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                                        // Otherwise, just render the regular cell
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}








