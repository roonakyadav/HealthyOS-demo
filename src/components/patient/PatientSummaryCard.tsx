import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface PatientSummaryCardProps {
    type: 'prescriptions' | 'overdue' | 'appointment';
    data: any;
}

const iconMap = {
    prescriptions: ClipboardDocumentListIcon,
    overdue: ClockIcon,
    appointment: CalendarDaysIcon,
};

export default function PatientSummaryCard({ type, data }: PatientSummaryCardProps) {
    const Icon = iconMap[type];

    const getContent = () => {
        switch (type) {
            case 'prescriptions':
                return {
                    title: <>{data.length} Active <span className="section-title">Prescriptions</span></>,
                    subtitle: 'Manage your medicines',
                    color: 'text-blue-600',
                };
            case 'overdue':
                return {
                    title: `${data} Overdue Medicines`,
                    subtitle: 'Check your schedule',
                    color: 'text-red-600',
                    alert: true,
                };
            case 'appointment':
                return data
                    ? {
                        title: data.date,
                        subtitle: `${data.time} - ${data.doctor}`,
                        color: 'text-green-600',
                    }
                    : {
                        title: 'No Upcoming Appointment',
                        subtitle: 'Schedule your next visit',
                        color: 'text-gray-600',
                    };
        }
    };

    const content = getContent();

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className={`inline-flex p-2 rounded-lg ${content.color === 'text-red-600' ? 'bg-red-50' : 'bg-blue-50'}`}>
                        <Icon className={`w-6 h-6 ${content.color}`} aria-label={`${type} icon`} />
                    </div>
                    {content.alert && (
                        <span className="inline-flex items-center px-2 py-1 ml-2 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                            Alert
                        </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mt-3">{content.title}</h3>
                    <p className="text-sm text-gray-700 mt-1">{content.subtitle}</p>
                </div>
            </div>
        </motion.div>
    );
}
