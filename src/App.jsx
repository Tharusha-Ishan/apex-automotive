import { Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { VehicleDetails } from './pages/VehicleDetails';
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { InventoryManager } from './pages/admin/InventoryManager';
import { VehicleEditor } from './pages/admin/VehicleEditor';

function App() {
  return (
    <InventoryProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:slug" element={<VehicleDetails />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<InventoryManager />} />
            <Route path="inventory/new" element={<VehicleEditor />} />
            <Route path="inventory/edit/:id" element={<VehicleEditor />} />
          </Route>
        </Routes>
      </Layout>
    </InventoryProvider>
  );
}

export default App;
