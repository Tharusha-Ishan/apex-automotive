import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInventory } from '../context/InventoryContext';
import { CarCard } from '../components/vehicles/CarCard';
import { Button } from '../components/ui/Button';

export const Inventory = () => {
    const { vehicles } = useInventory();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({
        make: '',
        priceRange: '',
        fuelType: ''
    });

    // Extract unique filter options
    const makes = [...new Set(vehicles.map(v => v.make))];
    const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))];

    // Filter Logic
    const filteredVehicles = useMemo(() => {
        return vehicles.filter(car => {
            const matchMake = !filters.make || car.make === filters.make;
            const matchFuel = !filters.fuelType || car.fuelType === filters.fuelType;

            let matchPrice = true;
            if (filters.priceRange) {
                if (filters.priceRange === '100-200') matchPrice = car.price >= 100000 && car.price <= 200000;
                else if (filters.priceRange === '200-500') matchPrice = car.price > 200000 && car.price <= 500000;
                else if (filters.priceRange === '500+') matchPrice = car.price > 500000;
            }

            return matchMake && matchFuel && matchPrice;
        });
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ make: '', priceRange: '', fuelType: '' });
    };

    const FilterSidebar = () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Filters</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-zinc-400 hover:text-accent-gold underline"
                >
                    Clear All
                </button>
            </div>

            {/* Make Filter */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Make</label>
                <div className="space-y-2">
                    {makes.map(make => (
                        <label key={make} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="make"
                                checked={filters.make === make}
                                onChange={() => handleFilterChange('make', make)}
                                className="accent-accent-gold w-4 h-4 bg-zinc-800 border-zinc-600 focus:ring-accent-gold"
                            />
                            <span className={`text-sm ${filters.make === make ? 'text-accent-gold' : 'text-zinc-400 group-hover:text-white'}`}>
                                {make}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Price Range</label>
                <div className="space-y-2">
                    {[
                        { label: '$100k - $200k', value: '100-200' },
                        { label: '$200k - $500k', value: '200-500' },
                        { label: '$500k+', value: '500+' }
                    ].map(range => (
                        <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="price"
                                checked={filters.priceRange === range.value}
                                onChange={() => handleFilterChange('priceRange', range.value)}
                                className="accent-accent-gold w-4 h-4"
                            />
                            <span className={`text-sm ${filters.priceRange === range.value ? 'text-accent-gold' : 'text-zinc-400 group-hover:text-white'}`}>
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Fuel Filter */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Fuel Type</label>
                <div className="space-y-2">
                    {fuelTypes.map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="fuel"
                                checked={filters.fuelType === type}
                                onChange={() => handleFilterChange('fuelType', type)}
                                className="accent-accent-gold w-4 h-4"
                            />
                            <span className={`text-sm ${filters.fuelType === type ? 'text-accent-gold' : 'text-zinc-400 group-hover:text-white'}`}>
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Inventory | Apex Automotive</title>
                <meta name="description" content="Browse our current inventory of luxury and exotic vehicles." />
            </Helmet>

            <div className="bg-luxury-black min-h-screen pb-20">
                {/* Header */}
                <div className="bg-zinc-900 py-12 border-b border-zinc-800">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold text-white mb-2">Current <span className="text-accent-gold">Inventory</span></h1>
                        <p className="text-zinc-400">Showing {filteredVehicles.length} vehicles</p>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <FilterSidebar />
                        </aside>

                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-6">
                            <Button
                                variant="outline"
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="w-full flex justify-between"
                            >
                                <span>Filters</span>
                                <Filter size={18} />
                            </Button>
                        </div>

                        {/* Grid */}
                        <div className="flex-grow">
                            {filteredVehicles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {filteredVehicles.map((vehicle, index) => (
                                        <CarCard key={vehicle.id} vehicle={vehicle} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                    <h3 className="text-xl font-bold text-white mb-2">No vehicles found</h3>
                                    <p className="text-zinc-400 mb-6">Try adjusting your filters to see more results.</p>
                                    <Button onClick={clearFilters}>Clear Filters</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                    {isMobileFiltersOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/80 lg:hidden"
                        >
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                className="absolute right-0 top-0 bottom-0 w-80 bg-luxury-charcoal p-6 overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-bold text-white">Filters</h2>
                                    <button onClick={() => setIsMobileFiltersOpen(false)} className="text-zinc-400 hover:text-white">
                                        <X size={24} />
                                    </button>
                                </div>
                                <FilterSidebar />
                                <div className="mt-8 pt-6 border-t border-zinc-700">
                                    <Button onClick={() => setIsMobileFiltersOpen(false)} className="w-full">
                                        Show {filteredVehicles.length} Vehicles
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
