'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    XMarkIcon,
    CalendarDaysIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import Toast from '../common/Toast';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import { LocalDB } from '../../services/localDB';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
}

const AVAILABLE_TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
];

export default function AppointmentModal({ isOpen, onClose, patientId }: AppointmentModalProps) {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [reason, setReason] = useState('');
    const [availableDoctors, setAvailableDoctors] = useState<any[]>([]);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);

    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error' | 'warning';
    }>({
        visible: false,
        message: '',
        type: 'success',
    });

    const departments = LocalDB.getDepartments();

    const closeToast = () => {
        setToast({ ...toast, visible: false });
    };

    // Update available doctors when department changes
    useEffect(() => {
        if (selectedDepartment) {
            const doctors = LocalDB.getAvailableDoctorsByDepartment(selectedDepartment);
            setAvailableDoctors(doctors);

            // Reset doctor selection if current doctor is not in the new department
            const currentDoctorIsValid = doctors.some(d => d.name === selectedDoctor);
            if (!currentDoctorIsValid) {
                setSelectedDoctor('');
                setAvailableSlots([]);
            }
        } else {
            setAvailableDoctors([]);
            setSelectedDoctor('');
            setAvailableSlots([]);
        }
    }, [selectedDepartment, selectedDoctor]);

    // Update available time slots when doctor and date change
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            const doctor = LocalDB.getDoctorByName(selectedDoctor);
            if (doctor) {
                // This is a simplified availability check
                // In a real system, this would check the doctor's schedule for that date
                const busySlots = AVAILABLE_TIME_SLOTS.slice(0, doctor.appointmentsToday);
                const availableSlots = AVAILABLE_TIME_SLOTS.filter(slot => !busySlots.includes(slot));
                setAvailableSlots(availableSlots);
            }
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDoctor, selectedDate]);

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedDepartment('');
            setSelectedDoctor('');
            setSelectedDate('');
            setSelectedTime('');
            setReason('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime || !reason.trim()) {
            setToast({
                visible: true,
                message: 'Please fill in all required fields',
                type: 'error',
            });
            return;
        }

        try {
            const doctor = LocalDB.getDoctorByName(selectedDoctor);
            if (!doctor) {
                setToast({
                    visible: true,
                    message: 'Doctor not found',
                    type: 'error',
                });
                return;
            }

            // Add the appointment
            LocalDB.addAppointment({
                patientId,
                doctorId: doctor.id,
                department: selectedDepartment,
                date: selectedDate,
                time: selectedTime,
                status: 'Upcoming',
                reason: reason.trim(),
            });

            setToast({
                visible: true,
                message: `Appointment booked for ${selectedDate} at ${selectedTime} with ${selectedDoctor}`,
                type: 'success',
            });

            // Close modal after success
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            setToast({
                visible: true,
                message: 'Failed to book appointment. Please try again.',
                type: 'error',
            });
        }
    };

    if (!isOpen) return null;

    const doctorOptions = availableDoctors.map(doctor => ({
        value: doctor.name,
        label: doctor.name,
    }));

    const timeOptions = availableSlots.map(slot => ({
        value: slot,
        label: slot,
    }));

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg- z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Book Appointment
                            </h2>
                            <p className="text-sm text-gray-700 mt-1">
                                Schedule a visit with a specialist
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
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="space-y-6">
                            {/* Department Selection */}
                            <FormSelect
                                label="Department"
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                options={departments.map(dept => ({ value: dept, label: dept }))}
                                placeholder="Select department"
                                required
                            />

                            {/* Doctor Selection */}
                            <FormSelect
                                label="Doctor"
                                value={selectedDoctor}
                                onChange={setSelectedDoctor}
                                options={doctorOptions}
                                placeholder={selectedDepartment ? "Select doctor" : "First select department"}
                                disabled={!selectedDepartment || availableDoctors.length === 0}
                                required
                            />

                            {/* Date Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-600">Appointment Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                />
                                {selectedDate && (
                                    <p className="text-xs text-gray-700 flex items-center">
                                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                                        {formatDate(selectedDate)}
                                    </p>
                                )}
                            </div>

                            {/* Time Selection */}
                            <FormSelect
                                label="Appointment Time"
                                value={selectedTime}
                                onChange={setSelectedTime}
                                options={timeOptions}
                                placeholder={selectedDate && selectedDoctor ? "Select time slot" : "First select date and doctor"}
                                disabled={!selectedDate || !selectedDoctor || availableSlots.length === 0}
                                required
                            />

                            {/* Reason */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-600">Reason for Visit</label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Briefly describe the reason for your appointment..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                                    required
                                />
                            </div>

                            {/* Summary */}
                            {(selectedDepartment && selectedDoctor && selectedDate && selectedTime) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                                >
                                    <h4 className="text-sm font-medium text-blue-700 mb-2">Appointment Summary</h4>
                                    <div className="text-sm text-blue-600 space-y-1">
                                        <div>Department: {selectedDepartment}</div>
                                        <div>Doctor: {selectedDoctor}</div>
                                        <div>Date: {formatDate(selectedDate)}</div>
                                        <div>Time: {selectedTime}</div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime || !reason.trim()}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
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
