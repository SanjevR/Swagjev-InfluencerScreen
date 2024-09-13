import { AutoMatchDebugColumns, AutoMatchDebugRows, ReactTableColumns } from "../../scripts/interfaces";
import TableComponent from "./tableComponet";

interface TableProps {
    columns: AutoMatchDebugColumns[];
    rows: AutoMatchDebugRows[];
}

export default function TableAutoMatchDebugWrapper(props:TableProps){

    const columns: ReactTableColumns[] = props.columns.map((column)=>({header: column.title.toUpperCase(), accessorKey: column.name}));

    return <>
        <TableComponent<AutoMatchDebugRows> columns={columns} data={props.rows} editButtons={false} features={undefined} />
    </>;
}