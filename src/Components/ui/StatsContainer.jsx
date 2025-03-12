import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

const statsData = [
  { title: "Total Reminders", value: "5", change: "+20.1% from last month", icon: <DollarSign /> },
  { title: "Subscriptions", value: "+2350", change: "+180.1% from last month", icon: <Users /> },
  { title: "Sales", value: "+12,234", change: "+19% from last month", icon: <ShoppingCart /> },
  { title: "Active Now", value: "+573", change: "+201 since last hour", icon: <Activity /> }
];

const StatsContainer = () => {
  return (
    <div className="flex justify-center p-6 bg-slate-200 rounded-3xl mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {statsData.map((stat, index) => (
          <StatBox key={index} title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} />
        ))}
      </div>
    </div>
  );
};

const StatBox = ({ title, value, change, icon }) => {
  return (
    <div className="p-5 bg-[#0f0f0f] text-white rounded-lg shadow-md border border-gray-800 flex flex-col space-y-2 hover:scale-103 transition-transform duration-200 ">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <span className="text-gray-400">{icon}</span>
      </div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-xs text-gray-500">{change}</p>
    </div>
  );
};

export default StatsContainer;
