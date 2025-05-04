import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Check, Plus, X, PartyPopper, Trash2, Undo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Todo() {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    const [movingTask, setMovingTask] = useState(null);
    const [showUndo, setShowUndo] = useState(false);
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [deletionType, setDeletionType] = useState(null); // 'incomplete' or 'completed'

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(tasks));
    }, [tasks]);

    const NewTask = (newTask) => {
        const updatedTasks = [...tasks, { task: newTask, status: false }];
        setTasks(updatedTasks);
        setIsDialogOpen(false);
    };

    const toggleTaskStatus = (index) => {
        const task = tasks[index];
        if (!task.status) {
            setMovingTask({ ...task, index });
        }
        
        setTimeout(() => {
            const updatedTasks = [...tasks];
            updatedTasks[index].status = !updatedTasks[index].status;
            setTasks(updatedTasks);
            
            if (updatedTasks[index].status) {
                setCelebrate(true);
                setTimeout(() => setCelebrate(false), 2000);
            }
            setMovingTask(null);
        }, 300);
    };

    const clearIncompleteTasks = () => {
        const incompleteTasks = tasks.filter(task => !task.status);
        setDeletedTasks(incompleteTasks);
        setDeletionType('incomplete');
        setTasks(tasks.filter(task => task.status));
        showUndoNotification();
    };

    const clearCompletedTasks = () => {
        const completedTasks = tasks.filter(task => task.status);
        setDeletedTasks(completedTasks);
        setDeletionType('completed');
        setTasks(tasks.filter(task => !task.status));
        showUndoNotification();
    };

    const showUndoNotification = () => {
        setShowUndo(true);
        setTimeout(() => {
            setShowUndo(false);
            setDeletedTasks([]);
            setDeletionType(null);
        }, 5000);
    };

    const undoDelete = () => {
        if (deletionType === 'incomplete') {
            setTasks([...tasks, ...deletedTasks]);
        } else if (deletionType === 'completed') {
            setTasks([...deletedTasks, ...tasks]);
        }
        setShowUndo(false);
        setDeletedTasks([]);
        setDeletionType(null);
    };

    const incompleteTasks = tasks.filter(task => !task.status);
    const completedTasks = tasks.filter(task => task.status);

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto relative">
            {/* Celebration Animation */}
            <AnimatePresence>
                {celebrate && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-10 left-0 right-0 flex justify-center z-50"
                    >
                        <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center">
                            <PartyPopper className="mr-2" />
                            <span>Task completed! Great job!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Undo Notification */}
            <AnimatePresence>
                {showUndo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-xl flex items-center">
                            <span className="mr-3">
                                {deletedTasks.length} {deletionType === 'incomplete' ? 'active' : 'completed'} tasks deleted
                            </span>
                            <button
                                onClick={undoDelete}
                                className="cursor-pointer flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors"
                            >
                                <Undo size={16} />
                                Undo
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">All Todos</h2>
                <Button
                    className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Plus size={18} />
                    New Task
                </Button>
            </div>

            {/* Incomplete Tasks */}
            <div className="space-y-3 mb-8">
                {incompleteTasks.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Active Tasks</h3>
                        <Button
                            onClick={clearIncompleteTasks}
                            variant="destructive"
                            className="cursor-pointer flex items-center gap-1"
                            size="sm"
                        >
                            <Trash2 size={16} />
                            Clear All
                        </Button>
                    </div>
                )}
                
                <AnimatePresence>
                    {incompleteTasks.map((taskItem, index) => (
                        <motion.div
                            key={`incomplete-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                                opacity: movingTask?.index === tasks.indexOf(taskItem) ? 0 : 1, 
                                y: 0,
                                x: movingTask?.index === tasks.indexOf(taskItem) ? 100 : 0
                            }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="w-full"
                        >
                            <TodoComponent 
                                task={taskItem.task} 
                                status={taskItem.status} 
                                onToggle={() => toggleTaskStatus(tasks.indexOf(taskItem))}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
                <>
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm">
                                Completed Tasks
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-end mb-4">
                            <Button
                                onClick={clearCompletedTasks}
                                variant="destructive"
                                className="cursor-pointer flex items-center gap-1"
                                size="sm"
                            >
                                <Trash2 size={16} />
                                Clear Completed
                            </Button>
                        </div>
                        
                        <AnimatePresence>
                            {completedTasks.map((taskItem, index) => (
                                <motion.div
                                    key={`completed-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className="w-full"
                                >
                                    <TodoComponent 
                                        task={taskItem.task} 
                                        status={taskItem.status} 
                                        onToggle={() => toggleTaskStatus(tasks.indexOf(taskItem))}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </>
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
                <div className="mt-10 text-center py-10 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">No tasks yet. Add your first task!</p>
                </div>
            )}

            {/* Dialog */}
            <TodoDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAddTask={NewTask}
            />
        </div>
    );
}

const TodoComponent = ({ task, status, onToggle }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.01 }}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
        >
            <button
                onClick={onToggle}
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 transition-colors ${
                    status 
                        ? 'bg-green-500 text-white' 
                        : 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500'
                }`}
            >
                {status && <Check size={16} />}
            </button>
            <span className={`flex-1 text-lg ${
                status 
                    ? "line-through text-gray-400 dark:text-gray-500" 
                    : "text-gray-800 dark:text-gray-200"
            }`}>
                {task}
            </span>
        </motion.div>
    );
};

const TodoDialog = ({ isOpen, onClose, onAddTask }) => {
    const [task, setTask] = useState("");
    const isValidTask = task.trim().length > 0;

    const handleSave = () => {
        if (isValidTask) {
            onAddTask(task.trim());
            setTask("");
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Task</h2>
                            <button 
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <X size={20} className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <textarea
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none bg-transparent dark:text-white"
                                placeholder="Type your task here..."
                                rows="4"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!isValidTask}
                                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                                    isValidTask
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Save Task
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};