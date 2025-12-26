'use client';
import React from 'react';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

// Sidebar Context
const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);

    const value: SidebarContextType = {
    isOpen,
    toggle: () => setIsOpen(prev => !prev),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};


const useSidebar = (): SidebarContextType => {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
};


const Sidebars: React.FC = () => {
    const { isOpen } = useSidebar();
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    const categories: string[] = [
        'ชากาแฟอื่น',
        'ชากาแฟเย็น',
        'ชากาแฟร้อน',
        'ของหวานคุกกี้',
        'ของหวานอื่นๆ'
    ];

    const toggleCategory = (category: string): void => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <aside
            className={`bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'
                } overflow-hidden`}
        >
            <div className="p-6">
                <button className="w-full bg-purple-100 text-purple-900 px-4 py-3 rounded-lg font-medium mb-6 hover:bg-purple-200 transition-colors">
                    สินค้าทั้งหมด
                </button>

                <div className="space-y-1">
                    {categories.map((category: string) => (
                        <label key={category} className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-2 rounded">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};


export { SidebarProvider, Sidebars, useSidebar };