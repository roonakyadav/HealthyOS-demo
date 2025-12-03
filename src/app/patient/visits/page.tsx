'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    PlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/DashboardLayout';
import AppointmentModal from '@/components/patient/AppointmentModal';
import VisitRow from '@/components/patient/VisitRow';
import Toast from '@/components/common/Toast';
import { LocalDB } from '../../../services/localDB';

export default function PatientVisits() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [visits, setVisits] = useState<any[]>([]);
    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error' | 'warning';
    }>({
        visible: false,
        message: '',
        type: 'success',
    });

    const patientId = 'p1'; // In a real app, this would come from auth

    useEffect(() => {
        // Load data from localStorage DB
        const patientAppointments = LocalDB.getAppointmentsByPatient(patientId);
        const patientVisits = LocalDB.getVisitsByPatient(patientId);

        // Map doctor names to appointments
        const appointmentsWithDoctors = patientAppointments.map(appointment => ({
            ...appointment,
            doctor: LocalDB.getDoctor(appointment.doctorId)?.name || 'Unknown Doctor'
        }));

        setAppointments(appointmentsWithDoctors);
        setVisits(patientVisits);
        setIsLoading(false);
    }, [patientId]);

    const closeToast = () => {
        setToast({ ...toast, visible: false });
    };

    const handleCancelAppointment = (appointmentId: string) => {
        try {
            LocalDB.cancelAppointment(appointmentId);
            setAppointments(appointments.filter(app => app.id !== appointmentId));
            setToast({
                visible: true,
                message: 'Appointment cancelled successfully',
                type: 'success',
            });
        } catch (error) {
            setToast({
                visible: true,
                message: 'Failed to cancel appointment',
                type: 'error',
            });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const appointmentItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
    };

    const getDepartmentColor = (dept: string) => {
        const colors = {
            Cardiology: 'bg-red-50 text-red-700 border-red-200',
            Neurology: 'bg-purple-50 text-purple-700 border-purple-200',
            Pediatrics: 'bg-blue-50 text-blue-700 border-blue-200',
            Orthopedics: 'bg-green-50 text-green-700 border-green-200',
            'Internal Medicine': 'bg-yellow-50 text-yellow-700 border-yellow-200',
            Dermatology: 'bg-pink-50 text-pink-700 border-pink-200',
        };
        return colors[dept as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    if (isLoading) {
        return (
            <DashboardLayout role="patient" pageTitle="Visits">
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <>
            <DashboardLayout role="patient" pageTitle="Visits">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Header with Book Appointment Button */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Appointments & Visits
                        </h1>
                        <button
                            onClick={() => setAppointmentModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Book Appointment
                        </button>
                    </motion.div>

                    {/* Upcoming Appointments Section */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <span>Upcoming Appointments</span>
                                {appointments.length > 0 && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {appointments.length}
                                    </span>
                                )}
                            </h2>

                            {appointments.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex p-4 rounded-lg bg-gray-50 mb-4">
                                        📅
                                    </div>
                                    <h3 className="section-title text-lg mb-2">
                                        No upcoming appointments
                                    </h3>
                                    <p className="text-gray-600">
                                        Click the button above to schedule your next visit.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {appointments.map((appointment, index) => (
                                        <motion.div
                                            key={appointment.id}
                                            variants={appointmentItemVariants}
                                            className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${getDepartmentColor(appointment.department)}`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                                        <span className="text-sm font-medium">
                                                            {appointment.doctor.split(' ')[1]?.[0] || appointment.doctor[0]}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{appointment.doctor}</div>
                                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/80`}>
                                                        {appointment.department}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-center">
                                                    <div className="font-medium">{appointment.date}</div>
                                                    <div className="text-gray-600">{appointment.time}</div>
                                                </div>
                                                <div className="text-sm">
                                                    <div className="font-medium">Reason:</div>
                                                    <div className="text-gray-600">{appointment.reason}</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleCancelAppointment(appointment.id)}
                                                className="inline-flex items-center px-3 py-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <XMarkIcon className="w-4 h-4 mr-1" />
                                                Cancel
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Visit History Section */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <span>Visit History</span>
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {visits.length}
                                </span>
                            </h2>

                            {visits.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex p-4 rounded-lg bg-gray-50 mb-4">
                                        📋
                                    </div>
                                    <h3 className="section-title text-lg mb-2">
                                        No visits yet
                                    </h3>
                                    <p className="text-gray-600">
                                        Your completed appointment visits will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {visits.map((visit) => (
                                        <VisitRow key={visit.id} visit={visit} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {visits.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                                    <p className="text-sm text-gray-700">
                                        Showing 1–{visits.length} of {visits.length} visits
                                    </p>
                                    <div className="flex space-x-2">
                                        <button
                                            disabled
                                            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            disabled
                                            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg cursor-not-allowed"
                                        >
                                            1
                                        </button>
                                        <button
                                            disabled
                                            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </DashboardLayout>

            {/* Appointment Modal */}
            <AppointmentModal
                isOpen={appointmentModalOpen}
                onClose={() => setAppointmentModalOpen(false)}
                patientId={patientId}
            />

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
