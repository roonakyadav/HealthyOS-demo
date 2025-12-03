'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TagInputProps {
    label: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export default function TagInput({
    label,
    value,
    onChange,
    placeholder = 'Add an allergy...',
}: TagInputProps) {
    const [inputValue, setInputValue] = useState('');

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !value.includes(trimmedTag)) {
            onChange([...value, trimmedTag]);
        }
        setInputValue('');
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-600">{label}</label>

            {/* Tag Display */}
            <div className="flex flex-wrap gap-2">
                {value.map((tag, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 p-0.5 rounded-full hover:bg-blue-200 transition-colors"
                            aria-label={`Remove ${tag}`}
                        >
                            <XMarkIcon className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Input */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => inputValue && addTag(inputValue)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
        </div>
    );
}
