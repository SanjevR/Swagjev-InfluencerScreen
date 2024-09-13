import ReconForm from "../reconForm.jsx";
import '../styles/reconForm.css'
import TableGrid from "../reactTable/TableGrid.jsx";
import {useMemo, useState} from "react";
import PlaceholderContainer from "../placeHolderContainer.jsx";
import {LoaderComponent} from "../LoaderComponent.jsx";
import {handleConfirmDelete} from "../reactTable/handleTableButtons.jsx";
import {ConfirmDialog} from "../confirmDialogComponent.jsx";
import {Flipper} from "react-flip-toolkit";

export default function Recon() {
    const [responseData, setResponseData] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);


    const springConfig = { stiffness: 120, damping: 20 };

    const tableDataRecon = {
        reconRule: {
            title: "Recon Rule",
            url: {
                add: "http://localhost:8080/api/recon-rule/add",
                edit:"http://localhost:8080/api/recon-rule/edit",
                delete:"http://localhost:8080/api/recon-rule/delete",
                findAllById: "http://localhost:8080/api/recons",
                },
        }
,
  reconRuleBasis : {
        title: "Recon Rule Basis",
        url:{
              add:"http://localhost:8080/api/recon-rule-basis/add",
              edit:"http://localhost:8080/api/recon-rule-basis/edit",
              delete:"http://localhost:8080/api/recon-rule-basis/delete",
              findAllById: "http://localhost:8080/api/recons",
            },
    }
,
  reconDetails:  {
       title: "Recon Details",
       url:{
             add:"http://localhost:8080/api/recon-details/add",
             edit:"http://localhost:8080/api/recon-details/edit",
             delete:"http://localhost:8080/api/recon-detail/delete",
             findAllById: "http://localhost:8080/api/recons",
            },
    }
,
   reconCriteriaDetails : {
       title: "Recon Criteria Details",
       url:{
              add:"http://localhost:8080/api/recon-criteria-details/add",
              edit:"http://localhost:8080/api/recon-criteria-details/edit",
              delete:"http://localhost:8080/api/recon-criteria-details/delete",
              findAllById: "http://localhost:8080/api/recons",
            },
    }
,
   reconCriteria : {
       title: "Recon Criteria",
        url:
        {
               add: "http://localhost:8080/api/recon-criteria/add",
               edit:"http://localhost:8080/api/recon-criteria/edit",
               delete:"http://localhost:8080/api/recon-criteria/delete",
               findAllById: "http://localhost:8080/api/recons",
            },
    }
,
    reconAttributeReference: {
        title: "Recon Attribute Reference",
        url:{
              add:"http://localhost:8080/api/recon-attribute/add",
              edit:"http://localhost:8080/api/recon-attribute/edit",
              delete:"http://localhost:8080/api/recon-attribute/delete",
              findAllById: "http://localhost:8080/api/recons",
            },
    }
}

    // const [maximizedTables, setMaximizedTables] = useState([tableDataRecon.reconRule.title]);
    const [maximizedTables, setMaximizedTables] = useState([]);



    return (
        <>

            <ReconForm setResponseData={setResponseData} setIsDataLoading={setIsDataLoading}/>
            <hr className="hr-gradient"/>
            <div className="recon-table-container">
                {isDataLoading ? (
                    <LoaderComponent/>
                ) : responseData ? (
                    <Flipper flipKey={maximizedTables.join(",")} spring={springConfig}>
                        <div className="tables-grid">
                            {responseData.RECON_RULE && (
                                <TableGrid
                                    tableData={responseData.RECON_RULE}
                                    title={tableDataRecon.reconRule.title}
                                    urls={tableDataRecon.reconRule.url}
                                    maximizedTables={maximizedTables}
                                    setMaximizedTables={setMaximizedTables}
                                    setIsDataLoading={setIsDataLoading}
                                    setResponseData={setResponseData}
                                />
                            )}
                            {responseData.RECON_RULE_BASIS && (
                                <TableGrid
                                    tableData={responseData.RECON_RULE_BASIS}
                                    title={tableDataRecon.reconRuleBasis.title}
                                    urls={tableDataRecon.reconRuleBasis.url}
                                    maximizedTables={maximizedTables}
                                    setMaximizedTables={setMaximizedTables}
                                    setIsDataLoading={setIsDataLoading}
                                    setResponseData={setResponseData}
                                />
                            )}
                            {responseData.RECON_DETAILS && (
                                <TableGrid
                                    tableData={responseData.RECON_DETAILS}
                                    title={tableDataRecon.reconDetails.title}
                                    urls={tableDataRecon.reconDetails.url}
                                    maximizedTables={maximizedTables}
                                    setMaximizedTables={setMaximizedTables}
                                    setIsDataLoading={setIsDataLoading}
                                    setResponseData={setResponseData}
                                />
                            )}
                            {responseData.RECON_CRITERIA && (
                                <TableGrid
                                    tableData={responseData.RECON_CRITERIA}
                                    title={tableDataRecon.reconCriteria.title}
                                    urls={tableDataRecon.reconCriteria.url}
                                    maximizedTables={maximizedTables}
                                    setMaximizedTables={setMaximizedTables}
                                    setIsDataLoading={setIsDataLoading}
                                    setResponseData={setResponseData}
                                />
                            )}
                            {responseData.RECON_CRITERIA_DETAILS && (
                                <TableGrid
                                    tableData={responseData.RECON_CRITERIA_DETAILS}
                                    title={tableDataRecon.reconCriteriaDetails.title}
                                    urls={tableDataRecon.reconCriteriaDetails.url}
                                    maximizedTables={maximizedTables}
                                    setMaximizedTables={setMaximizedTables}
                                    setIsDataLoading={setIsDataLoading}
                                    setResponseData={setResponseData}
                                />
                            )}
                            {responseData.RECON_ATTRIBUTE_REFERENCE && (
                                <TableGrid
                                    tableData={responseData.RECON_ATTRIBUTE_REFERENCE}
                                    title={tableDataRecon.reconAttributeReference.title}
                                    urls={tableDataRecon.reconAttributeReference.url}
                                    maximizedTables={maximizedTables}
                                    setMaximizedTables={setMaximizedTables}
                                    setIsDataLoading={setIsDataLoading}
                                    setResponseData={setResponseData}
                                />
                            )}
                        </div>
                    </Flipper>
                ) : (
                    <PlaceholderContainer/>
                )}
            </div>
        </>
    );
}