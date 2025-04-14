export default function ProgressBar({ steps, currentStep }) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep + 1) * (100 / steps)}%` }}
            ></div>
            <div className="flex justify-between mt-2">
                {[...Array(steps)].map((_, i) => (
                    <span 
                        key={i}
                        className={`text-sm ${i <= currentStep ? 'text-blue-500' : 'text-gray-400'}`}
                    >
                        Step {i + 1}
                    </span>
                ))}
            </div>
        </div>
    );
}