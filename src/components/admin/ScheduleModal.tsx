import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: {
        name: string;
        department: string;
    } | null;
}

const mockSchedule = [
    { time: "9:00 AM", status: "Booked" },
    { time: "9:30 AM", status: "Booked" },
    { time: "10:00 AM", status: "Booked" },
    { time: "10:30 AM", status: "Available" },
    { time: "11:00 AM", status: "Booked" },
    { time: "11:30 AM", status: "Available" },
    { time: "12:00 PM", status: "Break" },
    { time: "12:30 PM", status: "Break" },
    { time: "1:00 PM", status: "Available" },
    { time: "1:30 PM", status: "Booked" },
    { time: "2:00 PM", status: "Booked" },
    { time: "2:30 PM", status: "Available" },
    { time: "3:00 PM", status: "Booked" },
    { time: "3:30 PM", status: "Available" },
    { time: "4:00 PM", status: "Booked" },
    { time: "4:30 PM", status: "Available" },
];

export default function ScheduleModal({ isOpen, onClose, doctor }: ScheduleModalProps) {
    if (!isOpen || !doctor) return null;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available':
                return 'text-green-700 bg-green-100 border-green-200';
            case 'booked':
                return 'text-red-700 bg-red-100 border-red-200';
            case 'break':
                return 'text-yellow-700 bg-yellow-100 border-yellow-200';
            default:
                return 'text-gray-700 bg-gray-100 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available':
                return CheckCircleIcon;
            case 'booked':
            case 'break':
                return ClockIcon;
            default:
                return ClockIcon;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg- z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Schedule: {doctor.name}
                            </h2>
                            <p className="text-sm text-gray-700">{doctor.department}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto">
                        <div className="mb-4">
                            <p className="text-sm text-gray-700">
                                Today's schedule overview • All times considered
                            </p>
                        </div>

                        {/* Schedule Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {mockSchedule.map((slot, index) => {
                                const IconComponent = getStatusIcon(slot.status);
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center p-3 rounded-lg border ${getStatusColor(slot.status)}`}
                                    >
                                        <div className="flex items-center space-x-2 flex-1">
                                            <IconComponent className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm font-medium">{slot.time}</span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            {slot.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                <div>
                                    <div className="text-lg font-bold text-red-700">
                                        {mockSchedule.filter(s => s.status === 'Booked').length}
                                    </div>
                                    <div className="text-sm text-gray-700">Booked</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-green-700">
                                        {mockSchedule.filter(s => s.status === 'Available').length}
                                    </div>
                                    <div className="text-sm text-gray-700">Available</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-yellow-700">
                                        {mockSchedule.filter(s => s.status === 'Break').length}
                                    </div>
                                    <div className="text-sm text-gray-700">Break</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-700">
                                        {mockSchedule.length}
                                    </div>
                                    <div className="text-sm text-gray-700">Total Slots</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
