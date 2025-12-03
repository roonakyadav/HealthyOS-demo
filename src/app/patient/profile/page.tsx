'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import FormInput from '@/components/common/FormInput';
import FormSelect from '@/components/common/FormSelect';
import TagInput from '@/components/common/TagInput';
import Toast from '@/components/common/Toast';

const initialProfile = {
    name: 'John Doe',
    gender: 'Male',
    age: 32,
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    bloodGroup: 'B+',
    allergies: ['Penicillin'],
    conditions: 'None',
    emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Wife',
        phone: '+91 91234 56789',
    },
};

const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
];

const relationshipOptions = [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Child', label: 'Child' },
    { value: 'Other', label: 'Other' },
];

export default function PatientProfile() {
    const [profile, setProfile] = useState({ ...initialProfile });
    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error' | 'warning';
    }>({
        visible: false,
        message: '',
        type: 'success',
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const handleSave = () => {
        // Note: In a real app, this would make an API call
        setToast({
            visible: true,
            message: 'Profile updated (demo only)',
            type: 'success',
        });
    };

    const handleReset = () => {
        setProfile({ ...initialProfile });
        setToast({
            visible: true,
            message: 'Form reset to original values',
            type: 'warning',
        });
    };

    const closeToast = () => {
        setToast({ ...toast, visible: false });
    };

    const updateProfile = (field: string, value: any) => {
        setProfile(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateEmergencyContact = (field: string, value: any) => {
        setProfile(prev => ({
            ...prev,
            emergencyContact: {
                ...prev.emergencyContact,
                [field]: value,
            },
        }));
    };

    return (
        <>
            <DashboardLayout role="patient" pageTitle="Profile">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl space-y-8"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants}>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Your Profile
                        </h1>
                        <p className="text-gray-600">
                            Review and update your personal information
                        </p>

                        {/* Profile Avatar Placeholder */}
                        <div className="mt-6 flex justify-end">
                            <div className="w-16 h-16 bg-[#059669] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    {profile.name.split(' ')[0][0]}
                                    {profile.name.split(' ')[1][0]}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Profile Information</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="section-title text-lg">Personal Information</h3>

                                <FormInput
                                    label="Full Name"
                                    type="text"
                                    value={profile.name}
                                    onChange={(value) => updateProfile('name', value)}
                                    required
                                />

                                <FormSelect
                                    label="Gender"
                                    value={profile.gender}
                                    onChange={(value) => updateProfile('gender', value)}
                                    options={genderOptions}
                                />

                                <FormInput
                                    label="Age"
                                    type="number"
                                    value={profile.age.toString()}
                                    onChange={(value) => updateProfile('age', Number(value))}
                                    required
                                />

                                <FormInput
                                    label="Phone Number"
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(value) => updateProfile('phone', value)}
                                    required
                                />

                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    tooltip="Demo – read-only"
                                />
                            </div>

                            {/* Medical Information */}
                            <div className="space-y-6">
                                <h3 className="section-title text-lg">Medical Information</h3>

                                <FormSelect
                                    label="Blood Group"
                                    value={profile.bloodGroup}
                                    onChange={(value) => updateProfile('bloodGroup', value)}
                                    options={bloodGroupOptions}
                                />

                                <TagInput
                                    label="Allergies"
                                    value={profile.allergies}
                                    onChange={(value) => updateProfile('allergies', value)}
                                    placeholder="Add an allergy..."
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-600">
                                        Medical Conditions
                                    </label>
                                    <textarea
                                        value={profile.conditions}
                                        onChange={(e) => updateProfile('conditions', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-900 rounded-lg focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-colors"
                                        placeholder="Describe any existing medical conditions..."
                                    />
                                </div>

                                {/* Emergency Contact */}
                                <h4 className="section-title text-md mt-8">Emergency Contact</h4>

                                <FormInput
                                    label="Contact Name"
                                    value={profile.emergencyContact.name}
                                    onChange={(value) => updateEmergencyContact('name', value)}
                                    required
                                />

                                <FormSelect
                                    label="Relationship"
                                    value={profile.emergencyContact.relationship}
                                    onChange={(value) => updateEmergencyContact('relationship', value)}
                                    options={relationshipOptions}
                                />

                                <FormInput
                                    label="Contact Phone"
                                    type="tel"
                                    value={profile.emergencyContact.phone}
                                    onChange={(value) => updateEmergencyContact('phone', value)}
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Demo Message */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-blue-400 border border-blue-200 rounded-2xl p-6"
                    >
                        <p className="text-blue-800 text-center">
                            <strong>Note:</strong> Demo only — changes are not saved anywhere. This is a frontend-only implementation.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6 rounded-b-2xl flex justify-end space-x-4"
                    >
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Reset Form
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors font-medium"
                        >
                            Save Changes
                        </button>
                    </motion.div>
                </motion.div>
            </DashboardLayout>

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.visible}
                onClose={closeToast}
            />
        </>
    );
}
