import Logo from "@/Components/Logo";
import Combobox from "@/Components/ui/Combobox";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast , ToastContainer} from "react-toastify";

const tabs = ["Account", "About Project", "Budget & Pricing", "Extras"];

export default function NewProjectForm() {
    const [activeTab, setActiveTab] = useState(0);
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
        { value: "UPI", label: "UPI" },
        { value: "Net Banking", label: "Net Banking" },
        { value: "Card", label: "Card" },
    ];

    const [formData, setFormData] = useState({
        account: { name: "", email: "" },
        project: { title: "", description: "", references: "", deadline: "", revisions: "" },
        budget: { amount: "", paymentMethod: "" },
        extras: { notes: "", questions: "" },
    });
    const clearForm = () => {
        setFormData({
            account: { name: "", email: "" },
            project: { title: "", description: "", references: "", deadline: "", revisions: "" },
            budget: { amount: "", paymentMethod: "" },
            extras: { notes: "", questions: "" },
        });
    };
    

    const handleInputChange = (tab, field, value) => {
        setFormData((prev) => ({ ...prev, [tab]: { ...prev[tab], [field]: value } }));
    };

    // Validate if all fields are filled
    const validateForm = () => {
        for (const key in formData) {
            if (key === "extras") continue; // ! Skip validation for the "Extras" section
            for (const field in formData[key]) {
                if (!formData[key][field].trim()) {
                    return false;
                }
            }
        }
        return true;
    };

    // Handle form submission
    async function handleSubmit(){
        if (!validateForm()) {
            toast.error("Please fill all the fields before submitting.");
        }
        // ? POST code for when data completely filled
        const res = await axios.post(`${backendURL}/open-task`,formData);
        if(res.data.status === "ok"){
            toast.success("Task Posted successfully!!") // todo : fix not showing up coz of navigate
            clearForm();
            navigate('/client-dash');
            
        }else{
            toast.error("Cannot Post Task :/")
        }
    };

    return (
        <div className="w-full min-h-screen mx-auto p-6 bg-gray-900 text-white">
            {/* Logo */}
            <ToastContainer />
            <div className="bg-white mx-auto w-fit p-3 rounded-xl mb-5 hover:scale-102 transition-transform duration-100 cursor-grab">
                <Logo />
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-700 w-2/3 mx-auto">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`cursor-pointer px-6 py-2 w-1/4 text-center border-b-2 ${
                            activeTab === index ? "border-white font-bold" : "border-transparent text-gray-400"
                        } transition duration-200`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-2 my-4 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(activeTab + 1) * 25}%` }}></div>
            </div>

            {/* Form Content */}
            <div className="space-y-4">
                {activeTab === 0 && (
                    <TabContent title="Account Details">
                        <Input label="Full Name" value={formData.account.name} onChange={(val) => handleInputChange("account", "name", val)} />
                        <Input label="Email Address" value={formData.account.email} onChange={(val) => handleInputChange("account", "email", val)} />
                    </TabContent>
                )}
                {activeTab === 1 && (
                    <TabContent title="Project Details">
                        <Combobox 
                        options={categories} 
                        value={formData.project.category} 
                        onChange={(val) => handleInputChange("project", "category", val)} />

                        <Input label="Project Title" value={formData.project.title} onChange={(val) => handleInputChange("project", "title", val)} />
                        <Textarea label="Project Description" value={formData.project.description} onChange={(val) => handleInputChange("project", "description", val)} />
                        <Input label="References (Links)" value={formData.project.references} onChange={(val) => handleInputChange("project", "references", val)} />
                        <Input label="Deadline" type="date" value={formData.project.deadline} onChange={(val) => handleInputChange("project", "deadline", val)} />
                        <Input label="Revisions Allowed" type="number" value={formData.project.revisions} onChange={(val) => handleInputChange("project", "revisions", val)} />
                    </TabContent>
                )}
                {activeTab === 2 && (
                    <TabContent title="Budget & Pricing">
                        <Input label="Budget Amount" type="number" value={formData.budget.amount} onChange={(val) => handleInputChange("budget", "amount", val)} placeholder="Minimum 50" />
                        <label className="block text-sm font-medium mb-0 mt-5">Preferred Payment Method</label>
                        <Combobox 
                        options={paymentMethods} 
                        value={formData.budget.paymentMethod} 
                        onChange={(val) => handleInputChange("budget", "paymentMethod", val)}
                        />

                    </TabContent>
                )}
                {activeTab === 3 && (
                    <TabContent title="Extras">
                        <Textarea label="Notes for Freelancer" value={formData.extras.notes} onChange={(val) => handleInputChange("extras", "notes", val)} />
                        <Textarea label="Questions for Freelancer" value={formData.extras.questions} onChange={(val) => handleInputChange("extras", "questions", val)} />
                    </TabContent>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                <button className="btn bg-gray-600 px-4 py-2 rounded-md" disabled={activeTab === 0} onClick={() => setActiveTab((prev) => prev - 1)}>
                    Previous
                </button>
                {activeTab === tabs.length - 1 ? (
                    <button className="cursor-pointer btn bg-green-500 px-4 py-2 rounded-md text-white" onClick={handleSubmit}>
                        Submit
                    </button>
                ) : (
                    <button className="cursor-pointer btn bg-blue-500 px-4 py-2 rounded-md text-white" onClick={() => setActiveTab((prev) => prev + 1)}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

// Reusable Components
const TabContent = ({ title, children }) => (
    <div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        {children}
    </div>
);

const Input = ({ label, type = "text", value, onChange, placeholder = "" }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded-md bg-gray-800 text-white"
        />
    </div>
);

const Textarea = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded-md bg-gray-800 text-white resize-none h-24"
        />
    </div>
);
