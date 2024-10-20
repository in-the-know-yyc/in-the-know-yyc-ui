import { useEffect } from 'react';

// Set event listener "click" in the button "Get Started"
const useHighlightNewsletterInput = () => {
    useEffect(() => {
        const communityButton = document.getElementById('communityGetStartedButton');
        const newsletterWrapper = document.querySelector('div.inputNewsletterFooter');
        const newsletterInput = document.getElementById('inputNewsletterFooter');
        
        if (communityButton) {
            communityButton.addEventListener('click', () => {
                // Add class to highlight input after scrolling is done
                setTimeout(() => {
                    newsletterWrapper.classList.add('highlighted');
                },300);
                // Remove class to highlight input and focus
                setTimeout(() => {
                    newsletterWrapper.classList.remove('highlighted');
                    newsletterInput.focus()
                },1000);
            });
        }
    });
};


export default useHighlightNewsletterInput;