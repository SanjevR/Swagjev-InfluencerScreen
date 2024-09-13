import { NavLink } from "react-router-dom";

export default function Tab({title, link}){
    return (<NavLink 
            className="tab" to={link} >
            <span>{title}</span> 
            <div className="tab-shadow"></div>
            </NavLink>)
}