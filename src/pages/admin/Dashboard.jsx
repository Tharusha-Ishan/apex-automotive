import { useInventory } from '../../context/InventoryContext';
import { BadgeDollarSign, Car, Activity } from 'lucide-react';

export const Dashboard = () => {
    const { vehicles } = useInventory();

    const totalValue = vehicles.reduce((sum, v) => sum + v.price, 0);
    const totalVehicles = vehicles.length;
    // Mock simple stats
    const activeListings = vehicles.filter(v => v.status === 'Available').length;

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-500`}>
                    <Icon size={24} className="text-accent-gold" />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Inventory Value"
                    value={`$${totalValue.toLocaleString()}`}
                    icon={BadgeDollarSign}
                />
                <StatCard
                    title="Total Vehicles"
                    value={totalVehicles}
                    icon={Car}
                />
                <StatCard
                    title="Active Listings"
                    value={activeListings}
                    icon={Activity}
                />
            </div>
        </div>
    );
};
