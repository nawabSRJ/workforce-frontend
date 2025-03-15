// modified shadcn component
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

export default function Combobox({ options, value, onChange, placeholder = "Select an option..." }) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-[200px] my-4 text-white">
            {/* Button to toggle dropdown */}
            <button
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-900  hover:bg-gray-100 hover:text-black focus:outline-none"
                onClick={() => setOpen(!open)}
            >
                {value ? options.find((option) => option.value === value)?.label : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </button>

            {/* Dropdown List */}
            {open && (
                <div className="absolute mt-2 w-full bg-gray-900 border border-gray-300 rounded-lg shadow-lg z-10">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-b border-gray-300 outline-none"
                    />
                    <ul className="max-h-48 overflow-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-black hover:font-semibold ${
                                        value === option.value ? "font-bold" : ""
                                    }`}
                                    onClick={() => {
                                        onChange(option.value); // Update parent state
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No options found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
