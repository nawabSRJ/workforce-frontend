import { useState, useEffect } from "react";

export default function AdminSettings() {
  // State for settings
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    autoBackup: false,
    twoFactorAuth: false,
  });

  // Load settings from local storage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("adminSettings"));
    if (savedSettings) setSettings(savedSettings);
  }, []);

  // Save settings to local storage
  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }, [settings]);

  // Toggle function
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Apply dark mode class
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
        Admin Settings
      </h1>

      <div className="max-w-xl mx-auto space-y-4">
        {[
          { key: "notifications", label: "Enable Notifications" },
          { key: "darkMode", label: "Dark Mode" },
          { key: "emailUpdates", label: "Email Updates" },
          { key: "autoBackup", label: "Enable Auto Backup" },
          { key: "twoFactorAuth", label: "Two-Factor Authentication" },
        ].map(({ key, label }) => (
          <div
            key={key}
            className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <span className="text-lg text-gray-800 dark:text-gray-200">
              {label}
            </span>
            <button
              onClick={() => toggleSetting(key)}
              className={`px-4 py-2 text-white font-bold rounded-lg ${
                settings[key] ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {settings[key] ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}