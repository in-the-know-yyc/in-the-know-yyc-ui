import "../app/styles/components/textPages.css";
import Image from "next/image";
import Link from "next/link";

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

export default function About({ metadata }) {
    return (
        <>
            <PagesMetaData metadata={metadata} />
            <main className="textPage">
                <h1>About Us</h1>
                
                <h2>Every event starts with a post/information from us</h2>
                <p>At In the Know YYC, we&apos;re on a mission to help attend more events, connect with people, grow their businesses, and get back to what&apos;s important to them - by creating the most powerful platform for attending events in Alberta.</p>
                
                <h2>Our Story</h2>
                <p>
                    <Image src={'/images/about/debbie-butt-small.png'} width={206} height={212} alt="Debbie Butt" />
                </p>
                <p>Meet Debbie, a woman with a unique blend of expertise in accounting, a long career in the oil and gas industry, and an undeniable passion for events. Born and raised in Alberta, Debbie developed an early interest in the province&apos;s thriving energy sector and went on to earn a degree in Accounting from the University of Calgary. This academic background helped him land his first job as a financial analyst at a major oil company, where he learned the intricacies of balancing books, managing finances, and ensuring profitability in one of the world&apos;s most competitive industries.</p>
                <p>However, there was another side to Debbie&apos;s-her  deep love for community events and social gatherings. Whether it was attending Tech events, Calgary Stampede, local food festivals, or business conferences, she thrived on the energy of Alberta&apos;s vibrant event scene. Over the years, as her career in oil and gas advanced, she never lost sight of this passion. She began posting organizing and attending more events, both professional and recreational, and noticed a common problem: finding information on events in Alberta was scattered and unreliable.</p>
                <p>Inspired by her frustration, Debbie decided to combine her financial acumen with her love for events. She founded In the Know YYC Events Hub, a comprehensive website dedicated to listing, promoting, and organizing events across Alberta. From Tech, to music festivals to oil industry expos, the site became the go-to platform for residents and visitors to find out what was happening in the province. With her meticulous attention to detail, rooted in his accounting background, Debbie ensured that her site was user-friendly, well-organized, and a valuable resource for event planners and attendees alike.</p>
                <p>Today, Debbie splits her time between her career in oil and gas and running In the Know YYC Events Hub. She takes pride in connecting people, bringing communities together, and making it easier for others to enjoy the same events that sparked her own passion. For Debbie, it&apos;s more than just a business-it&apos;s about celebrating the culture and energy of Alberta, whether it&apos;s in the oil fields, Tech events or at a weekend festival.</p>

                <h2>Our Vision</h2>
                <p>Our vision is to become Alberta&apos;s leading event platform, where residents and visitors alike can effortlessly discover events that inspire, educate, and entertain. We aim to be the cornerstone of Alberta&apos;s event ecosystem, enhancing the province&apos;s sense of community and creating lasting memories for all who participate.</p>

                <h2>Our Mission</h2>
                <p>Our mission at In the Know YYC Events Hub is to connect communities across Alberta by providing a comprehensive, user-friendly platform for discovering and promoting local events. We strive to make it easy for event organizers and attendees to engage with Alberta&apos;s vibrant cultural, social, and business scenes, fostering stronger connections through shared experiences.</p>

                <h2>Our Team</h2>
                <p>At In the Know YYC, we&apos;re on a mission to help attend more events, connect with people, grow their businesses, and get back to what&apos;s important to them - by creating the most powerful platform for attending events in Alberta.</p>
                <div className="aboutImagesContainer">
                    <div className="aboutImagesColumn">
                        <Link href={'https://www.linkedin.com/in/debbie-butt/'} target="_blank">
                            <Image src={'/images/about/debbie-butt.png'} width={364} height={622} alt="Debbie Butt" />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/abia-yitschaq/'} target="_blank">
                            <Image src={'/images/about/abia-yitschaq.png'} width={364} height={622} alt="Yitschaq Abia" />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/chukwuka-chukwuma-83b26a125/'} target="_blank">
                            <Image src={'/images/about/chukwuka-chukwuma.png'} width={364} height={409} alt="Chukwuka Chukwuma" />
                        </Link>
                    </div>
                    <div className="aboutImagesColumn">
                        <Link href={'https://www.linkedin.com/in/nicolasfracchia/'} target="_blank">
                            <Image src={'/images/about/nicolas-fracchia.png'} width={364} height={409} alt="Nicolas Fracchia" />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/manisha-sakpal-499757138/'} target="_blank">
                            <Image src={'/images/about/manisha-sakpal.png'} width={364} height={622} alt="Manisha Sakpal" />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/taras-romaniuk-a20474144/'} target="_blank">
                            <Image src={'/images/about/taras-romaniuk.png'} width={364} height={622} alt="Taras Romaniuk" />
                        </Link>
                    </div>
                    <div className="aboutImagesColumn">
                        <Link href={'https://www.linkedin.com/in/dmytro-masliuk/'} target="_blank">
                            <Image src={'/images/about/dmytro-masliuk.png'} width={364} height={409} alt="Dmytro Masliuk" />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/sergii-smagin/'} target="_blank">
                            <Image src={'/images/about/sergii-smagin.png'} width={364} height={622} alt="Sergii Smagin" />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/debbie-butt/'} target="_blank">
                            <Image src={'/images/about/debbie-butt.png'} width={364} height={622} alt="Debbie Butt" />
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const metadata = await pagesMetaData('about')
    return { props: { metadata } };
}