// components/PrivateOrderForm.jsx
import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Combobox from "@/Components/ui/Combobox";
import Logo from "@/Components/Logo";

const PrivateOrderForm = ({ clientId, freelancerId, onClose }) => {
    const [formData, setFormData] = useState({
        projTitle: '',
        description: '',
        category: '',
        references: [],
        deadline: '',
        revisionsAllowed: 3,
        budgetAmount: 50,
        paymentMethod: '',
        freelancerNotes: ''
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

    const categories = [
        { value: "Web Development", label: "Web Development" },
        { value: "Videography", label: "Videography" },
        { value: "Video Editing", label: "Video Editing" },
        { value: "Voice Over", label: "Voice Over" },
        { value: "Graphic Designing", label: "Graphic Designing" },
    ];

    const paymentMethods = [
        { value: "UPI", label: "UPI" },
        { value: "Net Banking", label: "Net Banking" },
        { value: "Card", label: "Card" },
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + uploadedFiles.length > 3) {
            toast.error("Maximum 3 files allowed");
            return;
        }
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const formDataToSend = new FormData();
            
            // Append basic fields
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => formDataToSend.append(key, item));
                } else {
                    formDataToSend.append(key, value);
                }
            });

            // Append files
            uploadedFiles.forEach(file => {
                formDataToSend.append('samples', file);
            });

            // Add relationship IDs
            formDataToSend.append('clientId', clientId);
            formDataToSend.append('freelancerId', freelancerId);

            const response = await axios.post(`${backendURL}/private-tasks`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data) {
                toast.success('Private order created successfully!');
                onClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating private order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl relative p-6 max-h-[90vh] flex flex-col">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full z-10"
                >
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>

                <div className="mb-6 flex-shrink-0">
                    <Logo className="h-12 w-auto mx-auto" />
                    <h2 className="text-2xl font-bold text-center mt-4">Create Private Order</h2>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex-1 flex flex-col overflow-hidden">

                    <div className="flex-1 overflow-y-auto pr-2 -mr-2"> {/* Scrollable area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Project Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.projTitle}
                                        onChange={(e) => handleChange('projTitle', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <Combobox
                                        options={categories}
                                        value={formData.category}
                                        onChange={(val) => handleChange('category', val)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Deadline</label>
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.deadline}
                                        onChange={(e) => handleChange('deadline', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Budget Amount (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        min="50"
                                        step="50"
                                        value={formData.budgetAmount}
                                        onChange={(e) => handleChange('budgetAmount', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                                    <Combobox
                                        options={paymentMethods}
                                        value={formData.paymentMethod}
                                        onChange={(val) => handleChange('paymentMethod', val)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Revisions Allowed</label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        value={formData.revisionsAllowed}
                                        onChange={(e) => handleChange('revisionsAllowed', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pb-4">
                            <label className="block text-sm font-medium mb-2">Project Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="pb-4">
                            <label className="block text-sm font-medium mb-2">Reference Links (comma separated)</label>
                            <input
                                type="text"
                                value={formData.references.join(',')}
                                onChange={(e) => handleChange('references', e.target.value.split(','))}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="pb-4">
                            <label className="block text-sm font-medium mb-2">Files Upload (Max 3)</label>
                            <div className="border-dashed border-2 rounded-lg p-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                        disabled={uploadedFiles.length >= 3}
                                    >
                                        Upload Files
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        multiple
                                        className="hidden"
                                        accept="image/*, video/*, audio/*, .pdf, .doc, .docx"
                                    />
                                    <span className="text-sm text-gray-500">
                                        {uploadedFiles.length} / 3 files selected
                                    </span>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-2">
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <span className="truncate">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pb-4">
                            <label className="block text-sm font-medium mb-2">Notes for Freelancer</label>
                            <textarea
                                value={formData.freelancerNotes}
                                onChange={(e) => handleChange('freelancerNotes', e.target.value)}
                                className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700 flex-shrink-0">
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {loading ? 'Creating...' : 'Create Private Order'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PrivateOrderForm;