'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircleIcon,
    ClockIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Toast from '../common/Toast';

interface ReassignModalProps {
    isOpen: boolean;
    onClose: () => void;
    visit: {
        id: number;
        patient: string;
        doctor: string;
        department: string;
        status: string;
    } | null;
    onReassign: (visitId: number, newDoctor: string) => void;
}

const doctors = [
    { name: 'Dr. Smith', department: 'Cardiology', availability: 'Online', appointmentsToday: 5 },
    { name: 'Dr. Patel', department: 'Neurology', availability: 'Offline', appointmentsToday: 2 },
    { name: 'Dr. Garcia', department: 'Pediatrics', availability: 'Online', appointmentsToday: 4 },
    { name: 'Dr. Chen', department: 'Orthopedics', availability: 'Online', appointmentsToday: 3 },
    { name: 'Dr. Wilson', department: 'Internal Medicine', availability: 'Away', appointmentsToday: 1 },
    { name: 'Dr. Taylor', department: 'Dermatology', availability: 'Online', appointmentsToday: 6 },
    { name: 'Dr. Davis', department: 'Psychiatry', availability: 'Offline', appointmentsToday: 0 },
    { name: 'Dr. Lee', department: 'Emergency Medicine', availability: 'Online', appointmentsToday: 7 },
    { name: 'Dr. Rodriguez', department: 'Surgery', availability: 'Away', appointmentsToday: 2 },
    { name: 'Dr. Johnson', department: 'Radiology', availability: 'Offline', appointmentsToday: 1 },
];

export default function ReassignModal({ isOpen, onClose, visit, onReassign }: ReassignModalProps) {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error' | 'warning';
    }>({
        visible: false,
        message: '',
        type: 'success',
    });

    const closeToast = () => {
        setToast({ ...toast, visible: false });
    };

    const handleReassign = () => {
        if (visit && selectedDoctor) {
            onReassign(visit.id, selectedDoctor);
            setToast({
                visible: true,
                message: `Visit reassigned to ${selectedDoctor} (demo only)`,
                type: 'success',
            });
            onClose();
        }
    };

    const getAvailabilityColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'online':
                return 'text-green-700 bg-green-100';
            case 'offline':
                return 'text-gray-700 bg-gray-100';
            case 'away':
                return 'text-yellow-700 bg-yellow-100';
            default:
                return 'text-gray-700 bg-gray-100';
        }
    };

    const getBusyLevel = (appointments: number) => {
        if (appointments <= 2) return { level: 'Low', color: 'bg-green-100 text-green-800' };
        if (appointments <= 4) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
        return { level: 'High', color: 'bg-red-100 text-red-800' };
    };

    const getIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'online':
                return CheckCircleIcon;
            default:
                return ClockIcon;
        }
    };

    if (!isOpen || !visit) return null;

    // Filter doctors by department or suggest alternatives
    const availableDoctors = doctors.filter(
        doc => doc.availability === 'Online' && doc.appointmentsToday < 6
    );

    const suggestedDoctors = availableDoctors
        .filter(doc => doc.department === visit.department)
        .sort((a, b) => a.appointmentsToday - b.appointmentsToday);

    return (
        <>
            ⋅{/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg- z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Reassign Visit
                            </h2>
                            <p className="text-sm text-gray-700 mt-1">
                                {visit.patient} • {visit.status} • {visit.department}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto">
                        {/* Current Assignment */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Assignment</h3>
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className="text-xs font-medium text-white">
                                        {visit.doctor.split(' ')[1]?.[0] || visit.doctor[0]}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{visit.doctor}</div>
                                    <div className="text-sm text-gray-700">{visit.department}</div>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Selection */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-600">
                                Select New Doctor
                            </label>

                            {suggestedDoctors.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-green-700 mb-2">Recommended</h4>
                                    <select
                                        value={selectedDoctor}
                                        onChange={(e) => setSelectedDoctor(e.target.value)}
                                        className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    >
                                        <option value="">Choose a recommended doctor...</option>
                                        {suggestedDoctors.slice(0, 3).map((doctor) => (
                                            <option key={doctor.name} value={doctor.name}>
                                                {doctor.name} ({doctor.appointmentsToday} appointments)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">All Available Doctors</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                                    {availableDoctors.map((doctor) => {
                                        const IconComponent = getIcon(doctor.availability);
                                        const busyLevel = getBusyLevel(doctor.appointmentsToday);

                                        return (
                                            <div
                                                key={doctor.name}
                                                onClick={() => setSelectedDoctor(doctor.name)}
                                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedDoctor === doctor.name
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-xs font-medium text-blue-600">
                                                                {doctor.name.split(' ')[1]?.[0] || doctor.name[0]}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {doctor.name}
                                                            </div>
                                                            <div className="text-xs text-gray-700">
                                                                {doctor.department}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-1">
                                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(doctor.availability)}`}>
                                                            <IconComponent className="w-3 h-3 mr-1" />
                                                            {doctor.availability}
                                                        </div>
                                                        <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${busyLevel.color}`}>
                                                            {busyLevel.level}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-xs text-gray-700 text-center">
                                                    {doctor.appointmentsToday} today's appointments
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Selected Summary */}
                        {selectedDoctor && (
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-700 mb-2">Reassignment Summary</h4>
                                <p className="text-sm text-blue-600">
                                    <strong>{visit.patient}</strong> will be reassigned from{' '}
                                    <strong>{visit.doctor}</strong> to <strong>{selectedDoctor}</strong>
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReassign}
                                disabled={!selectedDoctor}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                Confirm Reassignment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.visible}
                onClose={closeToast}
            />
        </>
    );
}
