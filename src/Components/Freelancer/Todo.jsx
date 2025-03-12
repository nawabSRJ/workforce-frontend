import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'

export default function Todo() {

    // Load tasks from localStorage
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Save todos to localStorage whenever tasks update
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(tasks));
    }, [tasks]);

    const NewTask = (newTask) => {
        const updatedTasks = [...tasks, { task: newTask, status: false }];
        setTasks(updatedTasks);
        setIsDialogOpen(false);  
    };

    return (
        <div>
            <div className="control-bar w-full h-fit bg-slate-300 m-4 flex sm:flex-row justify-between p-2">
                <h2 className='text-2xl font-bold sm:m-0 '>All Todos</h2>
                <Button
                    className='cursor-pointer'
                    onClick={() => setIsDialogOpen(true)}
                >New Task</Button>
                <TodoDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)} // ! sent function as prop
                    onAddTask={NewTask} // * passing function
                />
                {/* onAddTask inside TodoDialog refers to NewTask in Todo */}
            </div>

            {/* Todo List */}
            <div className="todo-list w-full h-fit m-4">
                {tasks.map((taskItem, index) => (
                    <TodoComponent key={index} task={taskItem.task} status={taskItem.status} />
                ))}
            </div>
        </div>
    );
}

const TodoComponent = ({ task, status }) => {
    const [isChecked, setIsChecked] = useState(status);

    return (
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md w-full mt-4 max-w-2xl hover:scale-102 transition-transform duration-200">
            <input
                type="checkbox"
                className="w-5 h-5 mr-3 cursor-pointer"
                onChange={() => setIsChecked(!isChecked)}
            />
            <span className={`text-lg ${isChecked ? "line-through text-gray-500" : "text-black"}`}>
                {task}
            </span>
        </div>
    );
};

const TodoDialog = ({ isOpen, onClose, onAddTask }) => {
    const [task, setTask] = useState("");

    // * Checking if input has meaningful text -> Not just space
    const isValidTask = task.trim().length > 0;

    const handleSave = () => {
        if (isValidTask) {
            onAddTask(task.trim());
            setTask("");
            onClose();  // ? function received as prop
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-trasparent bg-opacity-10 backdrop-blur-sm">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">New Task</h2>
                        <p className="text-gray-500 text-sm">
                            Enter your task below and save it to your Todo List.
                        </p>
                    </div>

                    {/* Textarea */}
                    <div className="mb-4">
                        <textarea
                            className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Type your task here..."
                            rows="4"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={onClose} // ? function received as prop
                            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className={`px-4 py-2 rounded-lg transition ${
                                isValidTask
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!isValidTask}
                        >
                            Save Task
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};
