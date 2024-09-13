import {SelectInput, TextAreaInput, BaseInput} from "./formInput";
import {ImUndo2} from "react-icons/im";
import {useState} from "react";
import {IconContext} from "react-icons";
import {useDispatch, useSelector} from 'react-redux'
import FormValidator from "./FormValidator.jsx";
import {useFormSubmit} from "./useFormSubmit.jsx";
import {setFormData, resetFormData} from "./Redux/actions.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBug, faReply, faSquareFull} from "@fortawesome/free-solid-svg-icons";

export default function SearchForm({setResponseData, setIsDataLoading}) {
    const formData = useSelector((state) => state.form.formData);
    const dispatch = useDispatch();
    const [validateOnSubmit, setValidateOnSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setFormData ({
            ...formData,
            [name]: name.includes("IdList") || name.includes("IdUsr")
                ? value.split(",").map(Number)
                : value,
        }));

    };

    const ProductTypeSelectOptions = [
        {title: "", value: ""},
        {title: "SWAGJEV", value: "SWAGJEV"},
        {title: "Sanjev", value: "Sanjev"},
    ];

    const ReconRuleOptions = [
        {title: "", value: ""},
        {title: "SANJEVRAJARAM", value: 11171991},
        {title: "SWAGJEV", value: 10102010},

    ];

    const validationSearchForm = {
        productTypeCode: {
            required: true,
            message: "Operation Type is required",
        },
        reconRuleId: {
            required: true,
            message: "Recon Rule ID is required",
        },
        sourceTransactionIdList: {
            required: true,
            message: "Source Transaction ID List is required",
            isArray: true,
        },
        targetTransactionIdUsr: {
            required: true,
            message: "Target Transaction ID is required",
            isArray: true,
        },
        // reconMatchIdList: {
        //     required: true,
        //     message: "Recon Match ID List is required",
        //     isArray: true,
        // },
        // mtrMatchIdList: {
        //     required: true,
        //     message: "MTR Match ID List is required",
        //     isArray: true,
        // },
    }

    const body = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };

    const {errors, isValid} = FormValidator({formData, validationRules: validationSearchForm, validateOnSubmit});
    const url = "http://localhost:8080/api/auto-match";
    const handleReset = () => {
        dispatch(resetFormData());
    }

   /*
    const {handleSubmit, responseData, error } = useFormSubmit(url,formData, isValid, setValidateOnSubmit, body)
    console.log(error);
    console.log(responseData);
    */

    //Added this function to eliminate some complexcity
    function handleSubmit(ev) {
        ev.preventDefault();

        if (isValid) {
            setIsDataLoading(true);
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }
            ).then(resp => resp.json())
             .then(data => {
                 setResponseData(data);
                 setIsDataLoading(false);
             })
            .catch(error => {
                console.log(error)
                setIsDataLoading(false)
            });
        }else{
            console.log(errors);
        }
    }

    return (
        <form className="form-autoMatchDebug"  onSubmit={(ev)=>handleSubmit(ev)}>
            <div>
                <label>
                    <span className="required-field">Product Type :</span>
                    <SelectInput
                        name="productTypeCode"
                        value={formData.productTypeCode}
                        options={ProductTypeSelectOptions}
                        onChange={handleChange}
                        error={errors.productTypeCode}
                    />
                </label>
            </div>
            <div>
                <label>
                    <span className="required-field">Source Transaction Ids:</span>
                    <BaseInput
                        name="sourceTransactionIdList"
                        value={formData.sourceTransactionIdList.join(",")}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        error={errors.sourceTransactionIdList}
                    />

                </label>
            </div>
            <div>
                <label>
                    <span className="required-field">Target Transaction Ids:</span>
                    <BaseInput
                        name="targetTransactionIdUsr"
                        value={formData.targetTransactionIdUsr.join(",")}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        error={errors.targetTransactionIdUsr}
                    />
                </label>
            </div>
            <div>
                <label>
                    <span className="required-field">Recon Match Ids:</span>
                    <BaseInput
                        name="reconMatchIdList"
                        value={formData.reconMatchIdList.join(",")}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        // error={errors.reconMatchIdList}
                    />
                </label>
            </div>
            <div>
                <label>
                    <span className="required-field">Recon Rule :</span>
                    <SelectInput
                        name="reconRuleId"
                        value={formData.reconRuleId}
                        options={ReconRuleOptions}
                        onChange={handleChange}
                        error={errors.reconRuleId}
                    />
                </label>
            </div>
            <div className="button-group">
                <button className="debug-button" type="submit">
                    <FontAwesomeIcon
                        icon={faBug}
                        size="xl"
                        mask={faSquareFull}
                        style={{
                            fontSize: '24px',
                            color: "#ffffff",
                            backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                        }} />
                </button>
                <button className="clear-button" type="reset" onClick={handleReset}>
                    <FontAwesomeIcon
                        icon={faReply}
                        size="xl"
                        mask={faSquareFull}
                        style={{
                            fontSize: '24px',
                            color: "#ffffff",
                            backgroundImage: 'linear-gradient(#70bcfa, #5399df)',
                        }}
                    />
                </button>
            </div>
            <div>
                <label
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        color: "#ABABAB",
                    }}
                >
                    <span>MatchedResult :</span>
                    <TextAreaInput
                        name="result"
                        maxLength="50"
                        onChange={handleChange}
                    />
                </label>
            </div>
        </form>
    );
}