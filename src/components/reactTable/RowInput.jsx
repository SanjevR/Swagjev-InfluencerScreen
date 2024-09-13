import React, {memo, useCallback, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {inputTypeMappings, inputTypeMappingsForForms} from "../../scripts/ReconInputTypeMappings.jsx";

const NewRowInput = ({value, onChange, name}) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect (() => {
        setInputValue(value);
    },[value]);
    const handleChange = (e) =>{
        setInputValue(e.target.value);
    };
    const handleBlur = () => {
        onChange({target: {name,value: inputValue}});
    };

    const inputType = inputTypeMappingsForForms[name] || 'text';

    return (
        <input
            className="input-table"
            type={inputType}
            value={inputValue}
            name={name}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleBlur()}
        />

    )
}
export const NewRow = ({newRow, setNewRow, tableTitle, crudFns}) =>{
    const [row, setRow] = useState(newRow);

    const handleInputChange = useCallback((e) => {
        const {name, value} = e.target;
        setRow((prevRow) => ({
            ...prevRow,
            [name]: value,
        }));
    }, []);

    return (
        <tr>
            {Object.keys(newRow).map((key, index) => (
                <td key={index}>
                    <NewRowInput
                        value={row[key]}
                        name={key}
                        onChange={(e) => handleInputChange(e)}
                    />
                </td>
            ))}
            <td className="fixed-column">
                <button className="button-edit"
                    // onClick={() => handleSaveNewRow(newRow, url.add, setTableData, setNewRow)}>
                        onClick={() => {
                            console.log("before crudfns");
                            crudFns({
                                    id: null, action: "add", entity: tableTitle,
                                    formData: row,
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
                            )
                            console.log("after crudfns");
                         setNewRow(null)
                        }}>
                    <FontAwesomeIcon icon={faCheck} size="lg" style={{color: '#4CAF50'}}/>
                </button>
                <button className="button-del" onClick={() => setNewRow(null)}>
                    <FontAwesomeIcon icon={faXmark} size="lg" style={{color: '#f44336'}}/>
                </button>
            </td>
        </tr>
    )
};

export const EditRow = ({ rowId, columnName, value, prevData, idProperty, onChange}) => {
    const [editValue, setEditValue] = useState(value);

    useEffect(() => {
        setEditValue(prevData[columnName]);
    },[prevData, columnName]);

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleBlur = () =>{
        onChange(rowId, columnName, editValue)
    }

    const inputType = inputTypeMappingsForForms[columnName] || 'text';
    return (

            <input
                className="input-table"
                name={columnName}
                type={inputType}
                value={editValue || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={columnName === idProperty}
            />

    );
};




//form ?
