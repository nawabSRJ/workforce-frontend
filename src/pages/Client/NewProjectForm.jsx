import Logo from "@/Components/Logo";
import Combobox from "@/Components/ui/Combobox";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tabs = ["Account", "About Project", "Budget & Pricing", "Extras"];

export default function NewProjectForm() {
    const [activeTab, setActiveTab] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

    // Project categories:
    const categories = [
        { value: "Web Development", label: "Web Development" },
        { value: "Videography", label: "Videography" },
        { value: "Video Editing", label: "Video Editing" },
        { value: "Voice Over", label: "Voice Over" },
        { value: "Graphic Designing", label: "Graphic Designing" },
    ];

    // Payment categories:
    const paymentMethods = [
        { value: "UPI", label: "UPI (subject to change)" },
        { value: "Net Banking", label: "Net Banking (subject to change)" },
        { value: "Card", label: "Card (subject to change)" },
    ];

    const [formData, setFormData] = useState({
        account: { name: "", email: "" },
        project: {
            title: "",
            description: "",
            references: "",
            deadline: "",
            revisions: 3,
            category: ""
        },
        budget: { amount: 50, paymentMethod: "" },
        extras: { notes: "", questions: "" },
    });

    const clearForm = () => {
        setFormData({
            account: { name: "", email: "" },
            project: {
                title: "",
                description: "",
                references: "",
                deadline: "",
                revisions: 3,
                category: ""
            },
            budget: { amount: 50, paymentMethod: "" },
            extras: { notes: "", questions: "" },
        });
        setUploadedFiles([]);
    };

    const handleInputChange = (tab, field, value) => {
        if ((field === "revisions" || field === "amount") && value < 0) {
            value = 0;
        }
        setFormData((prev) => ({ ...prev, [tab]: { ...prev[tab], [field]: value } }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + uploadedFiles.length > 3) {
            toast.error("You can upload a maximum of 3 files");
            return;
        }

        const validFiles = files.filter(file => {
            const fileType = file.type.split('/')[0];
            const isValid = ['image', 'video', 'audio', 'application', 'text'].includes(fileType);
            if (!isValid) {
                toast.error(`Unsupported file type: ${file.name}`);
            }
            return isValid;
        });

        setUploadedFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        for (const key in formData) {
            if (key === "extras") continue;
            for (const field in formData[key]) {
                if (!formData[key][field] && formData[key][field] !== 0) {
                    toast.error(`Please fill all required fields. Missing: ${field} in ${key}`);
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            const formDataToSend = new FormData();
    
            // Append account fields
            formDataToSend.append('clientName', formData.account.name.trim());
            formDataToSend.append('clientEmail', formData.account.email.trim());
    
            // Append project fields
            formDataToSend.append('projTitle', formData.project.title.trim());
            formDataToSend.append('description', formData.project.description.trim());
            formDataToSend.append('category', formData.project.category);
            formDataToSend.append('references', formData.project.references.trim());
            
            // Format date properly (YYYY-MM-DD)
            const formattedDate = new Date(formData.project.deadline).toISOString().split('T')[0];
            formDataToSend.append('deadline', formattedDate);
            
            formDataToSend.append('revisionsAllowed', formData.project.revisions.toString());
    
            // Append budget fields
            formDataToSend.append('budgetAmount', formData.budget.amount.toString());
            formDataToSend.append('paymentMethod', formData.budget.paymentMethod);
    
            // Append extras fields
            formDataToSend.append('freelancerNotes', formData.extras.notes.trim());
            formDataToSend.append('freelancerQues', formData.extras.questions.trim());
    
            // Append files
            uploadedFiles.forEach(file => {
                formDataToSend.append('samples', file);
            });
    
            // Debug: Log FormData contents
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }
    
            const res = await axios.post(`${backendURL}/open-task`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (res.data.status === "ok") {
                toast.success("Task Posted successfully!!");
                setTimeout(() => {
                    clearForm();
                    navigate('/client-dash');
                }, 2000);
            } else {
                toast.error("Cannot Post Task :/");
            }
        } catch (error) {
            console.error("Submission error:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Failed to submit project");
            } else {
                toast.error("Failed to submit project. Please try again.");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="w-full min-h-screen mx-auto p-6 bg-gray-900 text-white"
        >
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="bg-gray-800 mx-auto w-fit p-3 rounded-xl mb-5 hover:scale-102 transition-transform duration-100 cursor-grab shadow-lg">
                <Logo darkMode={true} />
            </div>

            <div className="flex border-b border-gray-700 w-full md:w-2/3 mx-auto">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`cursor-pointer px-4 py-2 w-full md:w-1/4 text-center border-b-2 ${activeTab === index
                                ? "border-blue-500 font-bold text-blue-400"
                                : "border-transparent text-gray-400 hover:text-gray-300"
                            } transition duration-200`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="w-full bg-gray-700 h-2 my-4 rounded-full">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(activeTab + 1) * 25}%` }}
                ></div>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
                {activeTab === 0 && (
                    <TabContent title="Account Details">
                        <Input
                            label="Full Name"
                            value={formData.account.name}
                            onChange={(val) => handleInputChange("account", "name", val)}
                            required
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            value={formData.account.email}
                            onChange={(val) => handleInputChange("account", "email", val)}
                            required
                        />
                    </TabContent>
                )}
                {activeTab === 1 && (
                    <TabContent title="Project Details">
                        <Combobox
                            options={categories}
                            value={formData.project.category}
                            onChange={(val) => handleInputChange("project", "category", val)}
                            placeholder="Select project category"
                            required
                        />

                        <Input
                            label="Project Title"
                            value={formData.project.title}
                            onChange={(val) => handleInputChange("project", "title", val)}
                            required
                        />
                        <Textarea
                            label="Project Description"
                            value={formData.project.description}
                            onChange={(val) => handleInputChange("project", "description", val)}
                            required
                        />
                        <Input
                            label="References (Links)"
                            value={formData.project.references}
                            onChange={(val) => handleInputChange("project", "references", val)}
                            placeholder="https://example.com"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Deadline"
                                type="date"
                                value={formData.project.deadline}
                                onChange={(val) => {
                                    const date = new Date(val);
                                    if (!isNaN(date.getTime())) {
                                        handleInputChange("project", "deadline", val);
                                    }
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            /> 
                            {/* added validation in date field */}
                            <Input
                                label="Revisions Allowed"
                                type="number"
                                value={formData.project.revisions}
                                onChange={(val) => handleInputChange("project", "revisions", val)}
                                min="0"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Upload Reference Files (Max 3)</label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                                    disabled={uploadedFiles.length >= 3}
                                >
                                    Choose Files
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    multiple
                                    accept="image/*, video/*, audio/*, .pdf, .txt, .doc, .docx"
                                    className="hidden"
                                    disabled={uploadedFiles.length >= 3}
                                />
                                <span className="text-sm text-gray-400">
                                    {uploadedFiles.length} / 3 files selected
                                </span>
                            </div>

                            {uploadedFiles.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                            <span className="truncate max-w-xs">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabContent>
                )}
                {activeTab === 2 && (
                    <TabContent title="Budget & Pricing">
                        <Input
                            label="Budget Amount (INR)"
                            type="number"
                            value={formData.budget.amount}
                            onChange={(val) => handleInputChange("budget", "amount", val)}
                            min="50"
                            step="50"
                            required
                        />
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">Preferred Payment Method</label>
                            <Combobox
                                options={paymentMethods}
                                value={formData.budget.paymentMethod}
                                onChange={(val) => handleInputChange("budget", "paymentMethod", val)}
                                required
                            />
                            <p className="text-xs text-gray-400 mt-1">Payment method can be changed later</p>
                        </div>
                    </TabContent>
                )}
                {activeTab === 3 && (
                    <TabContent title="Extras">
                        <Textarea
                            label="Notes for Freelancer"
                            value={formData.extras.notes}
                            onChange={(val) => handleInputChange("extras", "notes", val)}
                            placeholder="Any special instructions or notes..."
                        />
                        <Textarea
                            label="Questions for Freelancer"
                            value={formData.extras.questions}
                            onChange={(val) => handleInputChange("extras", "questions", val)}
                            placeholder="Any questions you'd like to ask potential freelancers..."
                        />
                    </TabContent>
                )}
            </div>

            <div className="flex justify-between mt-8 max-w-3xl mx-auto">
                <button
                    type="button"
                    className={`px-6 py-2 rounded-md ${activeTab === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500'}`}
                    disabled={activeTab === 0}
                    onClick={() => setActiveTab((prev) => prev - 1)}
                >
                    Previous
                </button>
                {activeTab === tabs.length - 1 ? (
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-md text-white hover:from-green-600 hover:to-green-700 transition-colors shadow-lg"
                    >
                        Submit Project
                    </button>
                ) : (
                    <button
                        type="button"
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md text-white hover:from-blue-600 hover:to-blue-700 transition-colors shadow-lg"
                        onClick={() => setActiveTab((prev) => prev + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
        </form>
    );
}

const TabContent = ({ title, children }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-blue-400">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const Input = ({ label, type = "text", value, onChange, placeholder = "", required = false, min, step }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required={required}
            min={min}
            step={step}
        />
    </div>
);

const Textarea = ({ label, value, onChange, placeholder = "", required = false }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-32"
            placeholder={placeholder}
            required={required}
        />
    </div>
);