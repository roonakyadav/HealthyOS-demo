'use client';

import { motion } from 'framer-motion';
import LogoAnimated from '@/components/LogoAnimated';
import RoleCard from '@/components/RoleCard';

export default function Home() {
  const roles = [
    {
      title: 'Doctor',
      description: 'Manage visits & patient care',
      icon: 'doctor' as const,
      buttonColor: 'bg-[#2563EB]',
      route: '/doctor',
    },
    {
      title: 'Patient',
      description: 'See your health records & prescriptions',
      icon: 'patient' as const,
      buttonColor: 'bg-[#059669]',
      route: '/patient',
    },
    {
      title: 'Management',
      description: 'Monitor hospital operations',
      icon: 'management' as const,
      buttonColor: 'bg-[#4F46E5]',
      route: '/admin',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Floating medical illustrations */}
      <div className="absolute inset-0 pointer-events-none ">
        <svg className="absolute top-20 left-20 w-32 h-32" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#2563EB" />
        </svg>
        <svg className="absolute bottom-20 right-20 w-24 h-24" viewBox="0 0 100 100">
          <rect x="20" y="40" width="60" height="20" fill="#059669" />
        </svg>
        <svg className="absolute top-1/2 left-1/4 w-16 h-16" viewBox="0 0 100 100">
          <path d="M50 20 L30 40 Q50 80 70 40 Z" fill="#4F46E5" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col justify-center items-center px-4 py-8 relative z-10"
      >
        {/* Logo Section */}
        <LogoAnimated />

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {roles.map((role, index) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-gray-700 text-sm mt-12 text-center"
        >
          Demo only — no real login
        </motion.p>
      </motion.div>
    </div>
  );
}
