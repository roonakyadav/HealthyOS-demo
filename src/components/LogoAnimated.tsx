'use client';

import { motion } from 'framer-motion';

export default function LogoAnimated() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
        >
            {/* Logo */}
            <div className="mb-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    <span className="text-[#2563EB]">Hospital</span>
                    <span className="text-[#059669]">OS</span>
                </h1>
                {/* Heartbeat animation */}
                <motion.div
                    className="flex justify-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <motion.div
                        className="w-1 h-1 bg-[#059669] rounded-full"
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 font-medium"
            >
                Modern hospital operating system
            </motion.p>
        </motion.div>
    );
}
