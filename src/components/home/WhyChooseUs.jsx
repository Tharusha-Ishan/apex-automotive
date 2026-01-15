import { motion } from 'framer-motion';
import { ShieldCheck, Award, TrendingUp, Clock } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Certified Authenticity',
        description: 'Every vehicle undergoes a rigorous 150-point inspection and comes with a verified history report.'
    },
    {
        icon: Award,
        title: 'Premium Selection',
        description: 'We curate only the finest examples of luxury and performance vehicles from around the globe.'
    },
    {
        icon: TrendingUp,
        title: 'Investment Value',
        description: 'Expert guidance on vehicles that offer not just driving pleasure, but long-term asset appreciation.'
    },
    {
        icon: Clock,
        title: 'Concierge Service',
        description: 'From private viewings to door-to-door delivery, we handle every detail of your acquisition.'
    }
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-luxury-charcoal relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        The Apex <span className="text-accent-gold">Advantage</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        We don't just sell cars; we deliver an unparalleled ownership experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-zinc-800/50 p-8 rounded-sm border border-zinc-700 hover:border-accent-gold transition-colors group"
                        >
                            <div className="w-12 h-12 bg-luxury-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="text-accent-gold" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
