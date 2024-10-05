import Image from 'next/image';
import "../app/styles/components/sponsors.css";

const Sponsors = () => {
    // This constant is only simulating a response from the API to show any quantity of comments
    const icons = ['Google.svg', 'Amazon.svg', 'Meta.svg', 'Apple.svg', 'Tesla.svg', 'Microsoft.svg', 'Google.svg', 'Amazon.svg'];

    return (
        <div id='sponsors-container'>

            {icons.map((icon) => {
                const iconPath = 'images/sponsors/' + icon;

                return (
                    <Image key={icon} src={iconPath} alt={icon} width={0} height={0} />
                );
            })}
        </div>
    );
};

export default Sponsors;