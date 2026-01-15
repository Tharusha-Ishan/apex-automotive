import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-luxury-charcoal border-t border-zinc-800 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold tracking-tighter text-white">
                                APEX<span className="text-accent-gold">.</span>
                            </span>
                        </div>
                        <p className="text-zinc-400 mb-6 leading-relaxed">
                            Premier destination for luxury and exotic vehicles.
                            We redefine the car buying experience with exceptional service and an exclusive inventory.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-accent-gold hover:text-luxury-black transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Inventory', 'About Us', 'Financing', 'Sell Your Car', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-zinc-400 hover:text-accent-gold transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Showroom Hours</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li className="flex justify-between">
                                <span>Mon - Fri</span>
                                <span className="text-white">9:00 AM - 7:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span className="text-white">10:00 AM - 5:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span className="text-accent-gold">By Appointment</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-accent-gold shrink-0 mt-1" size={18} />
                                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-accent-gold shrink-0" size={18} />
                                <span>+1 (800) 555-0123</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-accent-gold shrink-0" size={18} />
                                <span>concierge@apexauto.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
                    <p>&copy; 2026 Apex Automotive. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
