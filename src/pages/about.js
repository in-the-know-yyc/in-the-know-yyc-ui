import "../app/styles/components/textPages.css";

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

export default function About({ metadata }) {
    return (
        <>
            <PagesMetaData metadata={metadata} />
            <main className="textPage">
                <h1>About Us</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam tincidunt lacus, facilisis pellentesque lectus volutpat id. Cras at odio sit amet nisi facilisis finibus lobortis id orci. Integer urna nulla, ultricies sed tortor et, fermentum facilisis ex. Donec rhoncus commodo sem, non mattis libero pellentesque a. Praesent feugiat tortor libero, eget viverra neque dictum quis. Suspendisse cursus massa non dolor lobortis dignissim. Etiam at dolor quis sapien placerat laoreet. Nulla facilisi. Suspendisse id aliquam metus. Vivamus aliquam felis non nulla pretium molestie. Donec ac ante eget ex imperdiet feugiat. Ut sed dolor lacinia, convallis lectus ut, euismod sem. Suspendisse porttitor purus hendrerit, fermentum leo non, tincidunt erat. Curabitur eget nunc purus. Integer at ex sapien. Integer et urna augue.</p>
                <p>Ut enim ex, ullamcorper ullamcorper eros a, pulvinar rutrum urna. Etiam molestie libero a dolor tempus, non elementum massa gravida. Ut eget dapibus arcu, ac convallis justo. Vestibulum pretium enim arcu. Quisque sodales tellus lectus, in eleifend sapien vehicula ut. Integer dictum turpis tempus odio tincidunt, vel facilisis dui faucibus. Sed erat diam, tincidunt sed odio aliquet, lacinia commodo enim. Suspendisse mollis arcu bibendum facilisis pretium. Pellentesque egestas pellentesque semper. Nulla metus mauris, aliquet in erat non, tincidunt aliquet augue. Aenean convallis, sem eget tempor ullamcorper, elit libero faucibus nunc, vel sagittis quam ipsum porttitor augue. Nunc eu lectus sed tortor venenatis molestie ut non elit. Sed lacinia massa in velit imperdiet efficitur. Aliquam in cursus justo. Duis semper nisl a consectetur dapibus. Curabitur ultricies urna a porttitor dignissim.</p>
                <p>Nullam nibh ex, tincidunt finibus iaculis eget, semper quis metus. Quisque fringilla ligula ante, eu interdum libero volutpat vitae. Donec ut tincidunt lectus, sed mollis tortor. Proin enim elit, tempus et eros in, volutpat tristique mi. Duis malesuada et tortor in sollicitudin. Nam fermentum, dolor quis dictum rutrum, elit ipsum porttitor metus, at pretium leo lacus vitae ipsum. In malesuada dui nec neque finibus rutrum.</p>
                <p>Suspendisse hendrerit at quam in mollis. Aenean laoreet fermentum posuere. Donec sollicitudin quis mauris vel varius. Integer molestie posuere pulvinar. Aliquam hendrerit, sapien in egestas pretium, felis purus interdum orci, vitae rhoncus tortor sapien eu elit. Vestibulum vel nulla ut dui feugiat consectetur quis vel felis. Phasellus et tortor eu erat pulvinar tristique. Quisque id blandit lorem, sed elementum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae ultrices risus, dictum venenatis nulla. Fusce tempor magna bibendum nisi auctor, nec mollis nisi feugiat. Ut tempor enim sagittis, varius odio in, scelerisque diam.</p>
                <p>Maecenas pellentesque ex at ex rhoncus, eget gravida lorem tempor. Curabitur feugiat ultricies tellus volutpat feugiat. Morbi ac elit in tortor convallis venenatis. Curabitur nisl massa, suscipit sit amet mattis non, convallis ac elit. Suspendisse ultricies vel felis non volutpat. Phasellus rhoncus mattis pellentesque. Donec arcu neque, dictum pharetra justo vel, sagittis mollis dui. Donec posuere porta tellus, id pellentesque justo lacinia id. Nulla consequat ipsum sed lorem volutpat imperdiet. Nunc placerat massa vitae dictum suscipit.</p>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const metadata = await pagesMetaData('about')
    return { props: { metadata } };
}