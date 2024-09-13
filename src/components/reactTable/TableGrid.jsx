import React, {useEffect, useMemo, useRef, useState} from "react";
import {Flipper, Flipped} from "react-flip-toolkit";
import TableComponent from "../reactTable/tableComponet.jsx";
import "../styles/reactTable.css"
import {faMaximize, faMinimize, faRotateRight, faSquareFull} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlaceholderContainer from "../placeHolderContainer.jsx";
import {ConfirmDialog} from "../confirmDialogComponent.jsx";
import {
    handleConfirmDelete,
    handleFindById,
    handleGenerateId,
    handleSaveEdit,
    handleSaveNewRow
} from "./handleTableButtons.jsx";


// eslint-disable-next-line react/prop-types
const TableGrid = ({
                       tableData,
                       title,
                       urls,
                       maximizedTables,
                       setMaximizedTables,
                       setIsDataLoading,
                       setResponseData
                   }) => {

    const [values, setValues] = useState(tableData);

    useEffect(() => {
        if (title === "Recon Rule") {
            setMaximizedTables([title]);
        } else {
            setMaximizedTables([]);  }  }, [tableData]);

    const handleTitleClick = (index) => {
        setMaximizedTables((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const ResetButton = () => {
        return (
            <button className="reset-button" onClick={() => setMaximizedTables([])}>
                <FontAwesomeIcon icon={faRotateRight} size="2xl"  
                                 mask={faSquareFull}
                                 style={{
                                     fontSize: '24px',
                                     color: "#ffffff",
                                     backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                 }}/>
            </button>
        )
    }


    const [toggleDialog, setToggleDialog] = useState(false);
    const [dialogProperty, setDialogProperty] = useState({});
    const [onConfirmDialog, setOnConfirmDialog] = useState(false);
    const [crud, crudFns] = useState({});

    const defineProperty = () => {
        let idProperty;
        switch (title) {
            case "Recon Rule":
            case "Recon Rule Basis":
            case "Recon Details":
                idProperty = "reconRuleId";
                break;
            case "Recon Criteria Details":
            case "Recon Criteria":
                idProperty = "reconCriteriaId";
                break;
            case "Recon Attribute Reference":
                idProperty = "attributeRefId";
                break;
            default:
                idProperty = null;
                break;
        }
        return idProperty;
    }

    const idProperty = defineProperty(title);

    const crudRecon = useEffect(() => {
        switch (crud.action) {
            case "delete":
                setToggleDialog(true);
                setDialogProperty({
                    title: "Confirm Delete",
                    message: `Are you certain you want to delete the row with the ID: ${crud.id} from the table? This action cannot be undone.`,
                    type: "warning",
                    acceptButton:  "Delete",
                    cancelButton: "Cancel",
                });
                break;

            case "add":
                 handleSaveNewRow(crud.formData, urls.add, values, setValues);
                 break;

            case "edit":
                handleSaveEdit(crud.formData, urls.edit, setValues, values, crud.id, idProperty);
                break;

            case "findById":
                handleFindById(setIsDataLoading, urls.findAllById, crud.id, setResponseData);
                break;

            case "defineRowId":
                let idPropertyForRow = defineProperty(crud.entity);
                handleGenerateId(crud.id, idPropertyForRow, values);
                break;
        }
    }, [crud]);

    useEffect(() => {
        if (onConfirmDialog) {
            let idProperty = defineProperty();
            handleConfirmDelete(crud.id, idProperty, urls.delete, values, setValues, setToggleDialog, setOnConfirmDialog);
        }
    }, [onConfirmDialog])


    // @ts-ignore
    return (
        <Flipped flipId={title} stagger>
            <div className={`table-wrapper ${maximizedTables.includes(title) ? "maximized" : "default"}`}>
                {toggleDialog && <ConfirmDialog properties={dialogProperty} setToggleDialog={setToggleDialog} onConfirm={setOnConfirmDialog} />}
                <button
                    className="table-title"
                    onClick={() => handleTitleClick(title)}
                >
                    {title}
                    <span className="span-icon">
                                {maximizedTables.includes(title) ?
                                    <FontAwesomeIcon icon={faMinimize} size="xl" mask={faSquareFull}
                                                     style={{
                                                         fontSize: '24px',
                                                         color: "#ffffff",
                                                         backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                                     }}/> :
                                    <FontAwesomeIcon icon={faMaximize} size="xl" mask={faSquareFull}
                                                     style={{
                                                         fontSize: '24px',
                                                         color: "#ffffff",
                                                         backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                                     }}/>}
                               </span>
                </button>
                <div className={`table-content ${maximizedTables.includes(title) || maximizedTables.length === 0
                    ? "show" : "hide"}`}>
                    {values && values.length < 1 ?
                        <PlaceholderContainer/> :

                        <TableComponent
                            columnProps={Object.keys(values[0]).map((header) => ({
                                title: header,
                                name: header
                            }))}
                            tableData={values}
                            setTableData={setValues}
                            editButtons={true}
                            features={<ResetButton/>}
                            crudFns={crudFns}
                            title={title}
                            idProperty={idProperty}
                            subtotalColumns={[]}
                        />
                    }
                </div>
            </div>
        </Flipped>


    );
};

export default TableGrid;


