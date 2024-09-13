import { useMemo } from "react";
import SourceTargetTableComponent from "./sourceTargetTableComponent";


export default function SourceTargetWrapper({tableValues, ResetButton}){

    const columns = useMemo(() => {
        if (tableValues.columnProps === undefined || tableValues.columnProps.length === 0)
            return [];
        return tableValues.columnProps.map((item, index) => {
            const tableHeader = item.title.replace(/([a-z])([A-Z])/g, '$1 $2')
            return {
                Header: tableHeader.charAt(0).toUpperCase() + tableHeader.slice(1),
                accessor: item.name,
                Filter: CheckboxFilter,
                filter: 'includes',
                Cell: ({value}) => {
                    return index === 0? (
                        <span style={{cursor:'pointer'}}
                                onClick={() => crudFns({
                                    id:value, action: "findById", entity: title,
                                    formData:value
                                })}>
                          {value}
                        </span>
                    ) : (
                        value
                    );
                },
                aggregate: aggregateFunctions.sum,
                Aggregated: ({ value, column }) => {
                    return subtotalColumns.includes(column.id) ? (
                        <span style={{ fontWeight: "bold" }}>{value}</span>
                    ) : (
                        ""
                    );
                }
            };
        });

    }, [tableValues]);


    const data = useMemo(()=>{
        return tableValues.values;
    }, [tableValues]);


    return (
        <SourceTargetTableComponent
            columns={columns}
            data={data}
            features={<ResetButton/>}
        />
    )
}