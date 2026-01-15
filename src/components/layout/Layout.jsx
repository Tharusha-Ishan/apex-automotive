import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-luxury-black text-white flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};
