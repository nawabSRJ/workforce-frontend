import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
// small change

const ProjectCard = ({ title, description, tags, assignee, dueDate, progress, amount, status, completedDate }) => (
  <div className="p-4 border border-gray-200 rounded-lg mb-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
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
          className={`h-2 rounded-full ${
            status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
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
);

const Dashboard = () => {
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
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-blue-600 min-h-screen fixed left-0 top-0">
          <div className="p-4">
            <div className="bg-white rounded p-2 mb-8">
              <span className="font-semibold">WorkForce</span>
            </div>
            <nav className="space-y-2">
              {['Home', 'Projects', 'Inbox'].map((item) => (
                <button
                  key={item}
                  className={`w-full text-left p-2 rounded ${
                    item === 'Projects' ? 'bg-white text-blue-600' : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-48 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-6">My Projects</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  />
                </div>
                <select className="border rounded-lg px-4 py-2">
                  <option>Sort by: Latest</option>
                </select>
                <button className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="text-blue-600 px-4 py-2 border border-blue-600 rounded-lg">
              Load More Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;