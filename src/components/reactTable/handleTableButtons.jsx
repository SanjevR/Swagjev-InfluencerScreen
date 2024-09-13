import {inputTypeMappings} from "../../scripts/ReconInputTypeMappings.jsx";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {ConfirmDialog} from "../confirmDialogComponent.jsx";
import 'react-toastify/dist/ReactToastify.css';



const parseJsonForRequest = (data, inputTypeMapping) => {
    const parsedData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            const inputType = inputTypeMapping[key];

            if (value === null || value === undefined) {
                parsedData[key] = value;
                continue;
            }

            switch (inputType) {
                case 'number':
                    parsedData[key] = parseFloat(value);
                    break;

                case 'datetime-local':
                    const dateTime = new Date(value);
                    if (!isNaN(dateTime.getTime())) {
                        parsedData[key] = dateTime.toISOString();
                    } else {
                        console.error(`Invalid datetime-local value for key ${key}:`, value);
                        parsedData[key] = null;
                    }
                    break;

                case 'date':
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        parsedData[key] = date.toISOString().split('T')[0];
                    } else {
                        console.error(`Invalid date value for key ${key}:`, value);
                        parsedData[key] = null;
                    }
                    break;

                case 'object':
                    try {
                        parsedData[key] = JSON.parse(value);
                    } catch (error) {
                        console.error(`Failed to parse object for key ${key}:`, error);
                        parsedData[key] = null;
                    }
                    break;

                case 'array':
                    try {
                        parsedData[key] = JSON.parse(value);
                    } catch (error) {
                        console.error(`Failed to parse array for key ${key}:`, error);
                        parsedData[key] = null;
                    }
                    break;

                case 'long':
                    parsedData[key] = parseInt(value, 10);
                    if (isNaN(parsedData[key])) {
                        console.error(`Invalid long value for key ${key}:`, value);
                        parsedData[key] = null;
                    }
                    break;

                case 'bigdecimal':
                    try {
                        parsedData[key] = parseFloat(value).toFixed(2);
                    } catch (error) {
                        console.error(`Invalid bigdecimal value for key ${key}:`, value);
                        parsedData[key] = null;
                    }
                    break;

                case 'double':
                    parsedData[key] = parseFloat(value);
                    if (isNaN(parsedData[key])) {
                        console.error(`Invalid double value for key ${key}:`, value);
                        parsedData[key] = null;
                    }
                    break;

                default:
                    parsedData[key] = value;
                    break;
            }
        }
    }

    return parsedData;
};


export const handleSaveNewRow = (formData, addUrl, values, setTableData) => {


        const parsedRow = parseJsonForRequest(formData, inputTypeMappings);
        console.log("im in the handleSaveRow");

        fetch(addUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(parsedRow),
        }).then((response)=>response.json())
          .then((newEntity) => {
              if(newEntity !== null) {
                  setTableData(() =>{
                     return [...values, newEntity]
                  } )
                  toast.success("Row added successfully!", {
                      position: "top-center",
                      autoClose: 5000,

                  });
              }
          //     Notificate if the object is null in the ui
          }).catch((error)=> {
            toast.error("Failed to add row. Please try again", {
                position: "top-center",
                autoClose: 5000,
            });
              console.error(error)
        });

};


export const handleSaveEdit = async ( formData, editUrl, setTableData, values, idToEdit, idProperty) => {

        const parsedRow = parseJsonForRequest(formData, inputTypeMappings);

        console.log("im in the handleEditSave")
        fetch(editUrl+"/"+idToEdit,{
            method: 'PUT',
             headers: {
                'Content-Type': 'application/json',
                  },
             body: JSON.stringify(parsedRow),
            }).then((response)=>response.json())
               .then((editEntity) => {
                if(editEntity !== null) {
                    setTableData(() =>{
                        let filterData = values.filter((item) => item[idProperty] !== idToEdit);
                        return [...filterData, editEntity]
                    } )
                    toast.success("Row edited successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                //     Notificate if the object is null in the ui
            }).catch((error)=> {
            toast.error("Failed to edit row. Please try again", {
                position: "top-center",
                autoClose: 5000,
            });
            console.error(error)

        });
};

export const handleGenerateId = (index, idProperty, values) =>{
    if(idProperty && index !== undefined){
        const idRow = values[index][idProperty];
        console.log("id in generate Id: ",idRow);
        return idRow;
    }else{
        console.error("Could not define ID");
        return null
    }
}
export const handleConfirmDelete = async (idToDelete, idProperty, urlDelete, values, setTableData, setToggleDialog, setOnConfirmDialog) => {

    setToggleDialog(false);
    setOnConfirmDialog(false);
    console.log("im in the handleConfirmDeleted")
    fetch(urlDelete+"/"+idToDelete,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp)=> resp.json())
        .then((id)=>{
            setTableData(values.filter((item) => item[idProperty] !== id));
            toast.success("Row deleted successfully!", {
                position: "top-center",
                autoClose: 5000,
            });
        }).catch((error) => {
        toast.error("Failed to delete row. Please try again", {
            position: "top-center",
            autoClose: 5000,
        });
        console.error(error)
    })
};

export const handleFindById = async (setIsDataLoading, urlFind, idToFind, setResponseData) =>{
            setIsDataLoading(true);
            fetch(urlFind+"/"+idToFind,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",

                }
            }).then((resp) => resp.json())
                .then((result)=>{
                    setIsDataLoading(false);
                    setResponseData(result);
            }).catch((error)=> console.error(error));

}




