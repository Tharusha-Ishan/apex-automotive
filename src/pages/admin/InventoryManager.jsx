import { Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const InventoryManager = () => {
    const { vehicles, deleteVehicle } = useInventory();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            deleteVehicle(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
                <Link to="/admin/inventory/new">
                    <Button>
                        <Plus size={18} className="mr-2" />
                        Add New Vehicle
                    </Button>
                </Link>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Vehicle</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="text-zinc-300 hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <img src={vehicle.image} alt={vehicle.model} className="w-16 h-10 object-cover rounded" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                                    <div className="text-xs text-zinc-500">{vehicle.mileage.toLocaleString()} mi • {vehicle.fuelType}</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-accent-gold">
                                    ${vehicle.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded ${vehicle.status === 'Available' ? 'bg-green-500/10 text-green-500' :
                                            vehicle.status === 'Sold' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {vehicle.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link to={`/admin/inventory/edit/${vehicle.id}`}>
                                        <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                                            <Edit size={18} />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {vehicles.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                        No vehicles found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};
