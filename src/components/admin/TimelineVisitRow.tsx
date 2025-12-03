import { motion } from 'framer-motion';
import { ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import StatusChip from '../common/StatusChip';

interface TimelineVisitRowProps {
    visit: {
        time: string;
        patient: string;
        doctor: string;
        status: string;
    };
    isLast?: boolean;
}

export default function TimelineVisitRow({ visit, isLast }: TimelineVisitRowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-10 bg-gray-200" />
            )}

            <div className="flex items-start space-x-4">
                {/* Time Circle */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <ClockIcon className="w-5 h-5 text-blue-600" />
                    </div>
                </div>

                {/* Content */}
                <motion.div
                    whileHover={{ x: 4 }}
                    className="flex-1 bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <p className="font-medium text-gray-900">{visit.patient}</p>
                                <p className="text-sm text-gray-700">{visit.time}</p>
                            </div>
                            <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{visit.doctor}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <StatusChip status={visit.status} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
