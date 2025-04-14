import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { X, ChevronDown, Check } from "lucide-react";
import ProgressBar from "./ProgressBar";
import PhoneInput from "./PhoneInput";

const FORM_STEPS = [
    'Personal Info',
    'Professional Details',
    'Contact Info',
    'Review'
];

export default function FreelancerSignUp({ switchToLogin }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        personal: { name: '', email: '', password: '', username: '', dob: '', gender: '' },
        professional: { bio: '', tags: [], portfolio: '', linkedIn: '', twitter: '' },
        contact: { country: null, phone: '' }
    });
    const [loading, setLoading] = useState(false);
    const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;

    // Step Handlers
    const handleNextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1));
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    // Validation Logic
    const validateCurrentStep = () => {
        switch (currentStep) {
            case 0:
                if (!formData.personal.name || !formData.personal.email || !formData.personal.password || !formData.personal.username || !formData.personal.dob || !formData.personal.gender) {
                    toast.error("Please fill all personal information fields");
                    return false;
                }
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.personal.password)) {
                    toast.error("Password must be at least 8 characters with letters and numbers");
                    return false;
                }
                break;
            case 1:
                if (!formData.professional.bio || formData.professional.tags.length === 0) {
                    toast.error("Please add a bio and at least one skill tag");
                    return false;
                }
                if (formData.professional.bio.length < 100) {
                    toast.error("Bio should be at least 100 characters");
                    return false;
                }
                break;
            case 2:
                if (!formData.contact.country || !formData.contact.phone) {
                    toast.error("Please provide valid contact information");
                    return false;
                }
                if (!/^\d{10}$/.test(formData.contact.phone)) {
                    toast.error("Phone number must be 10 digits");
                    return false;
                }
                break;
        }
        return true;
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // * this if block prevents pre-mature submission
        if (currentStep !== FORM_STEPS.length - 1) {
            return;
        }
        if (!validateCurrentStep()) return;

        setLoading(true);

        const payload = {
            ...formData.personal,
            ...formData.professional,
            country: formData.contact.country.name,
            phone: {
                code: formData.contact.country.code,
                number: formData.contact.phone
            },
            dateOfBirth: new Date(formData.personal.dob)
        };

        try {
            const response = await axios.post(`${backendURL}/freelancer-signup`, payload);
            if (response.data.status === 'ok') {
                toast.success("Account created successfully!");
                setTimeout(switchToLogin, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg mx-4">
            <h2 className="text-2xl text-center font-bold mb-5">Freelancer Sign Up</h2>
            <ProgressBar steps={FORM_STEPS.length} currentStep={currentStep} />

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {currentStep === 0 && (
                    <PersonalInfoStep
                        data={formData.personal}
                        setData={(data) => setFormData(prev => ({ ...prev, personal: data }))}
                    />
                )}

                {currentStep === 1 && (
                    <ProfessionalInfoStep
                        data={formData.professional}
                        setData={(data) => setFormData(prev => ({ ...prev, professional: data }))}
                    />
                )}

                {currentStep === 2 && (
                    <ContactInfoStep
                        data={formData.contact}
                        setData={(data) => setFormData(prev => ({ ...prev, contact: data }))}
                    />
                )}

                {currentStep === 3 && <ReviewStep data={formData} />}

                <div className="flex justify-between gap-4">
                    {currentStep > 0 && (
                        <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex-1"
                        >
                            Back
                        </button>
                    )}

                    <button
                        type={currentStep === FORM_STEPS.length - 1 ? "submit" : "button"}
                        onClick={currentStep === FORM_STEPS.length - 1 ? undefined : handleNextStep}
                        disabled={loading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-3 flex-1 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            'Processing...'
                        ) : currentStep === FORM_STEPS.length - 1 ? (
                            'Complete Signup'
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </form>
            <div className="signIn-text inline text-center">
            <p>Already have an account? <a onClick={switchToLogin} className="text-blue-600 cursor-pointer">Sign-in</a></p>
            
            </div>
            
        </div>
    );
}

// Step Components
const PersonalInfoStep = ({ data, setData }) => (
    <div className="space-y-4">
        <Input
            label="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
        />
        <Input
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
        />
        <Input
            label="Password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            helperText="Minimum 8 characters with at least 1 letter and 1 number"
        />
        <Input
            label="Username"
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
            helperText="Select a username for your account"
        />
        <Input
            label="Date of Birth"
            type="date"
            value={data.dob}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setData({ ...data, dob: e.target.value })}
            required
        />
        <GenderSelect
            value={data.gender}
            onChange={(gender) => setData({ ...data, gender })}
        />
    </div>
);

const ProfessionalInfoStep = ({ data, setData }) => {
    const [input, setInput] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleBioChange = (e) => {
        const value = e.target.value;
        if (value.length <= 500) {
            setData({ ...data, bio: value });
            setCharCount(value.length);
        }
    };

    return (
        <div className="space-y-4">
            <Textarea
                label="Professional Bio"
                value={data.bio}
                onChange={handleBioChange}
                required
                helperText={`${charCount}/500 characters (minimum 100)`}
            />
            <TagInput
                tags={data.tags}
                input={input}
                setInput={setInput}
                onAdd={(tag) => {
                    if (!data.tags.includes(tag.trim()) && tag.trim()) {
                        setData({ ...data, tags: [...data.tags, tag.trim()] });
                        setInput('');
                    }
                }}
                onRemove={(tag) => setData({ ...data, tags: data.tags.filter(t => t !== tag) })}
            />
            <Input
                label="Portfolio Website"
                type="url"
                value={data.portfolio}
                onChange={(e) => setData({ ...data, portfolio: e.target.value })}
                placeholder="https://"
            />
            <SocialInputs data={data} setData={setData} />
        </div>
    );
};

const ContactInfoStep = ({ data, setData }) => (
    <div className="space-y-4">
        <PhoneInput
            value={data.phone}
            onChange={(number) => setData({ ...data, phone: number })}
            country={data.country}
            onCountryChange={(country) => setData({ ...data, country })}
        />
    </div>
);

const ReviewStep = ({ data }) => (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <ReviewItem label="Full Name" value={data.personal.name} />
        <ReviewItem label="Email" value={data.personal.email} />
        <ReviewItem label="Date of Birth" value={new Date(data.personal.dob).toLocaleDateString()} />
        <ReviewItem label="Gender" value={data.personal.gender} />
        <ReviewItem label="Skills" value={data.professional.tags.join(', ')} />
        <ReviewItem label="Contact" value={`${data.contact.country?.code} ${data.contact.phone}`} />
    </div>
);

// Reusable Components
const Input = ({ label, helperText, ...props }) => (
    <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
            {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            {...props}
        />
        {helperText && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
);

const GenderSelect = ({ value, onChange }) => (
    <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
            Gender <span className="text-red-500">*</span>
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 pr-8"
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
    </div>
);

const TagInput = ({ tags, input, setInput, onAdd, onRemove }) => (
    <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
            Skills <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (onAdd(input), e.preventDefault())}
                placeholder="Add skills (e.g., React, UI/UX)"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
                type="button"
                onClick={() => onAdd(input)}
                className="px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
                <Check size={18} className="mr-1" />
                Add
            </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    {tag}
                    <button
                        type="button"
                        onClick={() => onRemove(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                        <X size={16} />
                    </button>
                </span>
            ))}
        </div>
    </div>
);

const SocialInputs = ({ data, setData }) => (
    <div className="space-y-4">
        <Input
            label="LinkedIn Profile"
            type="url"
            value={data.linkedIn}
            onChange={(e) => setData({ ...data, linkedIn: e.target.value })}
            placeholder="https://linkedin.com/in/username"
        />
        <Input
            label="Twitter Handle"
            value={data.twitter}
            onChange={(e) => setData({ ...data, twitter: e.target.value.replace('@', '') })}
            placeholder="username (without @)"
        />
    </div>
);

const Textarea = ({ label, value, onChange, helperText, required }) => (
    <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none min-h-[120px]"
            required={required}
        />
        {helperText && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
);

const ReviewItem = ({ label, value }) => (
    <div className="flex justify-between items-center p-2 even:bg-gray-100 rounded">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="text-gray-800">{value || '-'}</span>
    </div>
);