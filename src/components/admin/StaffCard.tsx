'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

interface StaffCardProps {
    doctor: {
        name: string;
        department: string;
        availability: string;
        appointmentsToday: number;
    };
    onViewSchedule: () => void;
}

export default function StaffCard({ doctor, onViewSchedule }: StaffCardProps) {
    const [isAvailable, setIsAvailable] = useState(doctor.availability === 'Online');

    const getAvailabilityColor = () => {
        return isAvailable ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50';
    };

    const getBusyLevel = (appointments: number) => {
        if (appointments <= 2) return { level: 'Low', color: 'bg-green-100 text-green-800' };
        if (appointments <= 4) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
        return { level: 'High', color: 'bg-red-100 text-red-800' };
    };

    const busyLevel = getBusyLevel(doctor.appointmentsToday);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${getAvailabilityColor()}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-700">{doctor.department}</p>
                    </div>
                </div>

                {/* Availability Toggle */}
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs text-gray-700 font-medium">
                        {isAvailable ? 'Online' : 'Offline'}
                    </span>
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAvailable(!isAvailable);
                        }}
                        className={`relative w-12 h-6 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}
                    >
                        <motion.div
                            animate={{ x: isAvailable ? 24 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="w-4 h-4 bg-white rounded-full absolute top-1"
                        />
                    </motion.button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-2xl font-bold text-gray-900">{doctor.appointmentsToday}</div>
                    <div className="text-sm text-gray-700">Today's Appointments</div>
                </div>
                <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${busyLevel.color}`}>
                    {busyLevel.level}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewSchedule();
                    }}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Schedule"
                >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View Schedule
                </button>

                <div className="flex items-center space-x-2">
                    <button
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Edit Availability"
                    >
                        <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 text-gray-400 cursor-not-allowed"
                        title="Demo only — cannot remove staff"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
