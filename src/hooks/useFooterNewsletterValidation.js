import { useEffect } from 'react';

// Set event listener "submit" in the form
const useHeaderSearchValidation = (setIsDisabled, setErrorMessage, setSuccessMessage) => {
    useEffect(() => {
        const newsletterForm = document.getElementById('footerNewsletterForm');
        const newsletterInput = document.getElementById('inputNewsletterFooter');
        
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        
        
        // FORM VALIDATION AND LISTENER
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (event) => {
                event.preventDefault();

                
                if (newsletterInput.value.length === 0) {
                    // Validate not empty value
                    emptyValue(setIsDisabled, setErrorMessage);
                    return;
                }else if(!emailRegex.test(newsletterInput.value)){
                    // Validate email format
                    wrongFormat(setIsDisabled, setErrorMessage);
                    return;
                }

                // VALIDATIONS PASSED

                // SUBMIT STOPPED DURING TESTING
                //newsletterForm.submit();
                setSuccessMessage('Thank you for subscribing to In The Know YYC newsletters.');
                return;
            });
        }

        if(newsletterInput){
            newsletterInput.addEventListener('keyup', () => {
                if(emailRegex.test(newsletterInput.value)){
                    setErrorMessage('');
                    setIsDisabled(false);
                }else{
                    wrongFormat(setIsDisabled, setErrorMessage);
                    setIsDisabled(true);
                }
            })
            newsletterInput.addEventListener('blur', () => {
                if(newsletterInput.value === ''){
                    setErrorMessage('');
                    setIsDisabled(true);
                }
            })
        }
    });
};

const emptyValue = (setIsDisabled, setErrorMessage) => {
    setErrorMessage('This field is required');
    setIsDisabled(true);
}

const wrongFormat = (setIsDisabled, setErrorMessage) => {
    setErrorMessage('Please enter a valid email address');
    setIsDisabled(true);
}


export default useHeaderSearchValidation;