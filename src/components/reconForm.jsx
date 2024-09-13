import {BaseInput, SelectInput} from "./formInput.jsx";
import './styles/reconForm.css'
import {FaSearch} from "react-icons/fa";
import {IconContext} from "react-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSquareFull} from "@fortawesome/free-solid-svg-icons";
import {useCallback, useState} from "react";
import {useFormSubmit} from "./useFormSubmit.jsx";


// eslint-disable-next-line react/prop-types
export default function ReconForm({ setResponseData, setIsDataLoading}) {
    const [formData, setFormData] = useState({
        productTypeCode: "",
        reconRuleId: "",
    });
    const addUniqueIdToRows = (data) => {
        return data.map((row, index) => {
            return {
                ...row,
                id: row.id || index + 1,
            };
        });
    };

    const body ={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let url = "";
    if(formData.reconRuleId === ""&& formData.productTypeCode===""){
        url = "http://localhost:8080/api/recon-rule/"
    } else{
        url=`http://localhost:8080/api/recons/${formData.reconRuleId}/${formData.productTypeCode}`;
    }
    const handleSubmit =
        async (event) => {
            event.preventDefault();
            setIsDataLoading(true);
            try {
                const response = await fetch(url, body);

                if (!response.ok) {
                    setIsDataLoading(false);
                    throw new Error(`Response status: ${response.status}`);

                }

                const result = await response.json();
                setIsDataLoading(false);
                setResponseData(result);


            } catch (err) {
                console.error(err.message);
                setIsDataLoading(false);
            }

        }


    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const ProductTypeSelectOptions = [
        {title: "", value: ""},
        {title: "FUTURES", value: "FUTURES"},

    ];


    return (
        <form className="form-recon" onSubmit={handleSubmit}>
            <div>
                <label>
                    <span>Product Type :</span>
                    <SelectInput
                        name="productTypeCode"
                        value={formData.productTypeCode}
                        options={ProductTypeSelectOptions}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Recon Rule ID:</span>
                    <BaseInput name="reconRuleId"
                               type="text"
                               value={formData.reconRuleId}
                               onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <button  type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" mask={faSquareFull}
                                     style={{
                                         fontSize: '24px',
                                         color: "#ffffff",
                                         backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                                     }}/></button>
            </div>
        </form>
    );
}

