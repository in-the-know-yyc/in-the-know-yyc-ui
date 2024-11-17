import { useRouter } from 'next/router';
import {Providers} from "../app/providers";

import Header from '../components/cms/Header';
import Footer from '../components/cms/Footer';

export default function CmsLayout({ children }) {
    const router = useRouter();
    const currentPage = router.pathname;
    
    return (
        <Providers>
            <div id="cmsLayout">
                {!currentPage.startsWith('/cms/login') ? <Header /> : <Header /> }
                {children}
                {!currentPage.startsWith('/cms/login') ? <Footer /> : '' }
            </div>
        </Providers>
    );
}