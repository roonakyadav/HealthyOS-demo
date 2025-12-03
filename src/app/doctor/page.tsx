'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import TabSwitcher from '@/components/common/TabSwitcher';
import VisitCard from '@/components/doctor/VisitCard';
import {
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    CalendarDaysIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { LocalDB } from '../../services/localDB';

const doctorVisits = [
    {
        id: 1,
        patient: 'John Doe',
        time: '10:30 AM',
        reason: 'Chest pain',
        status: 'Pending',
    },
    {
        id: 2,
        patient: 'Mary Jane',
        time: '11:00 AM',
        reason: 'High fever',
        status: 'Completed',
    },
    {
        id: 3,
        patient: 'Robert Smith',
        time: '12:00 PM',
        reason: 'Annual checkup',
        status: 'Pending',
    },
    {
        id: 4,
        patient: 'Lisa Wong',
        time: '2:00 PM',
        reason: 'Headache',
        status: 'Completed',
    },
    {
        id: 5,
        patient: 'James Brown',
        time: '3:30 PM',
        reason: 'Skin rash',
        status: 'Pending',
    },
];

const pendingVisits = doctorVisits.filter(v => v.status === 'Pending');
const completedVisits = doctorVisits.filter(v => v.status === 'Completed');

const statsData = [
    {
        title: 'Pending Visits',
        value: pendingVisits.length,
        icon: ClipboardDocumentListIcon,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
    },
    {
        title: 'Completed Visits',
        value: completedVisits.length,
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        title: "Today's Appointments",
        value: doctorVisits.length,
        icon: CalendarDaysIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
];

const tabs = [
    { key: 'pending', label: 'Pending Visits' },
    { key: 'completed', label: 'Completed Visits' },
];

export default function DoctorDashboard() {
    const [activeTab, setActiveTab] = useState('pending');
    const [visits, setVisits] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);

    const doctorId = 'd3'; // Dr. Davis, who has the appointment

    useEffect(() => {
        // Load only pending appointments for this doctor and convert to visits
        const appointments = LocalDB.getAppointmentsByPatient('p1').filter(a => a.doctorId === doctorId && a.status === 'Upcoming');

        // Convert appointments to visits (one-time conversion)
        appointments.forEach(app => {
            LocalDB.convertAppointmentToVisit(app.id);
        });

        // Now load all visits for this doctor
        const doctorVisits = LocalDB.getVisitsByDoctor(doctorId);
        setVisits(doctorVisits);

        // Calculate stats
        const pendingVisits = doctorVisits.filter(v => v.status === 'In-Progress').length;
        const completedVisits = doctorVisits.filter(v => v.status === 'Completed').length;
        const totalAppointments = doctorVisits.length + appointments.length; // current visits + converted

        setStats({
            pendingVisits,
            completedVisits,
            totalAppointments,
        });
    }, [doctorId]);

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

    const visitVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: index * 0.05 },
        }),
    };

    const currentVisits = activeTab === 'pending' ? pendingVisits : completedVisits;

    return (
        <DashboardLayout role="doctor" pageTitle="Dashboard">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Header */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Good morning, Dr. Davis 👋
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here's your schedule for today
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center mb-8">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Online
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statsData.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.title}
                                    variants={itemVariants}
                                    custom={index}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                                >
                                    <div className="flex items-center">
                                        <div className={`inline-flex p-3 rounded-lg ${stat.bgColor}`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {stat.value}
                                            </h3>
                                            <p className="text-sm text-gray-700">{stat.title}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Visits Section */}
                <motion.div variants={itemVariants}>
                    <TabSwitcher
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <div className="mt-6">
                        {currentVisits.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="inline-flex p-4 rounded-lg bg-gray-50 mb-4">
                                    <UserIcon className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="section-title text-lg mb-2">
                                    No {activeTab} visits
                                </h3>
                                <p className="text-gray-600">
                                    {activeTab === 'pending'
                                        ? "Great! You've completed all your pending visits for today."
                                        : "No completed visits yet today."
                                    }
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentVisits.map((visit, index) => (
                                    <motion.div
                                        key={visit.id}
                                        custom={index}
                                        variants={visitVariants}
                                    >
                                        <VisitCard visit={visit} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}
