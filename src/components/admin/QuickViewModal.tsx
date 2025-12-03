import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import StatusChip from '../common/StatusChip';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    visit: {
        id: number;
        patient: string;
        doctor: string;
        department: string;
        time: string;
        date: string;
        status: string;
        reason: string;
    } | null;
}

export default function QuickViewModal({ isOpen, onClose, visit }: QuickViewModalProps) {
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

    if (!isOpen || !visit) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg- z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Visit Details
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Patient Header */}
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-lg font-medium text-blue-600">
                                    {visit.patient.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{visit.patient}</h3>
                            <p className="text-sm text-gray-700">{visit.date} • {visit.time}</p>
                        </div>

                        {/* Details Grid */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Status</span>
                                <StatusChip status={visit.status} />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Department</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(visit.department)}`}>
                                    {visit.department}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Doctor</span>
                                <span className="text-sm font-medium text-gray-900">{visit.doctor}</span>
                            </div>

                            <div>
                                <span className="text-sm font-medium text-gray-600 block mb-2">Reason</span>
                                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                                    {visit.reason}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <button
                                disabled
                                className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-not-allowed"
                                title="Demo only — cannot open consultation"
                            >
                                <ArrowRightIcon className="w-4 h-4 mr-2" />
                                Open Doctor Consultation
                            </button>
                            <p className="text-xs text-gray-700 text-center mt-2">
                                Demo only — consultation view not implemented yet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
