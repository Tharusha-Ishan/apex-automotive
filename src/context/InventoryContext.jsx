import { createContext, useContext, useState, useEffect } from 'react';
import { vehicles as initialVehicles } from '../data/vehicles';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState(() => {
        // Try to load from local storage first to persist across refreshes during dev
        const saved = localStorage.getItem('apex_inventory');
        return saved ? JSON.parse(saved) : initialVehicles;
    });

    useEffect(() => {
        localStorage.setItem('apex_inventory', JSON.stringify(vehicles));
    }, [vehicles]);

    const addVehicle = (vehicle) => {
        setVehicles(prev => {
            const newId = Math.max(...prev.map(v => v.id), 0) + 1;
            return [...prev, { ...vehicle, id: newId }];
        });
    };

    const updateVehicle = (id, updatedData) => {
        setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updatedData } : v));
    };

    const deleteVehicle = (id) => {
        setVehicles(prev => prev.filter(v => v.id !== id));
    };

    const value = {
        vehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
};
