'use client';

import { motion } from 'framer-motion';

interface TabSwitcherProps {
    tabs: { key: string; label: string }[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    accentColor?: string;
}

export default function TabSwitcher({
    tabs,
    activeTab,
    onTabChange,
    accentColor = 'blue'
}: TabSwitcherProps) {
    const activeIndex = tabs.findIndex(tab => tab.key === activeTab);

    return (
        <div className="relative">
            <div className="flex bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`flex-1 px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.key
                            ? `text-white bg-[#2563EB] shadow-sm`
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Animated indicator */}
            <motion.div
                className="absolute bottom-1 bg-[#2563EB] rounded-full w-1/3 h-[2px]"
                initial={{ left: '4px' }}
                animate={{
                    left: `${(activeIndex * 100) / tabs.length}%`,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                    width: `calc(100% / ${tabs.length} - 8px)`,
                }}
            />
        </div>
    );
}
