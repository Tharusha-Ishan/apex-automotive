import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, PlusCircle, LogOut } from 'lucide-react';

export const AdminLayout = () => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Car, label: 'Inventory', path: '/admin/inventory' },
        { icon: PlusCircle, label: 'Add Vehicle', path: '/admin/inventory/new' },
    ];

    return (
        <div className="flex h-screen bg-luxury-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold">Apex <span className="text-accent-gold">Admin</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${isActive ? 'bg-accent-gold text-black font-medium' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white transition-colors">
                        <LogOut size={20} />
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
