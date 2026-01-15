import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/home/Hero';
import { FeaturedCars } from '../components/home/FeaturedCars';
import { WhyChooseUs } from '../components/home/WhyChooseUs';

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Apex Automotive | Premium Luxury & Sports Cars</title>
                <meta name="description" content="Discover a curated collection of the world's most exclusive high-performance vehicles. Apex Automotive - Experience the Extraordinary." />
                <meta name="keywords" content="luxury cars, sports cars, supercar, dealership, porsche, ferrari, lamborghini" />
                <meta property="og:title" content="Apex Automotive | Premium Luxury & Sports Cars" />
                <meta property="og:description" content="Discover a curated collection of the world's most exclusive high-performance vehicles." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="bg-luxury-black min-h-screen">
                <Hero />
                <FeaturedCars />
                <WhyChooseUs />

                {/* Newsletter / CTA Section could go here */}
            </div>
        </>
    );
};
