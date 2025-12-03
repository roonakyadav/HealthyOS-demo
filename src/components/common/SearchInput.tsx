import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function SearchInput({
    placeholder = 'Search...',
    value = '',
    onChange,
}: SearchInputProps) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-label="Search icon" />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#059669] focus:border-[#059669] transition-colors"
            />
        </div>
    );
}
