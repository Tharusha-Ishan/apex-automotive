import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const VehicleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { vehicles, addVehicle, updateVehicle } = useInventory();

    // Initial State
    const [formData, setFormData] = useState({
        make: '', model: '', year: new Date().getFullYear(), price: '', mileage: '',
        fuelType: '', transmission: '', engine: '', horsepower: '',
        status: 'Available', image: '', description: '', features: '', slug: ''
    });

    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const vehicle = vehicles.find(v => v.id === parseInt(id));
            if (vehicle) {
                setFormData({
                    ...vehicle,
                    features: vehicle.features.join(', ') // Convert array to string for editing
                });
            }
        }
    }, [id, vehicles, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic slug generation if empty
        let finalSlug = formData.slug;
        if (!finalSlug) {
            finalSlug = `${formData.year}-${formData.make}-${formData.model}`.toLowerCase().replace(/[\s/]+/g, '-');
        }

        const vehicleData = {
            ...formData,
            year: parseInt(formData.year),
            price: parseInt(formData.price),
            mileage: parseInt(formData.mileage),
            horsepower: parseInt(formData.horsepower),
            features: formData.features.split(',').map(f => f.trim()).filter(f => f), // Convert back to array
            slug: finalSlug
        };

        if (isEditing) {
            updateVehicle(parseInt(id), vehicleData);
        } else {
            addVehicle(vehicleData);
        }

        navigate('/admin/inventory');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" onClick={() => navigate('/admin/inventory')}>
                    <ArrowLeft size={18} />
                </Button>
                <h1 className="text-3xl font-bold text-white">
                    {isEditing ? `Edit ${formData.make} ${formData.model}` : 'Add New Vehicle'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Make</label>
                            <input name="make" value={formData.make} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Model</label>
                            <input name="model" value={formData.model} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Year</label>
                            <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Price ($)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white">
                                <option value="Available">Available</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Sold">Sold</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Slug (URL)</label>
                            <input name="slug" value={formData.slug} onChange={handleChange} placeholder="Auto-generated if empty" className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                    </div>
                </div>

                {/* Specs */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Mileage</label>
                            <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Fuel Type</label>
                            <input name="fuelType" value={formData.fuelType} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Transmission</label>
                            <input name="transmission" value={formData.transmission} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Engine</label>
                            <input name="engine" value={formData.engine} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Horsepower</label>
                            <input type="number" name="horsepower" value={formData.horsepower} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                        </div>
                    </div>
                </div>

                {/* Media & Details */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Media & Details</h3>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Image URL</label>
                        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white mb-2" />
                        {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded border border-zinc-700" />}
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Features (comma separated)</label>
                        <textarea name="features" value={formData.features} onChange={handleChange} rows="3" className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/inventory')}>Cancel</Button>
                    <Button type="submit">
                        <Save size={18} className="mr-2" />
                        Save Vehicle
                    </Button>
                </div>
            </form>
        </div>
    );
};
