import React from 'react'
import { reminders } from '../Data/reminders'
import axios from 'axios'
// reminders component for freelancers
export default function Reminders(props) {

    function addNewReminder(){
        // handle new reminder btn click
        // here goes the code for posting the data to database
        
        const newReminder = {
            username: "vaishnavi",
            email: "vaishnaviawasthi760@gmail.com",
            phone: "9838726101",
            title: "WorkForce Project Submission Deadline",
            message: "Reminder: Your project submission is due soon. hehe reminder app se mail bheja hai yeh :)",
            sendAt: new Date(Date.now() + 2 * 60 * 1000) // 2 minutes from now
        }
        axios.post("http://localhost:8000/add-reminder", newReminder)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }

    return (
        <div className='flex flex-col bg-gray-white'>
            <div className="stats flex sm:flex-row items-center justify-around p-4 bg-gray-300">
                <div className="stat-box w-[200px] h-[100px] bg-blue-500 text-white font-bold">
                    Stat 1
                </div>
                <div className="stat-box w-[200px] h-[100px] bg-blue-500 text-white font-bold">
                    Stat 2
                </div>
                <div className="stat-box w-[200px] h-[100px] bg-blue-500 text-white font-bold">
                    Stat 3
                </div>
            </div>

            <div className="filters bg-gray-400 my-5 p-5">
                <button
                onClick={addNewReminder} 
                className='text-xl rounded-full bg-black text-white px-2 py-1 text-center cursor-pointer'>New Reminder</button>
            </div>
            <div className="table">

                <TableComponent />

            </div>
        </div>
    )
}

const TableComponent = () => {
    return (
        <table className="w-full max-w-5xl mx-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="py-3 px-6 text-left">S.No.</th>
                    <th className="py-3 px-6 text-left">Reminder</th>
                    <th className="py-3 px-6 text-left">Due Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Method</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {reminders.map((v,i)=>(
                <tr className="hover:bg-gray-100">
                    <td className="py-3 px-6">{i+1}</td>
                    <td className="py-3 px-6">{v.title}</td>
                    <td className="py-3 px-6">{v.sendAt}</td>
                    <td className="py-3 px-6">{v.sent ? "Completed" : "Pending"}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}
