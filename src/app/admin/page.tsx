'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import SectionTitle from '@/components/common/SectionTitle';
import SearchInput from '@/components/common/SearchInput';
import MetricCard from '@/components/admin/MetricCard';
import DoctorRow from '@/components/admin/DoctorRow';
import TimelineVisitRow from '@/components/admin/TimelineVisitRow';
import {
    UsersIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Mock data
const metrics = [
    {
        title: 'Total Doctors',
        value: 24,
        icon: UsersIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Active Patients',
        value: 120,
        icon: UserGroupIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        title: "Today's Appointments",
        value: 36,
        icon: CalendarDaysIcon,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
    },
    {
        title: 'Pending Visits',
        value: 7,
        icon: ExclamationTriangleIcon,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
    },
];

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

const timelineVisits = [
    { time: '9:00 AM', patient: 'John Doe', doctor: 'Dr. Smith', status: 'Completed' },
    { time: '9:15 AM', patient: 'Mary Johnson', doctor: 'Dr. Garcia', status: 'Completed' },
    { time: '9:30 AM', patient: 'Robert Lee', doctor: 'Dr. Patel', status: 'Completed' },
    { time: '9:45 AM', patient: 'Sarah Park', doctor: 'Dr. Chen', status: 'Pending' },
    { time: '10:00 AM', patient: 'Michael Wong', doctor: 'Dr. Taylor', status: 'Pending' },
    { time: '10:15 AM', patient: 'Lisa Davis', doctor: 'Dr. Wilson', status: 'Completed' },
    { time: '10:30 AM', patient: 'James Brown', doctor: 'Dr. Lee', status: 'Pending' },
    { time: '10:45 AM', patient: 'Jennifer Kim', doctor: 'Dr. Rodriguez', status: 'Completed' },
];

export default function AdminDashboard() {
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
        <DashboardLayout role="admin" pageTitle="Overview">
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
                            Hospital Overview
                        </h1>
                        <p className="text-lg text-gray-600">
                            Monitor performance and staff activity
                        </p>
                    </div>
                </motion.div>

                {/* Metrics Grid */}
                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={metric.title}
                                custom={index}
                                variants={itemVariants}
                            >
                                <MetricCard
                                    title={metric.title}
                                    value={metric.value}
                                    icon={metric.icon}
                                    color={metric.color}
                                    bgColor={metric.bgColor}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Staff Table */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-gray rounded-2xl p-6 shadow-sm border border-gray-900">
                            <div className="flex items-center justify-between mb-6">
                                <SectionTitle title="Doctor Staff" subtitle="Availability and workload overview" />
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <SearchInput placeholder="Search doctors by name or department" />
                            </div>

                            {/* Doctor Rows */}
                            <div className="space-y-2">
                                {doctors.map((doctor, index) => (
                                    <motion.div
                                        key={doctor.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <DoctorRow doctor={doctor} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Activity Timeline */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <SectionTitle title="Today's Activity" subtitle="Visit timeline and status" />
                                <select className="px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white">
                                    <option>All</option>
                                    <option>Completed</option>
                                    <option>Pending</option>
                                </select>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-6">
                                {timelineVisits.map((visit, index) => (
                                    <motion.div
                                        key={`${visit.patient}-${visit.time}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <TimelineVisitRow
                                            visit={visit}
                                            isLast={index === timelineVisits.length - 1}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination indicator */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-700 text-center">
                                    Showing all {timelineVisits.length} visits for today
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
}
