import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import StatusChip from '../common/StatusChip';

interface Visit {
    id: number;
    patient: string;
    time: string;
    reason: string;
    status: string;
}

interface VisitCardProps {
    visit: Visit;
}

export default function VisitCard({ visit }: VisitCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/doctor/visits/${visit.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="inline-flex p-2 rounded-lg bg-blue-50">
                        <UserIcon className="w-5 h-5 text-blue-600" aria-label="Patient icon" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{visit.patient}</h3>
                        <div className="flex items-center text-sm text-gray-700 mt-1">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {visit.time}
                        </div>
                    </div>
                </div>
                <StatusChip status={visit.status} />
            </div>

            <p className="text-gray-700 mb-4">{visit.reason}</p>

            <button
                onClick={handleClick}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${visit.status === 'Pending'
                        ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
            >
                {visit.status === 'Pending' ? 'Start Consultation' : 'View'}
            </button>
        </motion.div>
    );
}
