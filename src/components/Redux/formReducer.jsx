import { SET_FORM_DATA, RESET_FORM_DATA } from './actions';

const initialState = {
    formData: {
        operationType: "getData",
        productTypeCode: "",
        reconRuleId: "",
        sourceTransactionIdList: [],
        targetTransactionIdUsr: [],
        reconMatchIdList: [],
        mtrMatchIdList: [],
    },
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORM_DATA:
            return {
                ...state,
                formData: action.payload,
            };
        case RESET_FORM_DATA:
            return initialState;
        default:
            return state;
    }
};

export default formReducer;
