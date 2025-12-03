'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import SearchInput from '@/components/common/SearchInput';
import StaffCard from '@/components/admin/StaffCard';
import ScheduleModal from '@/components/admin/ScheduleModal';

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

const departments = [
    'All Departments',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Internal Medicine',
    'Dermatology',
    'Psychiatry',
    'Emergency Medicine',
    'Surgery',
    'Radiology',
];

export default function AdminStaff() {
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

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

    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesOnline = !showOnlineOnly || doctor.availability === 'Online';
        const matchesDepartment = selectedDepartment === 'All Departments' ||
            doctor.department === selectedDepartment;

        return matchesSearch && matchesOnline && matchesDepartment;
    });

    const handleViewSchedule = (doctor: any) => {
        setSelectedDoctor(doctor);
        setModalOpen(true);
    };

    return (
        <>
            <DashboardLayout role="admin" pageTitle="Staff Management">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants}>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                Staff Management
                            </h1>
                            <p className="text-lg text-gray-900">
                                Manage doctors and their schedules
                            </p>
                        </div>
                    </motion.div>

                    {/* Filters and Search */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-gray rounded-2xl p-6 shadow-sm border border-gray-900">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                {/* Search */}
                                <div className="w-full lg:w-80">
                                    <SearchInput
                                        placeholder="Search doctors by name or department"
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex items-center space-x-4 w-full lg:w-auto">
                                    {/* Department Filter */}
                                    <div className="flex-1 lg:flex-none">
                                        <select
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-800 rounded-lg bg-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Online Only Toggle */}
                                    <div className="flex items-center space-x-2">
                                        <label htmlFor="online-toggle" className="text-sm font-medium text-gray-900 dark:text-gray-900">
                                            Online Only
                                        </label>
                                        <button
                                            id="online-toggle"
                                            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showOnlineOnly ? 'bg-green-500' : 'bg-gray-900'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showOnlineOnly ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Staff Cards Grid */}
                    <motion.div variants={itemVariants}>
                        {filteredDoctors.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex p-4 rounded-lg bg-gray-900 mb-4">
                                    👨‍⚕️
                                </div>
                                <h3 className="section-title text-lg mb-2">
                                    No doctors found
                                </h3>
                                <p className="text-gray-900">
                                    Try adjusting your search or filter criteria.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredDoctors.map((doctor, index) => (
                                        <motion.div
                                            key={doctor.name}
                                            custom={index}
                                            variants={itemVariants}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <StaffCard
                                                doctor={doctor}
                                                onViewSchedule={() => handleViewSchedule(doctor)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Results Counter */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-900">
                                        Showing {filteredDoctors.length} of {doctors.length} doctors
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>

                {/* Schedule Modal */}
                <ScheduleModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    doctor={selectedDoctor}
                />
            </DashboardLayout>
        </>
    );
}
