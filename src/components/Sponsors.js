import fs from 'fs';
import Image from 'next/image';
import "../app/styles/components/sponsors.css";

const Sponsors = () => {
    const directoryPath = 'public/images/sponsors/';
    const icons = fs.readdirSync(directoryPath);

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