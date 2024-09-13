export const SET_FORM_DATA = 'SET_FORM_DATA';
export const RESET_FORM_DATA = 'RESET_FORM_DATA';

export const setFormData = (formData) => ({
    type: SET_FORM_DATA,
    payload: formData,
});

export const resetFormData = () => ({
    type: RESET_FORM_DATA,
});