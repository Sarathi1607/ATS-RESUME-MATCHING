'use client';

import { motion } from 'framer-motion';
import { getPortfolioData } from '@/lib/portfolio-data';

const Hero = () => {
  const { hero } = getPortfolioData();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {hero.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            {hero.subtitle}
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            {hero.description}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;