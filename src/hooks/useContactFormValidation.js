import { useEffect } from 'react';

// Set event listener "submit" in the form
const useContactFormValidation = () => {
    useEffect(() => {
        const contactForm = document.getElementById('contactForm');
       
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                contactForm.classList.add('closing');
                setTimeout(() => {
                    contactForm.classList.add('closed');
                    document.getElementById('formSubmitionMessage').classList.add('opened')
                }, 300);
                


                return;
            });
        }
    });
};



export default useContactFormValidation;