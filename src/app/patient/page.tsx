'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import SectionTitle from '@/components/common/SectionTitle';
import PatientSummaryCard from '@/components/patient/PatientSummaryCard';
import VisitPreviewCard from '@/components/patient/VisitPreviewCard';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    UserIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { LocalDB } from '../../services/localDB';

export default function PatientDashboard() {
    const router = useRouter();
    const [patientData, setPatientData] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [visits, setVisits] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const patientId = 'p1'; // In a real app, this would come from auth

    useEffect(() => {
        // Load data from localStorage DB
        const patient = LocalDB.getPatient(patientId);
        const patientAppointments = LocalDB.getAppointmentsByPatient(patientId);
        const patientVisits = LocalDB.getVisitsByPatient(patientId);

        // Aggregate prescriptions from all visits
        const allPrescriptions = patientVisits.flatMap((visit: any) => visit.prescriptions || []);

        // Remove duplicates by name and get active ones (let's assume all are active for demo)
        const uniquePrescriptions = [];
        const seen = new Set();
        for (const presc of allPrescriptions) {
            if (!seen.has(presc.name)) {
                uniquePrescriptions.push(presc);
                seen.add(presc.name);
            }
        }

        setPatientData({
            ...patient,
            nextAppointment: patientAppointments[0], // Get next upcoming appointment
            prescriptions: uniquePrescriptions,
            visits: patientVisits, // Add visits for other components
        });
        setAppointments(patientAppointments);
        setVisits(patientVisits.slice(0, 3)); // Show last 3 visits
        setIsLoading(false);
    }, [patientId]);

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

    if (isLoading || !patientData) {
        return (
            <DashboardLayout role="patient" pageTitle="Dashboard">
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="patient" pageTitle="Dashboard">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Header Greeting */}
                <motion.div
                    variants={itemVariants}
                    className="text-center"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Welcome, {patientData.name} 👋
                    </h1>
                    <p className="text-lg text-gray-600">
                        Here's your health overview
                    </p>
                </motion.div>

                {/* Health Summary Cards */}
                <motion.div variants={itemVariants}>
                    <SectionTitle title="Health Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <PatientSummaryCard
                            type="prescriptions"
                            data={patientData.prescriptions}
                        />
                        <PatientSummaryCard
                            type="overdue"
                            data={patientData.overdueMedicines}
                        />
                        <PatientSummaryCard
                            type="appointment"
                            data={patientData.nextAppointment}
                        />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Profile Widget */}
                    <motion.div variants={itemVariants}>
                        <SectionTitle title="Quick Profile" />
                        <div className="bg-black rounded-2xl p-6 shadow-sm border border-gray-900">
                            <div className="flex items-center mb-4">
                                <div className="inline-flex p-2 rounded-lg bg-blue-50">
                                    <UserIcon className="w-5 h-5 text-blue-600" aria-label="Profile icon" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 ml-3">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-700">Gender</p>
                                    <p className="font-medium text-gray-900">{patientData.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Age</p>
                                    <p className="font-medium text-gray-900">{patientData.age} years</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Blood Group</p>
                                    <p className="font-medium text-gray-900">{patientData.bloodGroup}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Status</p>
                                    <div className="flex items-center">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                                        <span className="font-medium text-gray-900">Active</span>
                                    </div>
                                </div>
                            </div>

                            {/* Allergies */}
                            {patientData.allergies.length > 0 && (
                                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="flex items-center mb-2">
                                        <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mr-2" />
                                        <span className="font-medium text-amber-800">Allergies</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {patientData.allergies.map((allergy: string) => (
                                            <span
                                                key={allergy}
                                                className="inline-flex items-center px-2 py-1 text-sm bg-amber-100 text-amber-800 rounded-full"
                                            >
                                                {allergy}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Visit History Preview */}
                    <motion.div variants={itemVariants}>
                        <VisitPreviewCard visits={patientData.visits} />
                    </motion.div>
                </div>

                {/* Upcoming Appointment Widget */}
                {patientData.nextAppointment && (
                    <motion.div variants={itemVariants}>
                        <SectionTitle title="Upcoming Appointment" />
                        <div className="bg-gradient-to-r from-[#059669] to-[#10b981] rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        {patientData.nextAppointment.date}
                                    </h3>
                                    <p className="text-green-100 mb-1">
                                        {patientData.nextAppointment.time}
                                    </p>
                                    <p className="text-green-100">
                                        {patientData.nextAppointment.doctor}
                                    </p>
                                    <p className="text-green-100 text-sm">
                                        {patientData.nextAppointment.department}
                                    </p>
                                </div>
                                <button
                                    onClick={() => router.push('/patient/visits')}
                                    className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                                >
                                    <EyeIcon className="w-4 h-4 mr-2" />
                                    View details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {!patientData.nextAppointment && (
                    <motion.div variants={itemVariants}>
                        <SectionTitle title="Schedule Appointment" />
                        <div className="bg-gray-100 rounded-2xl p-6 text-center">
                            <button
                                disabled
                                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed"
                            >
                                Book Appointment — coming soon
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </DashboardLayout>
    );
}
