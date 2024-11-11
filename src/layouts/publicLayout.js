import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout({ children }) {
    return (
        <div id="publicLayout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}