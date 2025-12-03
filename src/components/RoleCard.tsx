'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    HeartIcon,
    UserCircleIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface RoleCardProps {
    title: string;
    description: string;
    icon: 'doctor' | 'patient' | 'management';
    buttonColor: string;
    route: string;
}

export default function RoleCard({
    title,
    description,
    icon,
    buttonColor,
    route,
}: RoleCardProps) {
    const router = useRouter();

    const iconMap = {
        doctor: HeartIcon,
        patient: UserCircleIcon,
        management: BuildingOfficeIcon,
    };

    const IconComponent = iconMap[icon];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => router.push(route)}
        >
            {/* Icon */}
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center mb-4"
            >
                <IconComponent className="w-16 h-16 text-gray-600" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

            {/* Description */}
            <p className="text-gray-600 mb-6">{description}</p>

            {/* Button */}
            <button
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${buttonColor} hover:brightness-110`}
            >
                Enter portal
            </button>
        </motion.div>
    );
}
