import { motion } from 'framer-motion';
import {
    ArrowPathIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import StatusChip from '../common/StatusChip';

interface VisitRowProps {
    visit: {
        id: number;
        patient: string;
        doctor: string;
        department: string;
        time: string;
        date: string;
        status: string;
        reason: string;
    };
    onReassign: (visit: any) => void;
    onQuickView: (visit: any) => void;
    delay?: number;
}

export default function VisitRow({ visit, onReassign, onQuickView, delay = 0 }: VisitRowProps) {
    const getDepartmentColor = (dept: string) => {
        const colors = {
            Cardiology: 'bg-red-100 text-red-800',
            Neurology: 'bg-purple-100 text-purple-800',
            Pediatrics: 'bg-blue-100 text-blue-800',
            Orthopedics: 'bg-green-100 text-green-800',
            'Internal Medicine': 'bg-yellow-100 text-yellow-800',
            Dermatology: 'bg-pink-100 text-pink-800',
        };
        return colors[dept as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <motion.tr
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="group relative"
        >
            {/* Left highlight stripe */}
            <motion.td
                className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 origin-left"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />

            {/* Date & Time */}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {visit.date}
                </div>
                <div className="text-sm text-gray-700">
                    {visit.time}
                </div>
            </td>

            {/* Patient */}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {visit.patient}
                </div>
            </td>

            {/* Department */}
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(visit.department)}`}>
                    {visit.department}
                </span>
            </td>

            {/* Doctor */}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                                {visit.doctor.split(' ')[1]?.[0] || visit.doctor[0]}
                            </span>
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                            {visit.doctor}
                        </div>
                    </div>
                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4 whitespace-nowrap">
                <StatusChip status={visit.status} />
            </td>

            {/* Actions */}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onReassign(visit)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="Reassign doctor"
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onQuickView(visit)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors group"
                        title="Quick view"
                    >
                        <EyeIcon className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </motion.tr>
    );
}
