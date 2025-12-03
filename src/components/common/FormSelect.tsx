interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    error?: string;
}

export default function FormSelect({
    label,
    value,
    onChange,
    options,
    required = false,
    disabled = false,
    placeholder,
    error,
}: FormSelectProps) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : disabled
                            ? 'border-gray-200 bg-gray-50 text-gray-700'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-red-600 text-xs">{error}</p>
            )}
        </div>
    );
}
