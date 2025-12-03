interface FormInputProps {
    label: string;
    type?: 'text' | 'email' | 'tel' | 'number';
    value: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    error?: string;
    tooltip?: string;
}

export default function FormInput({
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    disabled = false,
    placeholder,
    error,
    tooltip,
}: FormInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'number' ? e.target.value : e.target.value;
        onChange?.(newValue);
    };

    return (
        <div className="space-y-1">
            <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-600">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {tooltip && (
                    <span
                        className="ml-2 text-gray-600 text-xs"
                        title={tooltip}
                    >
                        ⓘ
                    </span>
                )}
            </div>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full px-3 py-2 ${error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200 form-input-field'
                    : disabled
                        ? 'border-gray-200 bg-gray-50 text-gray-700'
                        : 'form-input-field'
                    }`}
            />
            {error && (
                <p className="text-red-600 text-xs">{error}</p>
            )}
        </div>
    );
}
