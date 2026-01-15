import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Calendar, Gauge, Fuel, Zap, Settings } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { Button } from '../components/ui/Button';

export const VehicleDetails = () => {
    const { vehicles } = useInventory();
    const { slug } = useParams();
    const vehicle = vehicles.find(v => v.slug === slug);

    if (!vehicle) {
        return (
            <div className="min-h-screen pt-32 text-center bg-luxury-black">
                <h1 className="text-3xl text-white font-bold mb-4">Vehicle Not Found</h1>
                <Link to="/inventory">
                    <Button variant="outline">Back to Inventory</Button>
                </Link>
            </div>
        );
    }

    // Mock gallery images (using the same one for now)
    const gallery = [vehicle.image, vehicle.image, vehicle.image];

    return (
        <>
            <Helmet>
                <title>{`${vehicle.year} ${vehicle.make} ${vehicle.model} | Apex Automotive`}</title>
                <meta name="description" content={`Buy a ${vehicle.year} ${vehicle.make} ${vehicle.model} at Apex Automotive. ${vehicle.description}`} />
            </Helmet>

            <div className="bg-luxury-black min-h-screen pb-20">

                {/* Breadcrumb / Back */}
                <div className="container mx-auto px-6 py-8">
                    <Link to="/inventory" className="inline-flex items-center text-zinc-400 hover:text-accent-gold transition-colors text-sm font-medium mb-6">
                        <ArrowLeft size={16} className="mr-2" /> Back to Inventory
                    </Link>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Gallery */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-lg overflow-hidden border border-zinc-800 aspect-[16/10]"
                            >
                                <img
                                    src={vehicle.image}
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="grid grid-cols-3 gap-4">
                                {gallery.map((img, idx) => (
                                    <div key={idx} className="rounded-md overflow-hidden border border-zinc-800 cursor-pointer hover:border-accent-gold transition-colors aspect-[16/10]">
                                        <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Info & Form */}
                        <div>
                            <div className="mb-2">
                                <span className="text-accent-gold font-bold tracking-wider text-sm">{vehicle.year}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {vehicle.make} {vehicle.model}
                            </h1>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-3xl font-bold text-white">${vehicle.price.toLocaleString()}</span>
                                <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-sm">{vehicle.status}</span>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-bold text-white mb-4">Technical Specifications</h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Calendar size={18} className="text-accent-gold" />
                                        <span>Year: {vehicle.year}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Gauge size={18} className="text-accent-gold" />
                                        <span>Mileage: {vehicle.mileage.toLocaleString()} mi</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Fuel size={18} className="text-accent-gold" />
                                        <span>Fuel: {vehicle.fuelType}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Settings size={18} className="text-accent-gold" />
                                        <span>Trans: {vehicle.transmission}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Zap size={18} className="text-accent-gold" />
                                        <span>Engine: {vehicle.engine}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Gauge size={18} className="text-accent-gold" />
                                        <span>Power: {vehicle.horsepower} HP</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {vehicle.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {vehicle.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-2 text-zinc-300">
                                            <div className="w-5 h-5 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold shrink-0">
                                                <Check size={12} />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Form */}
                            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-white mb-4">Request Information</h3>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="bg-luxury-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:border-accent-gold focus:outline-none w-full" />
                                        <input type="text" placeholder="Last Name" className="bg-luxury-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:border-accent-gold focus:outline-none w-full" />
                                    </div>
                                    <input type="email" placeholder="Email Address" className="bg-luxury-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:border-accent-gold focus:outline-none w-full" />
                                    <input type="tel" placeholder="Phone Number" className="bg-luxury-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:border-accent-gold focus:outline-none w-full" />
                                    <textarea rows="3" placeholder="I am interested in this vehicle..." className="bg-luxury-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:border-accent-gold focus:outline-none w-full"></textarea>
                                    <Button className="w-full">
                                        Send Request
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
