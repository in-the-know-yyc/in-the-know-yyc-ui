import Header from '../components/cms/Header';
import Footer from '../components/cms/Footer';

export default function CmsLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}