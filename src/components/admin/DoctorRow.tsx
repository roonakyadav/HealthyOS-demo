import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface DoctorRowProps {
    doctor: {
        name: string;
        department: string;
        availability: string;
        appointmentsToday: number;
    };
}

export default function DoctorRow({ doctor }: DoctorRowProps) {
    const getAvailabilityColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'online':
                return 'text-green-500 bg-green-100';
            case 'offline':
                return 'text-gray-700 bg-gray-100';
            case 'away':
                return 'text-yellow-500 bg-yellow-100';
            default:
                return 'text-gray-700 bg-gray-100';
        }
    };

    const getBusyLevel = (appointments: number) => {
        if (appointments <= 2) return { level: 'Low', color: 'bg-green-100 text-green-800' };
        if (appointments <= 4) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
        return { level: 'High', color: 'bg-red-100 text-red-800' };
    };

    const busyLevel = getBusyLevel(doctor.appointmentsToday);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ backgroundColor: 'rgb(249, 250, 251)' }}
            className="py-4 px-6 rounded-xl transition-colors cursor-pointer group"
        >
            <div className="flex items-center justify-between">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    {/* Doctor Name */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                                {doctor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{doctor.name}</p>
                            <p className="text-sm text-gray-700">{doctor.department}</p>
                        </div>
                    </div>

                    {/* Department (hidden on mobile) */}
                    <div className="hidden md:block">
                        <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                            {doctor.department}
                        </span>
                    </div>

                    {/* Availability */}
                    <div className="flex justify-center md:justify-start">
                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(doctor.availability)}`}>
                            <motion.div
                                animate={{
                                    scale: doctor.availability.toLowerCase() === 'online' ? [1, 1.2, 1] : 1
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="w-2 h-2 bg-current rounded-full mr-2"
                            />
                            {doctor.availability}
                        </div>
                    </div>

                    {/* Appointments & Busy Level */}
                    <div className="flex justify-center md:justify-end">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">
                                {doctor.appointmentsToday}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${busyLevel.color}`}>
                                {busyLevel.level}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Arrow Icon */}
                <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="ml-4  group-hover: transition-opacity"
                >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </motion.div>
            </div>
        </motion.div>
    );
}
