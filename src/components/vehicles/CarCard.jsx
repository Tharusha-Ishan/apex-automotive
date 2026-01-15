import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gauge, Calendar, Fuel } from 'lucide-react';
import { Button } from '../ui/Button';

export const CarCard = ({ vehicle, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-zinc-900 overflow-hidden border border-zinc-800 hover:border-accent-gold/50 transition-colors duration-300"
        >
            {/* Image Container */}
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={vehicle.image}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-accent-gold text-luxury-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    {vehicle.status}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-4">
                    <p className="text-zinc-400 text-sm font-medium">{vehicle.year} {vehicle.make}</p>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-gold transition-colors truncate">
                        {vehicle.model}
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Gauge size={16} className="text-accent-gold" />
                        <span>{vehicle.mileage.toLocaleString()} mi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Fuel size={16} className="text-accent-gold" />
                        <span>{vehicle.fuelType}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-white">
                        ${vehicle.price.toLocaleString()}
                    </span>
                    <Link to={`/inventory/${vehicle.slug}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
