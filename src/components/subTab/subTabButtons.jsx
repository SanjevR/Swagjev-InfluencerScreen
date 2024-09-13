
export default function SubTabButtons({subTabData, activeSubTab, setActiveSubTab}){
    return (
        <div className="tab-header">
            {subTabData.map((item, index) => (
                <a
                className={`${index === activeSubTab && "active"} tab`}
                key={item.name}
                onClick={() => setActiveSubTab(index)}>
                  <span>{item.name}</span>  
                  <div className="tab-shadow"></div>
                </a>
            ))}
        </div>
    );
}
