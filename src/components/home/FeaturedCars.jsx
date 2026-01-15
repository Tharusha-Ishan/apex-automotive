import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CarCard } from '../vehicles/CarCard';

import { useInventory } from '../../context/InventoryContext';

export const FeaturedCars = () => {
    // Select a subset of vehicles for the homepage
    const { vehicles } = useInventory();
    const featured = vehicles.slice(0, 3);

    return (
        <section className="py-24 bg-luxury-black">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Featured <span className="text-accent-gold">Inventory</span>
                        </h2>
                        <p className="text-zinc-400 max-w-lg">
                            Hand-picked from our exclusive collection. Each vehicle represents the pinnacle of automotive engineering and luxury.
                        </p>
                    </div>
                    <Link
                        to="/inventory"
                        className="hidden md:flex items-center gap-2 text-accent-gold hover:text-white transition-colors font-medium group"
                    >
                        View All Inventory
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((vehicle, index) => (
                        <CarCard key={vehicle.id} vehicle={vehicle} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        to="/inventory"
                        className="inline-flex items-center gap-2 text-accent-gold hover:text-white transition-colors font-medium"
                    >
                        View All Inventory
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
