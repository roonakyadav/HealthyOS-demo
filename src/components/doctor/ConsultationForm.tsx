'use client';

interface ConsultationFormProps {
    symptoms: string;
    diagnosis: string;
    notes: string;
    labRequests: string[];
    onSymptomsChange: (value: string) => void;
    onDiagnosisChange: (value: string) => void;
    onNotesChange: (value: string) => void;
    onLabRequestsChange: (tags: string[]) => void;
    readonly?: boolean;
}

const LAB_REQUESTS_OPTIONS = [
    'CBC',
    'X-Ray Chest',
    'ECG',
    'Lipid Profile',
    'Hemoglobin',
    'Glucose',
    'Urine Analysis',
    'Liver Function',
];

export default function ConsultationForm({
    symptoms,
    diagnosis,
    notes,
    labRequests,
    onSymptomsChange,
    onDiagnosisChange,
    onNotesChange,
    onLabRequestsChange,
    readonly = false,
}: ConsultationFormProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100"><span className="section-title">Consultation Details</span></h3>

            {/* <span class="section-title">Symptoms</span> */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-600"><span className="section-title">Symptoms</span></label>
                <textarea
                    value={symptoms}
                    onChange={(e) => onSymptomsChange(e.target.value)}
                    disabled={readonly}
                    rows={3}
                    placeholder="Describe patient's reported symptoms..."
                    className={`w-full px-3 py-2 form-input-field ${readonly
                        ? 'border-gray-200 bg-gray-100 text-gray-700'
                        : ''
                        }`}
                />
            </div>

            {/* <span class="section-title">Diagnosis</span> */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-600"><span className="section-title">Diagnosis</span></label>
                <textarea
                    value={diagnosis}
                    onChange={(e) => onDiagnosisChange(e.target.value)}
                    disabled={readonly}
                    rows={2}
                    placeholder="Final diagnosis..."
                    className={`w-full px-3 py-2 form-input-field ${readonly
                        ? 'border-gray-200 bg-gray-100 text-gray-700'
                        : ''
                        }`}
                />
            </div>

            {/* Lab Requests */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-600">Lab Requests</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {LAB_REQUESTS_OPTIONS.map((test) => (
                        <button
                            key={test}
                            type="button"
                            onClick={() => {
                                if (readonly) return;
                                if (labRequests.includes(test)) {
                                    onLabRequestsChange(labRequests.filter(t => t !== test));
                                } else {
                                    onLabRequestsChange([...labRequests, test]);
                                }
                            }}
                            disabled={readonly}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${labRequests.includes(test)
                                ? 'bg-blue-500 text-white'
                                : readonly
                                    ? 'bg-gray-200 text-gray-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                                }`}
                        >
                            {test}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-gray-700">Click tests to add/remove lab requests</p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-900"><span className="section-title">Consultation Notes</span></label>
                <textarea
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    disabled={readonly}
                    rows={4}
                    placeholder="Additional notes, follow-up instructions, etc..."
                    className={`w-full px-3 py-2 form-input-field ${readonly
                        ? 'border-gray-900 bg-gray-900 text-gray-900'
                        : ''
                        }`}
                />
            </div>
        </div>
    );
}
