import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";

// Define SidebarContext type
type SidebarContextType = {
  expanded: boolean;
};

// Create a context for managing the sidebar state
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Sidebar component
export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true); // State to track whether sidebar is expanded or not

  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col bg-white border-r shadow-sm transition-all ${
          expanded ? "w-[32%]" : "w-[60px]" // Sidebar expands to 32% width or collapses to 60px
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* Logo with dynamic width */}
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0" // Logo is hidden when sidebar is collapsed
            }`}
            alt=""
          />

          {/* Toggle button for sidebar */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-FooterColor hover:bg-mainRed"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />} {/* Chevron icon changes based on expansion state */}
          </button>
        </div>

        {/* Sidebar context provider to manage state across sidebar items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul> {/* Sidebar items will be rendered here */}
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

// SidebarItem component for individual items inside the sidebar
type SidebarItemProps = {
  icon: ReactNode;  // Icon to display in the sidebar item
  text: string;     // Text to display in the sidebar item
  active: boolean;  // Boolean to determine if the item is active (highlighted)
  alert?: boolean;  // Optional boolean to display an alert indicator
};

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext); // Sidebar context'i kullan
  const { expanded } = context!;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-custompurple text-mainRedLight" // Aktif öğe stili
          : "hover:bg-textColorGreen text-gray-600" // Aktif olmayan öğe hover stili
      }`}
    >
      {icon} {/* İkonu göster */}

      {/* Hover durumunda görünür olacak metin için yeni düzenleme */}
      <span
        className={`overflow-hidden transition-all duration-200 ml-3 opacity-100 ${
          expanded ? "w-auto" : "w-0 group-hover:w-auto group-hover:ml-3" // Hover durumunda genişliği aç
        }`}
      >
        {text} {/* İsimleri göster */}
      </span>

      {/* Uyarı simgesi */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
}

