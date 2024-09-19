import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";

// Sidebar context oluşturuldu
const SidebarContext = createContext();

// Sidebar bileşeni
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-md w-64 transition-width duration-300">
        <div className="p-6 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0 w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4 space-y-2">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t p-4 flex items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div
            className={`ml-4 transition-all duration-300 ${
              expanded ? "block" : "hidden"
            }`}
          >
            <h4 className="font-bold">John Doe</h4>
            <span className="text-sm text-gray-500">johndoe@gmail.com</span>
          </div>
          <MoreVertical className="ml-auto" size={24} />
        </div>
      </nav>
    </aside>
  );
}

// SidebarItem bileşeni
export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-3 px-4 rounded-md cursor-pointer transition-colors duration-200 ${
        active
          ? "bg-gradient-to-tr from-indigo-300 to-indigo-100 text-indigo-900"
          : "hover:bg-indigo-50 text-gray-700"
      }`}
    >
      {icon}
      <span
        className={`ml-4 text-base font-medium transition-opacity duration-300 ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div className="absolute right-4 w-3 h-3 rounded-full bg-red-500" />
      )}
    </li>
  );
}
