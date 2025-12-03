'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning';
    isVisible: boolean;
    onClose: () => void;
    autoHideDuration?: number;
}

export default function Toast({
    message,
    type = 'success',
    isVisible,
    onClose,
    autoHideDuration = 3000,
}: ToastProps) {
    useEffect(() => {
        if (isVisible && autoHideDuration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, autoHideDuration]);

    const iconMap = {
        success: CheckCircleIcon,
        error: ExclamationTriangleIcon,
        warning: ExclamationTriangleIcon,
    };

    const colorMap = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
    };

    const Icon = iconMap[type];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 300, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 300, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="fixed top-6 right-6 z-50"
                >
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[300px] max-w-sm">
                        <div className="flex items-start">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colorMap[type]} flex items-center justify-center mr-3 mt-0.5`}>
                                <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{message}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
