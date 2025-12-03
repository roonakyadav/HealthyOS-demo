import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import StatusChip from '../common/StatusChip';

interface Visit {
    date: string;
    doctor: string;
    status: string;
}

interface VisitPreviewCardProps {
    visits: Visit[];
}

export default function VisitPreviewCard({ visits }: VisitPreviewCardProps) {
    const router = useRouter();

    return (
        <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="inline-flex p-2 rounded-lg bg-blue-50">
                        <CalendarDaysIcon className="w-5 h-5 text-blue-600" aria-label="Visits icon" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3"><span className="section-title">Recent Visits</span></h3>
                </div>
                <button
                    onClick={() => router.push('/patient/visits')}
                    className="text-sm font-medium text-[#059669] hover:text-[#047857] transition-colors"
                >
                    View all visits →
                </button>
            </div>

            <div className="space-y-3">
                {visits.slice(0, 3).map((visit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-700">{visit.date}</div>
                            <div className="font-medium text-gray-900">{visit.doctor}</div>
                        </div>
                        <StatusChip status={visit.status} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
