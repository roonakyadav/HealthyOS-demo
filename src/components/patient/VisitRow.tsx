import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EyeIcon } from '@heroicons/react/24/outline';
import StatusChip from '../common/StatusChip';

interface Prescription {
    name: string;
    dose: string;
    frequency: string;
    duration: string;
}

interface Visit {
    id: number;
    date: string;
    doctor: string;
    doctorSpecialization: string;
    reason: string;
    symptoms: string;
    diagnosis: string;
    prescriptions: Prescription[];
    notes: string;
    status: string;
}

interface VisitRowProps {
    visit: Visit;
}

export default function VisitRow({ visit }: VisitRowProps) {
    const router = useRouter();

    const formattedDate = new Date(visit.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 flex-1">
                    <div className="min-w-0 flex-1">
                        <div className="text-sm text-gray-700 mb-1">Date</div>
                        <div className="font-medium text-gray-900">{formattedDate}</div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="text-sm text-gray-700 mb-1">Doctor</div>
                        <div className="font-medium text-gray-900">{visit.doctor}</div>
                        <div className="text-sm text-gray-700">{visit.doctorSpecialization}</div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="text-sm text-gray-700 mb-1">Reason</div>
                        <div className="font-medium text-gray-900">{visit.reason}</div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <StatusChip status={visit.status} />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => router.push(`/patient/visits/${visit.id}`)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-[#059669] hover:text-[#047857] hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View details
                </button>
            </div>
        </motion.div>
    );
}
