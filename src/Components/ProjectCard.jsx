import React from 'react'
// small change

export default function ProjectCard({ title, desc, tags, assignee, dueDate, progress, amount, status, completeDate }) {
    const [activeTab, setActiveTab] = useState('All Projects');
    const tabs = ['All Projects', 'Active', 'Pending', 'Completed'];

    const projects = [
        {
            title: 'E-commerce Website Development',
            description: 'Full-stack development with React and Node.js',
            tags: ['React', 'Node.js', 'MongoDB'],
            assignee: 'Alex Johnson',
            dueDate: 'Jan 15, 2024',
            progress: 75,
            amount: 5000,
            status: 'In Progress'
        },
        {
            title: 'Mobile App UI Design',
            description: 'UI/UX design for iOS fitness application',
            tags: ['Figma', 'UI/UX', 'iOS'],
            assignee: 'Sarah Smith',
            completedDate: 'Dec 20, 2023',
            progress: 100,
            amount: 3500,
            status: 'Completed'
        }
    ];

    return (
        <div className="p-4 border border-gray-200 rounded-lg mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                            }`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{description}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                    <p className="text-sm">{assignee}</p>
                    <p className="text-xs text-gray-500">
                        {status === 'Completed' ? `Completed: ${completedDate}` : `Due: ${dueDate}`}
                    </p>
                </div>
            </div>

            <div className="mb-3">
                <div className="flex justify-between mb-1">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">${amount}</span>
                <button className="text-blue-600 text-sm">View Details →</button>
            </div>
        </div>
    )
}
