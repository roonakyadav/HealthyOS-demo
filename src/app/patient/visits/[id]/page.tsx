'use client';

import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/DashboardLayout';
import StatusChip from '@/components/common/StatusChip';

const patientVisits = [
    {
        id: 1,
        date: "2025-11-21",
        doctor: "Dr. Smith",
        doctorSpecialization: "Cardiology",
        reason: "Chest pain",
        symptoms: "Mild discomfort and pressure",
        diagnosis: "Gastritis",
        prescriptions: [
            { name: "Pantoprazole", dose: "40mg", frequency: "1/day", duration: "7 days" }
        ],
        notes: "Follow up if pain increases.",
        status: "Completed"
    },
    {
        id: 2,
        date: "2025-10-18",
        doctor: "Dr. Brown",
        doctorSpecialization: "Orthopedics",
        reason: "Knee pain",
        symptoms: "Sharp pain after long walks",
        diagnosis: "Patellofemoral pain syndrome",
        prescriptions: [
            { name: "Ibuprofen", dose: "400mg", frequency: "2/day", duration: "5 days" }
        ],
        notes: "",
        status: "Completed"
    },
    {
        id: 3,
        date: "2025-09-01",
        doctor: "Dr. Patel",
        doctorSpecialization: "Dermatology",
        reason: "Skin rash",
        symptoms: "Itchy red patches on arms",
        diagnosis: "Eczema",
        prescriptions: [
            { name: "Hydrocortisone", dose: "1%", frequency: "2/day", duration: "10 days" }
        ],
        notes: "Keep skin moisturized. Avoid triggers.",
        status: "Completed"
    },
    {
        id: 4,
        date: "2025-08-15",
        doctor: "Dr. Wilson",
        doctorSpecialization: "General Practice",
        reason: "Annual checkup",
        symptoms: "Routine health examination",
        diagnosis: "Healthy, routine checkup",
        prescriptions: [
            { name: "Multivitamin", dose: "1 tablet", frequency: "1/day", duration: "30 days" }
        ],
        notes: "Return in one year.",
        status: "Completed"
    }
];

export default function VisitDetail() {
    const router = useRouter();
    const params = useParams();
    const visitId = parseInt(params.id as string);

    const visit = patientVisits.find(v => v.id === visitId);

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

    if (!visit) {
        return (
            <DashboardLayout role="patient" pageTitle="Visit Details">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                >
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Visit Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The visit you're looking for doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => router.push('/patient/visits')}
                        className="inline-flex items-center px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Visits
                    </button>
                </motion.div>
            </DashboardLayout>
        );
    }

    const formattedDate = new Date(visit.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <DashboardLayout role="patient" pageTitle="Visit Details">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl"
            >
                {/* Back Button */}
                <motion.button
                    variants={itemVariants}
                    onClick={() => router.push('/patient/visits')}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back to Visits
                </motion.button>

                {/* Visit Header */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Visit on {formattedDate}
                        </h1>
                        <StatusChip status={visit.status} />
                    </div>
                    <div className="flex items-center space-x-6 text-gray-600">
                        <div>
                            <span className="font-medium text-gray-900">{visit.doctor}</span>
                            <span className="mx-2">•</span>
                            <span>{visit.doctorSpecialization}</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Reason */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Reason for Visit</h2>
                            <p className="text-gray-700">{visit.reason}</p>
                        </motion.div>

                        {/* <span class="section-title">Symptoms</span> */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-black rounded-2xl p-6 shadow-sm border border-gray-900"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-3"><span className="section-title">Symptoms</span> Noted</h2>
                            <p className="text-gray-700">{visit.symptoms}</p>
                        </motion.div>

                        {/* <span class="section-title">Diagnosis</span> */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-900"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-3"><span className="section-title">Diagnosis</span></h2>
                            <p className="text-gray-700">{visit.diagnosis}</p>
                        </motion.div>

                        {/* <span class="section-title">Prescriptions</span> */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-900"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                <span className="section-title">Prescriptions</span>
                            </h2>
                            <div className="space-y-3">
                                {visit.prescriptions.map((prescription, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-3 px-4 bg-gray-900 rounded-lg"
                                    >
                                        <div>
                                            <div className="font-medium text-gray-900">{prescription.name}</div>
                                            <div className="text-sm text-gray-800">
                                                {prescription.dose} • {prescription.frequency} • {prescription.duration}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Notes */}
                        {visit.notes && (
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-900"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                                    Notes
                                </h2>
                                <p className="text-gray-700 whitespace-pre-wrap">{visit.notes}</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Doctor Info Sidebar */}
                    <div className="space-y-6">
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-900 text-center"
                        >
                            <div className="w-16 h-16 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">
                                    {visit.doctor.split(' ')[1]?.[0]}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-900">{visit.doctor}</h3>
                            <p className="text-sm text-gray-700">{visit.doctorSpecialization}</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
}
