import { motion } from 'framer-motion';

interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
}

export default function MetricCard({ title, value, icon: Icon, color, bgColor }: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-medium text-gray-600"
                    >
                        {title}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        className="text-3xl font-bold text-gray-900 mt-1"
                    >
                        {value}
                    </motion.p>
                </div>
                <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}
                >
                    <Icon className={`w-6 h-6 ${color}`} />
                </motion.div>
            </div>
        </motion.div>
    );
}
