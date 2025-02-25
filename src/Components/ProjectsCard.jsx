import React, {useState} from 'react'
// small change
export default function ProjectsCard({ title, description, tags, assignee, dueDate, progress, amount, status, completeDate }) {
    const [activeTab, setActiveTab] = useState('All Projects');
    const tabs = ['All Projects', 'Active', 'Pending', 'Completed'];
  return (
    
        <div className="p-4 border border-gray-200 rounded-lg mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-left sm:text-lg text-sm font-medium">{title}</h3>
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
                        {status === 'Completed' ? `Completed: ${completeDate}` : `Due: ${dueDate} `}
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
                        // sets the progress bar
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">${amount}</span>
                <button className="text-blue-600 text-sm cursor-pointer">View Details →</button>
            </div>
        </div>
    
  )
}
