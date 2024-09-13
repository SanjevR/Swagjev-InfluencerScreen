import Accordion from "../accordion";
import SearchForm from "../seachForm";
import TableComponent from "../reactTable/tableComponet";
import {useEffect, useState} from "react";
import {DisplayChartComponent}from "../reactChart/chartComponent";
import { dummyData } from "../../scripts/dummyData";
import SelectChartComponent from "../reactChart/SelectChartComponent";
import PivotTableComponent from "../reactPivot/PivotTableComponent";
import SubTabButtons from "../subTab/subTabButtons";
import { SubTabContent } from "../subTab/subTabContent"
import PivotMenu from "../reactPivot/pivotMenu";
import Recon from "./recon.jsx";
import PlaceHolderContainer from '../placeHolderContainer'
import {LoaderComponent} from "../LoaderComponent.jsx";
import TableGridRecords from "../reactTable/TableGridRecords.jsx";



export default function AutoMatchDebug() {

  const [activeSubTab, setActiveSubTab] = useState(0);
  const [selectedChart, setSelectedChart] = useState('');
  const [records, setRecords] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const recordsTable = records? [
        {
          title: "Source Records",
          columnProps: records.COLUMNS,
          values:records.SOURCE_RECORDS,
          subtotalColumns:["SWAGG_123","SWAG_15434"]
        },
      {
          title: "Target Records",
          columnProps: records.COLUMNS,
          values:records.TARGET_RECORDS,
          subtotalColumns:["SWAGAMOUNT_13456214","SWAGQUANTITY_13312312312"]
      }
  ] : []


  const subTabs = [
      {
        name: "Records",
        content:
            <>
                <h3></h3>
                {(isDataLoading) ? (
                    <LoaderComponent/>
                ) : (records == null || records.COLUMNS == null) ? (
                    <PlaceHolderContainer/>
                ) : (
                    <TableGridRecords tableData={recordsTable}/>
                )}

            </>
      },
      {
        name: "Chart",
        content:<>
                <SelectChartComponent handleChange={setSelectedChart}/>
                <DisplayChartComponent selectedOption={selectedChart}/>
                </>
      },
      {
        name: "Pivot Table",
        content: <div className="pivotContainer">
                <PivotTableComponent/> 
                <PivotMenu data={dummyData.TARGET_RECORDS}/>
                </div>      
      },
      {
          name: "Recon",
          content: <Recon/>
      }
  ];

  useEffect(() => {
      if(subTabs[activeSubTab].name === "Recon"){
          setIsAccordionOpen(false);
      } else{
          setIsAccordionOpen(true);
      }
  },[activeSubTab])

  return (
      <>
      <Accordion title="Search" isOpen={isAccordionOpen}>
        <div style={{border: "solid 1px var(--accentColorE)", margin: "1px", marginBottom: "16px"}}>
          <SearchForm setResponseData={setRecords} setIsDataLoading={setIsDataLoading}/>
        </div>
      </Accordion>
      <Accordion title="Result" isOpen={true}>
            <SubTabButtons
                subTabData={subTabs}
                activeSubTab={activeSubTab}
                setActiveSubTab={setActiveSubTab}
            />
            <SubTabContent subTabData={subTabs} activeSubTab={activeSubTab}/>
      </Accordion>
      </>
  );
}
