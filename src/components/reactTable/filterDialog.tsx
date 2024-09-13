import { faCircleXmark, faFilter, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column } from "@tanstack/react-table";
import React, { ReactNode, useMemo, useRef, useState } from "react";

const dialogStyle: DialogStyles = {
    container: {
        position: "absolute",
        zIndex: 1,
        width: "100%",
        top: "calc(100% + 4px)",
        padding: "4px",
        border: "none",
        boxShadow: "0 0 3px var(--secondaryColor9)",
    }
}

type DialogStyles = {
    container: React.CSSProperties;
}

interface FilterDialogProps<T>{
    column: Column<T, unknown>;
    accessor: string;
    data: T[];
}

export default function FilterDialog<T>(props: FilterDialogProps<T>){
    const [toggle, setToggle] = useState<boolean>(false);
    const [matches, setMatches] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const columnUniqueValues = useMemo(()=>{
        if(toggle){
            let uniqueValues: string[] = new Array<string>();
            let uniqueValuesSet = new Set<string>();
            props.data.forEach((item: any)=> {
                uniqueValuesSet.add(item[props.accessor]);
            });
            uniqueValuesSet.forEach((value)=> {uniqueValues.push(value)})
            setMatches(uniqueValues);
            return uniqueValues;
        }
        return [];
    }, [toggle])

    function handdleInput(input: HTMLInputElement) {
        let matchesValues = columnUniqueValues.filter((value)=> value.toString().toLowerCase().includes(input.value.toLowerCase()));
        setMatches(matchesValues);
        console.log(matchesValues)
    }

    function addFilter(input: HTMLInputElement){
        let filterList: string[] = [];
        if(input.checked){
            filterList = [...filters, input.value]
        }else{
            filterList = filters.filter((item)=> item !== input.value);
        }
        setFilters(filterList);
        props.column.setFilterValue(filterList);
    }

    function clearFilters(){
        props.column.setFilterValue([]);
        setFilters([]);
        setMatches([]);
    }

    return <>
        <a onClick={() => setToggle(!toggle)}>
            <FontAwesomeIcon icon={faFilter} size="lg"/>
        </a>
        {toggle && 
            <dialog 
                style={dialogStyle.container} 
                open={toggle} 
                tabIndex={2}
                onKeyUp={(e)=> {e.key === 'Escape' && setToggle(false)}} 
            >
                <div style={{display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: "4px"}}>
                    <input type="search" placeholder="Search" style={{ width: "90px" }} onInput={(e)=> handdleInput(e.currentTarget)}/>
                    <a
                        tabIndex={1}
                        onClick={() => clearFilters()}
                        onKeyUp={(e) => { e.key === 'Espace' && clearFilters()}}
                    >
                        <FontAwesomeIcon icon={faFilterCircleXmark} size="lg" />
                    </a>
                    <a
                        tabIndex={1}
                        onClick={() => setToggle(false)}
                        onKeyUp={(e) => { e.key === 'Espace' && setToggle(false) }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} size="lg" color="red" />
                    </a>
                </div>
                <ul>
                    {matches.length > 0 && matches.map((value, i)=>(
                        <li key={"listOfValues" + i}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={filters.includes(value)}
                                    name={value} 
                                    onChange={(e)=> addFilter(e.currentTarget)}
                                />
                                {value}
                            </label>
                        </li>
                    ))}
                </ul>
            </dialog>
        }
    </>;
}