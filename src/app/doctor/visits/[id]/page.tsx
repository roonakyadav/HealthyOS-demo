'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon, ChevronRightIcon, TrophyIcon, UserIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/DashboardLayout';
import StatusChip from '@/components/common/StatusChip';
import Modal from '@/components/common/Modal';
import ConsultationForm from '@/components/doctor/ConsultationForm';
import PrescriptionBuilder from '@/components/doctor/PrescriptionBuilder';
import Toast from '@/components/common/Toast';

const doctorVisits = [
    {
        id: 1,
        patient: 'John Doe',
        age: 32,
        gender: 'Male',
        bloodGroup: 'B+',
        allergies: ['Penicillin'],
        time: '10:30 AM',
        reason: 'Chest pain',
        status: 'Pending',
    },
    {
        id: 2,
        patient: 'Mary Jane',
        age: 28,
        gender: 'Female',
        bloodGroup: 'A+',
        allergies: [],
        time: '11:00 AM',
        reason: 'High fever',
        status: 'Completed',
    },
    {
        id: 3,
        patient: 'Robert Smith',
        age: 45,
        gender: 'Male',
        bloodGroup: 'O+',
        allergies: ['Sulfa drugs'],
        time: '12:00 PM',
        reason: 'Annual checkup',
        status: 'Pending',
    },
    {
        id: 4,
        patient: 'Lisa Wong',
        age: 60,
        gender: 'Female',
        bloodGroup: 'Ab-',
        allergies: ['Ibuprofen'],
        time: '2:00 PM',
        reason: 'Headache',
        status: 'Completed',
    },
    {
        id: 5,
        patient: 'James Brown',
        age: 23,
        gender: 'Male',
        bloodGroup: 'B-',
        allergies: [],
        time: '3:30 PM',
        reason: 'Skin rash',
        status: 'Pending',
    },
];

export default function DoctorVisitDetail() {
    const router = useRouter();
    const params = useParams();
    const visitId = parseInt(params.id as string);

    const visit = doctorVisits.find(v => v.id === visitId);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<any>(null);
    const [consultation, setConsultation] = useState({
        symptoms: visit?.status === 'Completed' ? 'Patient reported severe chest pain radiating to left arm.'
            : 'Patient reported chest pain.',
        diagnosis: visit?.status === 'Completed' ? 'Myocardial infarction (Heart attack)'
            : 'Suspected myocardial infarction - requires immediate workup',
        notes: visit?.status === 'Completed' ? 'Patient requires immediate admission. Started aspirin and nitroglycerin. ECG shows ST elevation.'
            : 'Patient is in severe pain. Started aspirin. ECG pending.',
        labRequests: visit?.status === 'Completed' ? ['CBC', 'Troponin', 'ECG', 'Cardiac Enzymes'] : [],
        prescriptions: visit?.status === 'Completed' ? [
            {
                id: '1',
                name: 'Aspirin',
                dose: '325mg',
                frequency: 'immediately',
                duration: 'indefinite'
            },
            {
                id: '2',
                name: 'Nitroglycerin',
                dose: '0.4mg',
                frequency: 'under tongue',
                duration: 'as needed'
            }
        ] : [],
    });

    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error' | 'warning';
    }>({
        visible: false,
        message: '',
        type: 'success',
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const panelVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    const closeToast = () => {
        setToast({ ...toast, visible: false });
    };

    const handleMarkCompleted = () => {
        setToast({
            visible: true,
            message: 'Visit marked as completed (demo only)',
            type: 'success',
        });

        // Redirect after a delay
        setTimeout(() => {
            router.push('/doctor');
        }, 2000);
    };

    const handleSaveProgress = () => {
        setToast({
            visible: true,
            message: 'Consultation saved locally (demo)',
            type: 'success',
        });
    };

    const showVisitDetail = (visit: any) => {
        setSelectedVisit(visit);
        setModalOpen(true);
    };

    if (!visit) {
        return (
            <DashboardLayout role="doctor" pageTitle="Visit Details">
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
                        onClick={() => router.push('/doctor/visits')}
                        className="inline-flex items-center px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </button>
                </motion.div>
            </DashboardLayout>
        );
    }

    const isCompleted = visit.status === 'Completed';

    return (
        <>
            <DashboardLayout role="doctor" pageTitle="Consultation">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="min-h-screen"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.push('/doctor')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </button>

                        <motion.div
                            variants={panelVariants}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Consultation: {visit.patient}
                                    </h1>
                                    <div className="flex items-center mt-2 text-gray-600">
                                        <UserIcon className="w-5 h-5 mr-2" />
                                        <span>{visit.time}</span>
                                        <span className="mx-2">•</span>
                                        <span>{visit.reason}</span>
                                    </div>
                                </div>
                                <StatusChip status={visit.status} />
                            </div>
                        </motion.div>
                    </div>

                    {/* 3-Panel Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Panel - Patient Info */}
                        <motion.div
                            variants={panelVariants}
                            className="lg:col-span-3 space-y-6"
                        >
                            {/* Patient Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="text-center mb-4">
                                    <div className="w-20 h-20 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl font-bold text-white">
                                            {visit.patient.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{visit.patient}</h3>
                                    <p className="text-sm text-gray-700">
                                        {visit.gender}, {visit.age} years
                                    </p>
                                </div>

                                {/* Patient Details */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-700">Blood Group</span>
                                        <span className="text-sm font-medium">{visit.bloodGroup}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-700">Status</span>
                                        <div className="flex items-center text-sm text-green-600">
                                            <TrophyIcon className="w-4 h-4 mr-1" />
                                            Active
                                        </div>
                                    </div>
                                </div>

                                {/* Allergies Alert */}
                                {visit.allergies.length > 0 && (
                                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                        <div className="flex items-start">
                                            <span className="text-amber-600 font-semibold text-sm">⚠️ Allergies:</span>
                                            <div className="ml-2 flex flex-wrap gap-1">
                                                {visit.allergies.map((allergy, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                                                    >
                                                        {allergy}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Past Visits */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4"><span className="section-title">Recent Visits</span></h4>
                                <div className="space-y-3">
                                    {doctorVisits
                                        .filter(v => v.patient === visit.patient && v.id !== visit.id)
                                        .slice(0, 3)
                                        .map((pastVisit) => (
                                            <button
                                                key={pastVisit.id}
                                                onClick={() => showVisitDetail(pastVisit)}
                                                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">{pastVisit.reason}</p>
                                                        <p className="text-xs text-gray-700">{pastVisit.time}</p>
                                                    </div>
                                                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Center Panel - Consultation Workspace */}
                        <motion.div
                            variants={panelVariants}
                            className="lg:col-span-6 space-y-6"
                        >
                            <ConsultationForm
                                symptoms={consultation.symptoms}
                                diagnosis={consultation.diagnosis}
                                notes={consultation.notes}
                                labRequests={consultation.labRequests}
                                onSymptomsChange={(value) => setConsultation(prev => ({ ...prev, symptoms: value }))}
                                onDiagnosisChange={(value) => setConsultation(prev => ({ ...prev, diagnosis: value }))}
                                onNotesChange={(value) => setConsultation(prev => ({ ...prev, notes: value }))}
                                onLabRequestsChange={(value) => setConsultation(prev => ({ ...prev, labRequests: value }))}
                                readonly={isCompleted}
                            />

                            <PrescriptionBuilder
                                prescriptions={consultation.prescriptions}
                                onChange={(prescriptions) => setConsultation(prev => ({ ...prev, prescriptions }))}
                                readonly={isCompleted}
                            />
                        </motion.div>

                        {/* Right Panel - Actions & Status */}
                        <motion.div
                            variants={panelVariants}
                            className="lg:col-span-3"
                        >
                            <div className="sticky top-8 space-y-6">
                                {/* <span class="section-title">Visit Status</span> */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4"><span className="section-title">Visit Status</span></h4>
                                    <div className="flex justify-center mb-4">
                                        <StatusChip status={visit.status} />
                                    </div>
                                    <div className="text-sm text-gray-700 text-center">
                                        {isCompleted ? 'This visit is completed and read-only' : 'This visit is currently in progress'}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
                                    <div className="space-y-3">
                                        {isCompleted ? (
                                            <button
                                                onClick={() => router.push(`/patient/profile`)}
                                                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                            >
                                                View Patient Record
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleSaveProgress}
                                                    className="w-full py-3 border border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium"
                                                >
                                                    Save Progress (Demo)
                                                </button>
                                                <button
                                                    onClick={handleMarkCompleted}
                                                    disabled={isCompleted}
                                                    className="w-full py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] disabled:bg-gray-400 transition-colors font-medium"
                                                >
                                                    Mark as Completed
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Demo Notice */}
                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                                    <p className="text-blue-800 text-sm">
                                        <strong>Demo:</strong> Changes are not saved. "Mark as Completed" will redirect with a success message.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Modal for Past Visits */}
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={selectedVisit ? `Visit on ${selectedVisit.time}` : 'Past Visit'}
                >
                    {selectedVisit && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Time</span>
                                    <p className="text-gray-900">{selectedVisit.time}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Status</span>
                                    <StatusChip status={selectedVisit.status} />
                                </div>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-700">Reason</span>
                                <p className="text-gray-900">{selectedVisit.reason}</p>
                            </div>
                            {selectedVisit.status === 'Completed' && (
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Notes</span>
                                    <p className="text-gray-900 mt-1 italic">
                                        Patient presented with {selectedVisit.reason.toLowerCase()}.
                                        Assessment completed. Follow-up scheduled.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                {/* Toast */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.visible}
                    onClose={closeToast}
                />
            </DashboardLayout>
        </>
    );
}
