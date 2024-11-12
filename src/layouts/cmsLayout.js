import {Providers} from "../app/providers";

import Header from '../components/cms/Header';
import Footer from '../components/cms/Footer';

export default function CmsLayout({ children }) {
    return (
        <Providers>
            <div id="cmsLayout">
                <Header />
                {children}
                <Footer />
            </div>
        </Providers>
    );
}