'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import SearchInput from '@/components/common/SearchInput';
import VisitRow from '@/components/admin/VisitRow';
import ReassignModal from '@/components/admin/ReassignModal';
import QuickViewModal from '@/components/admin/QuickViewModal';
import Toast from '@/components/common/Toast';

const visits = [
    { id: 101, patient: 'John Doe', doctor: 'Dr. Smith', department: 'Cardiology', time: '9:00 AM', date: 'Dec 15', status: 'Completed', reason: 'Chest pain follow-up' },
    { id: 102, patient: 'Mary Johnson', doctor: 'Dr. Garcia', department: 'Pediatrics', time: '9:15 AM', date: 'Dec 15', status: 'In-Progress', reason: 'Fever and cough' },
    { id: 103, patient: 'Robert Lee', doctor: 'Dr. Patel', department: 'Neurology', time: '9:30 AM', date: 'Dec 15', status: 'Completed', reason: 'Migraine consultation' },
    { id: 104, patient: 'Sarah Park', doctor: 'Dr. Chen', department: 'Orthopedics', time: '9:45 AM', date: 'Dec 15', status: 'Pending', reason: 'Knee injury' },
    { id: 105, patient: 'Michael Wong', doctor: 'Dr. Taylor', department: 'Dermatology', time: '10:00 AM', date: 'Dec 15', status: 'Pending', reason: 'Acne treatment' },
    { id: 106, patient: 'Lisa Davis', doctor: 'Dr. Wilson', department: 'Internal Medicine', time: '10:15 AM', date: 'Dec 15', status: 'Completed', reason: 'Annual physical exam' },
    { id: 107, patient: 'James Brown', doctor: 'Dr. Lee', department: 'Emergency Medicine', time: '10:30 AM', date: 'Dec 15', status: 'Pending', reason: 'Abdominal pain' },
    { id: 108, patient: 'Jennifer Kim', doctor: 'Dr. Rodriguez', department: 'Surgery', time: '10:45 AM', date: 'Dec 15', status: 'Completed', reason: 'Pre-op consultation' },
    { id: 109, patient: 'David Chen', doctor: 'Dr. Garcia', department: 'Pediatrics', time: '11:00 AM', date: 'Dec 15', status: 'Completed', reason: 'Regular checkup' },
    { id: 110, patient: 'Anna Smith', doctor: 'Dr. Johnson', department: 'Radiology', time: '11:15 AM', date: 'Dec 15', status: 'In-Progress', reason: 'Mammogram results' },
    { id: 111, patient: 'Carlos Martinez', doctor: 'Dr. Smith', department: 'Cardiology', time: '11:30 AM', date: 'Dec 15', status: 'Pending', reason: 'Blood pressure monitoring' },
    { id: 112, patient: 'Emma Wilson', doctor: 'Dr. Davis', department: 'Psychiatry', time: '11:45 AM', date: 'Dec 15', status: 'Completed', reason: 'Anxiety evaluation' },
    { id: 113, patient: 'Alexander Lee', doctor: 'Dr. Chen', department: 'Orthopedics', time: '12:00 PM', date: 'Dec 15', status: 'Cancelled', reason: 'Patient rescheduled' },
    { id: 114, patient: 'Sophia Johnson', doctor: 'Dr. Garcia', department: 'Pediatrics', time: '12:15 PM', date: 'Dec 15', status: 'Pending', reason: 'Vaccination visit' },
    { id: 115, patient: 'Daniel Brown', doctor: 'Dr. Patel', department: 'Neurology', time: '12:30 PM', date: 'Dec 15', status: 'In-Progress', reason: 'Seizure follow-up' },
];

const departments = ['All Departments', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Internal Medicine', 'Dermatology', 'Psychiatry', 'Emergency Medicine', 'Surgery', 'Radiology'];

const statuses = ['All Statuses', 'Pending', 'In-Progress', 'Completed', 'Cancelled'];

export default function AdminVisits() {
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [selectedStatus, setSelectedStatus] = useState('All Statuses');
    const [selectedDoctor, setSelectedDoctor] = useState('All Doctors');
    const [searchQuery, setSearchQuery] = useState('');
    const [reassignModalOpen, setReassignModalOpen] = useState(false);
    const [quickViewModalOpen, setQuickViewModalOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<any>(null);

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

    const doctors = [...new Set(visits.map(v => v.doctor))];
    const doctorOptions = ['All Doctors', ...doctors];

    const filteredVisits = visits.filter((visit) => {
        const matchesSearch = visit.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            visit.reason.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = selectedDepartment === 'All Departments' || visit.department === selectedDepartment;
        const matchesStatus = selectedStatus === 'All Statuses' || visit.status === selectedStatus;
        const matchesDoctor = selectedDoctor === 'All Doctors' || visit.doctor === selectedDoctor;

        return matchesSearch && matchesDepartment && matchesStatus && matchesDoctor;
    });

    const activeFilters = [selectedDepartment, selectedStatus, selectedDoctor].filter(f => f !== 'All Departments' && f !== 'All Statuses' && f !== 'All Doctors').length;

    const handleReassign = (visitId: number, newDoctor: string) => {
        setToast({
            visible: true,
            message: `Visit reassigned to ${newDoctor} successfully`,
            type: 'success',
        });
        // In a real app, this would update the visit in state/database
    };

    const handleReassignModal = (visit: any) => {
        setSelectedVisit(visit);
        setReassignModalOpen(true);
    };

    const handleQuickViewModal = (visit: any) => {
        setSelectedVisit(visit);
        setQuickViewModalOpen(true);
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

    return (
        <>
            <DashboardLayout role="admin" pageTitle="Visit Oversight">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants}>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                Visit Oversight
                            </h1>
                            <p className="text-lg text-gray-600">
                                Monitor and manage all visits across departments
                            </p>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                {/* Search */}
                                <div className="w-full lg:w-80">
                                    <SearchInput
                                        placeholder="Search visits by patient or reason"
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex items-center space-x-4 w-full lg:w-auto">
                                    {/* Department */}
                                    <div className="flex-1 lg:flex-none min-w-0">
                                        <select
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div className="flex-1 lg:flex-none min-w-0">
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                                        >
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Doctor */}
                                    <div className="flex-1 lg:flex-none min-w-0">
                                        <select
                                            value={selectedDoctor}
                                            onChange={(e) => setSelectedDoctor(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                                        >
                                            {doctorOptions.map((doctor) => (
                                                <option key={doctor} value={doctor}>
                                                    {doctor}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters Indicator */}
                            {activeFilters > 0 && (
                                <div className="mt-4 text-sm text-gray-700">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                                        {activeFilters} filter{activeFilters > 1 ? 's' : ''} applied
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Visit Table */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Table Header */}
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Visit Queue ({filteredVisits.length} visits)
                                </h2>
                            </div>

                            {/* Table Content */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Date & Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Patient
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Department
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Doctor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {filteredVisits.map((visit, index) => (
                                            <VisitRow
                                                key={visit.id}
                                                visit={visit}
                                                onReassign={handleReassignModal}
                                                onQuickView={handleQuickViewModal}
                                                delay={index * 0.05}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* No Results */}
                            {filteredVisits.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="inline-flex p-4 rounded-lg bg-gray-50 mb-4">
                                        📄
                                    </div>
                                    <h3 className="section-title text-lg mb-2">
                                        No visits found
                                    </h3>
                                    <p className="text-gray-600">
                                        Try adjusting your search or filter criteria.
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing 1 to {Math.min(filteredVisits.length, 10)} of {filteredVisits.length} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        disabled
                                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-400 cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled>
                                        1
                                    </button>
                                    <button
                                        disabled
                                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-400 cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Modals */}
                <ReassignModal
                    isOpen={reassignModalOpen}
                    onClose={() => setReassignModalOpen(false)}
                    visit={selectedVisit}
                    onReassign={handleReassign}
                />

                <QuickViewModal
                    isOpen={quickViewModalOpen}
                    onClose={() => setQuickViewModalOpen(false)}
                    visit={selectedVisit}
                />

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
