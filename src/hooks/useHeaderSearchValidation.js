import { useEffect } from 'react';

// Set event listener "submit" in the form
const useHeaderSearchValidation = (setErrorMessage, formId, inputId) => {
    useEffect(() => {
        const searchForm = document.getElementById(formId);

        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const searchInput = document.getElementById(inputId);
                if (searchInput.value.length === 0) {
                    setErrorMessage('This field is required');
                  } else {
                    setErrorMessage('');
                    searchForm.submit();
                  }
            });
        }
    });
};

export default useHeaderSearchValidation;