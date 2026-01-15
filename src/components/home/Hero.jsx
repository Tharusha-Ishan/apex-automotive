import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 w-full h-full"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=3231&auto=format&fit=crop"
                    alt="Luxury Car Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-start pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                >
                    Experince the <span className="text-accent-gold">Extraordinary</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-2xl"
                >
                    Discover a curated collection of the world's most exclusive high-performance vehicles.
                </motion.p>

                {/* Search / Filter Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm shadow-xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs text-zinc-400 mb-1 uppercase tracking-wider font-semibold">Make</label>
                            <select className="bg-transparent border-b border-zinc-500 text-white py-2 focus:outline-none focus:border-accent-gold child:bg-luxury-charcoal">
                                <option value="">All Makes</option>
                                <option value="porsche">Porsche</option>
                                <option value="ferrari">Ferrari</option>
                                <option value="lamborghini">Lamborghini</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs text-zinc-400 mb-1 uppercase tracking-wider font-semibold">Model</label>
                            <select className="bg-transparent border-b border-zinc-500 text-white py-2 focus:outline-none focus:border-accent-gold child:bg-luxury-charcoal">
                                <option value="">All Models</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs text-zinc-400 mb-1 uppercase tracking-wider font-semibold">Price Range</label>
                            <select className="bg-transparent border-b border-zinc-500 text-white py-2 focus:outline-none focus:border-accent-gold child:bg-luxury-charcoal">
                                <option value="">Any Price</option>
                                <option value="100-200">$100k - $200k</option>
                                <option value="200-500">$200k - $500k</option>
                                <option value="500+">$500k+</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <Button variant="primary" className="w-full gap-2">
                                <Search size={18} />
                                Find Vehicle
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent-gold to-transparent" />
            </motion.div>
        </div>
    );
};
