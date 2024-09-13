import React, { useMemo } from "react";

function CheckboxFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
    const options = useMemo(() => {
        const uniqueValues = new Set(preFilteredRows.map((row) => row.values[id]));
        return [...uniqueValues];
    }, [preFilteredRows, id]);

    const handleChange = (option) => {
        setFilter((prevFilterValue = []) => {
            const updatedFilterValue = [...prevFilterValue];

            if (updatedFilterValue.includes(option)) {
                const index = updatedFilterValue.indexOf(option);
                updatedFilterValue.splice(index, 1);
            } else {
                updatedFilterValue.push(option);
            }

            return updatedFilterValue;
        });
    };

    return (
        <div className="table-filter-row">
            {options.map((option) => (
                <div key={option}>
                    <label className="filter-list-item ripple">
                        <input
                            type="checkbox"
                            className="filter-check-box"
                            checked={filterValue.includes(option)}
                            onChange={() => handleChange(option)}
                        />
                        <div className="filter-label">{option}</div>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default CheckboxFilter;
