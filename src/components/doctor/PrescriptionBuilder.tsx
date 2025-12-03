'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FormInput from '../common/FormInput';

interface Prescription {
    id: string;
    name: string;
    dose: string;
    frequency: string;
    duration: string;
}

interface PrescriptionBuilderProps {
    prescriptions: Prescription[];
    onChange: (prescriptions: Prescription[]) => void;
    readonly?: boolean;
}

const SUGGESTED_MEDICINES = [
    'Aspirin',
    'Ibuprofen',
    'Amoxicillin',
    'Metformin',
    'Lisinopril',
    'Simvastatin',
    'Omeprazole',
    'Albuterol',
    'Prednisone',
    'Warfarin',
];

export default function PrescriptionBuilder({
    prescriptions,
    onChange,
    readonly = false,
}: PrescriptionBuilderProps) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addPrescription = () => {
        if (readonly) return;

        const newPrescription: Prescription = {
            id: Date.now().toString(),
            name: '',
            dose: '',
            frequency: '',
            duration: '',
        };
        onChange([...prescriptions, newPrescription]);
    };

    const removePrescription = (id: string) => {
        if (readonly) return;
        onChange(prescriptions.filter(p => p.id !== id));
    };

    const updatePrescription = (id: string, field: keyof Prescription, value: string) => {
        onChange(
            prescriptions.map(p =>
                p.id === id ? { ...p, [field]: value } : p
            )
        );
    };

    const filteredSuggestions = SUGGESTED_MEDICINES.filter(
        med => med.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="section-title text-lg"><span className="section-title">Prescriptions</span></h3>
                {!readonly && (
                    <button
                        onClick={addPrescription}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Medicine
                    </button>
                )}
            </div>

            {prescriptions.length === 0 ? (
                <p className="text-gray-600 text-sm italic">No prescriptions added yet</p>
            ) : (
                <div className="space-y-4">
                    {prescriptions.map((prescription, index) => (
                        <div
                            key={prescription.id}
                            className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600mb-1">
                                        Medicine Name
                                    </label>
                                    <input
                                        type="text"
                                        value={prescription.name}
                                        onChange={(e) => {
                                            updatePrescription(prescription.id, 'name', e.target.value);
                                            setInputValue(e.target.value);
                                            setShowSuggestions(e.target.value.length > 0);
                                        }}
                                        disabled={readonly}
                                        placeholder="Type to search medicines..."
                                        className={`w-full px-3 py-2 form-input-field ${readonly
                                            ? 'border-gray-200 bg-gray-100 text-gray-700'
                                            : ''
                                            }`}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                        onFocus={() => prescription.name && setShowSuggestions(true)}
                                    />
                                    {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
                                        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                                            {filteredSuggestions.map((med) => (
                                                <button
                                                    key={med}
                                                    type="button"
                                                    onClick={() => {
                                                        updatePrescription(prescription.id, 'name', med);
                                                        setShowSuggestions(false);
                                                        setInputValue('');
                                                    }}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
                                                >
                                                    {med}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <FormInput
                                    label="Dose"
                                    value={prescription.dose}
                                    onChange={(value) => updatePrescription(prescription.id, 'dose', value)}
                                    disabled={readonly}
                                    placeholder="e.g., 40mg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput
                                    label="Frequency"
                                    value={prescription.frequency}
                                    onChange={(value) => updatePrescription(prescription.id, 'frequency', value)}
                                    disabled={readonly}
                                    placeholder="e.g., 1/day"
                                />
                                <FormInput
                                    label="Duration"
                                    value={prescription.duration}
                                    onChange={(value) => updatePrescription(prescription.id, 'duration', value)}
                                    disabled={readonly}
                                    placeholder="e.g., 7 days"
                                />
                            </div>

                            {!readonly && (
                                <button
                                    onClick={() => removePrescription(prescription.id)}
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Remove prescription"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!readonly && prescriptions.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Preview</h4>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="space-y-2">
                            {prescriptions.map((p) => (
                                <div key={p.id} className="text-sm text-blue-800">
                                    <strong>{p.name || 'Unnamed medicine'}</strong>
                                    {p.dose && ` - ${p.dose}`}
                                    {p.frequency && ` - ${p.frequency}`}
                                    {p.duration && ` - ${p.duration}`}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
