import React, { useState, useEffect } from "react";
import DashSideBar from '../Components/DashSideBar';
import fs from "fs"; // File system module for storing tasks

const FreelancerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from file on component mount
  useEffect(() => {
    fs.readFile("tasks.json", "utf8", (err, data) => {
      if (!err && data) {
        setTasks(JSON.parse(data));
      }
    });
  }, []);

  // Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { id: Date.now(), text: newTask }];
    setTasks(updatedTasks);
    setNewTask("");
    saveTasks(updatedTasks);
  };

  // Save tasks to file
  const saveTasks = (taskList) => {
    fs.writeFile("tasks.json", JSON.stringify(taskList), (err) => {
      if (err) console.error("Error saving tasks:", err);
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashSideBar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>

        {/* My Task Todo Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">My Task Todo</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="p-2 border-b">{task.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;