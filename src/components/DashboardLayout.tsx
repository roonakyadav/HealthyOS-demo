'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import {
    HomeIcon,
    CalendarDaysIcon,
    UserIcon,
    ClipboardDocumentListIcon,
    UsersIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
    role: 'patient' | 'doctor' | 'admin';
    pageTitle: string;
    children: React.ReactNode;
}

const navItems = {
    patient: [
        { name: 'Dashboard', href: '/patient', icon: HomeIcon },
        { name: 'Visits', href: '/patient/visits', icon: CalendarDaysIcon },
        { name: 'Profile', href: '/patient/profile', icon: UserIcon },
    ],
    doctor: [
        { name: 'Dashboard', href: '/doctor', icon: HomeIcon },
        { name: 'Visits', href: '/doctor/visits', icon: ClipboardDocumentListIcon },
    ],
    admin: [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Staff', href: '/admin/staff', icon: UsersIcon },
        { name: 'Visits', href: '/admin/visits', icon: ClipboardDocumentListIcon },
    ],
};

export default function DashboardLayout({
    role,
    pageTitle,
    children,
}: DashboardLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const items = navItems[role];
    const accentColor = {
        patient: 'text-[#059669]',
        doctor: 'text-[#2563EB]',
        admin: 'text-[#4F46E5]',
    }[role];

    const accentBg = {
        patient: 'bg-[#059669]',
        doctor: 'bg-[#2563EB]',
        admin: 'bg-[#4F46E5]',
    }[role];

    const roleName = role.charAt(0).toUpperCase() + role.slice(1);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="hidden md:flex md:flex-shrink-0"
            >
                <div className="w-64 bg-white shadow-sm flex flex-col">
                    {/* Sidebar header */}
                    <div className="flex-shrink-0 px-4 py-5">
                        <p className="text-lg font-semibold text-gray-900">{roleName} Portal</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2">
                        {items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <motion.button
                                    key={item.name}
                                    onClick={() => router.push(item.href)}
                                    whileHover={{ scale: 1.02 }}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? `${accentBg} text-white shadow-sm`
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </motion.button>
                            );
                        })}
                    </nav>
                </div>
            </motion.div>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: 'tween', duration: 0.2 }}
                        className="fixed inset-0 z-50 md:hidden"
                    >
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black bg-"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <div className="relative flex flex-col bg-white w-64 h-full shadow-sm">
                                <div className="flex items-center justify-between px-4 py-5">
                                    <p className="text-lg font-semibold text-gray-900">{roleName} Portal</p>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-1 text-gray-400 hover:text-gray-600"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <nav className="flex-1 px-4 space-y-2">
                                    {items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;
                                        return (
                                            <button
                                                key={item.name}
                                                onClick={() => router.push(item.href)}
                                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                                        ? `${accentBg} text-white`
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5 mr-3" />
                                                {item.name}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm sticky top-0 z-40">
                    <div className="flex items-center justify-between px-4 py-4 md:px-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2 text-gray-400 hover:text-gray-600 mr-3"
                            >
                                <Bars3Icon className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{pageTitle}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className={`text-sm ${accentColor}`}>Logged in as {roleName}</span>
                                <div className={`w-8 h-8 rounded-full ${accentBg} flex items-center justify-center`}>
                                    <span className="text-white font-bold text-sm">{roleName[0]}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/')}
                                className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <motion.main
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-auto p-4 md:p-6"
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
}
