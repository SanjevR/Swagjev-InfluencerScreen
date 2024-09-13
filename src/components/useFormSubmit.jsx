import { useState, useCallback } from "react";

export const useFormSubmit = (url, formData, body) => {
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
                try {
                    const response = await fetch(url, body);

                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }

                    const result = await response.json();
                    setResponseData(result);
                    console.log(result);
                } catch (err) {
                    console.error(err.message);

                }

        },
        [url, body]
    );

    return { handleSubmit, responseData};
};
