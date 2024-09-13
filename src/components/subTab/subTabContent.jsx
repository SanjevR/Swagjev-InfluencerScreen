

const localStyle = {
    tableContainer: {
      padding: "4px",
    },
  }
export function SubTabContent({subTabData, activeSubTab}){
 
    console.log(activeSubTab)
        return (
            <div className="drawer-container">
                <div style={localStyle.tableContainer}>

                        {subTabData[activeSubTab].content}
                </div>
            </div>
        );

    }
