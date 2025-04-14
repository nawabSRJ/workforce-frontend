import { useState } from "react";
import countryCodes from "../../Data/countryCodes.js"; // Update path as needed

export default function PhoneInput({ value, onChange, country, onCountryChange }) {
    const [filter, setFilter] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Get all countries from our custom data
    const allCountries = countryCodes.map(c => ({
        code: c.callingCode,
        name: c.name,
        countryCode: c.code
    }));

    const filteredCountries = allCountries.filter(c => 
        c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.code.includes(filter)
    );

    return (
        <div className="space-y-2">
            <div className="relative">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-24 p-3 border rounded-md bg-gray-50 text-left"
                    >
                        {country?.code || "Code"}
                    </button>
                    <input
                        type="tel"
                        value={value}
                        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
                        placeholder="Phone number"
                        className="flex-1 p-3 border rounded-md"
                        disabled={!country}
                    />
                </div>

                {showDropdown && (
                    <div className="absolute top-full left-0 w-64 mt-2 bg-white border rounded-lg shadow-lg z-10">
                        <input
                            type="text"
                            placeholder="Search country..."
                            className="w-full p-2 border-b"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.map((c) => (
                                <button
                                    key={c.countryCode}
                                    type="button"
                                    className="w-full p-2 text-left hover:bg-gray-100"
                                    onClick={() => {
                                        onCountryChange(c);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {c.name} ({c.code})
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {!country && (
                <p className="text-sm text-red-500">Please select a country first</p>
            )}
        </div>
    );
}