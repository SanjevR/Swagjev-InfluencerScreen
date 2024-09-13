import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faX} from "@fortawesome/free-solid-svg-icons";


export const ConfirmDialog = ({ properties, setToggleDialog, onConfirm}) =>{
    let acceptButtonStyle;
    let cancelButtonStyle;
    const handleButtonStyle = () =>{
        switch (properties.type){
            case "warning":
                acceptButtonStyle = "delete-option-confirmDialog";
                cancelButtonStyle = "cancel-option-confirmDialog";
                break;
        }
    }

    handleButtonStyle();
    return(
        <Popup open  modal  nested className="modal-confirmDialog">
            <div className="box-confirmDialog">
                <div className="header-confirmDialog">
                    <div>

                    {(properties.type && properties.type === "warning") &&
                        (<span className="icon-confirmDialog">
                               <FontAwesomeIcon icon={faCircleExclamation} size="xl" style={{color: "orange", marginRight: "5px"}} />
                       </span>)
                    }
                        <span className="title-confirmDialog">{properties.title}</span>
                    </div>
                        <button className="close-confirmDialog" onClick={()=> setToggleDialog(false)}>
                            <FontAwesomeIcon icon={faX} size="xl" style={{color: "#4f4f4f",}} />
                        </button>

                </div>
                        <div style={{padding: "20px", textAlign:"center"}}>
                        <div className="content-confirmDialog">
                            {properties.message}
                        </div>
                            <span className="divider-confirmDialog"></span>
                            <div className="footer-confirmDialog" style={{marginTop:"20px"}}>
                                <button
                                    style={{marginRight:"10px"}}
                                    className={acceptButtonStyle}
                                    onClick={() =>{
                                        onConfirm(true);
                                    }}
                                    >{properties.acceptButton? properties.acceptButton : "Accept"}
                                </button>
                                <button
                                    className={cancelButtonStyle}
                                    onClick={() =>{
                                    setToggleDialog(false);
                                }}
                                >{properties.cancelButton? properties.cancelButton : "Cancel"}</button>
                            </div>
                        </div>
                    </div>
        </Popup>
    );
};