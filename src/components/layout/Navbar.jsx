import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, Phone, Search } from 'lucide-react';
import { clsx } from 'clsx';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Inventory', path: '/inventory' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-luxury-black/90 backdrop-blur-md border-zinc-900 py-3'
                    : 'bg-transparent border-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-sm flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                        <span className="text-luxury-black font-bold text-xl group-hover:-rotate-45 transition-transform duration-300">A</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        APEX<span className="text-accent-gold">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={clsx(
                                'text-sm font-medium tracking-wide transition-colors relative hover:text-accent-gold',
                                location.pathname === link.path ? 'text-accent-gold' : 'text-zinc-400'
                            )}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-gold"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-zinc-400 hover:text-white transition-colors">
                        <Search size={20} />
                    </button>
                    <Link to="/inventory">
                        <button className="px-5 py-2.5 bg-white text-luxury-black font-semibold text-sm rounded-sm hover:bg-zinc-200 transition-colors">
                            View Inventory
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-luxury-black border-t border-zinc-900 overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg font-medium text-zinc-300 hover:text-accent-gold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-zinc-800" />
                            <Link to="/inventory" className="text-center py-3 bg-accent-gold text-luxury-black font-bold rounded-sm">
                                Browse Cars
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
