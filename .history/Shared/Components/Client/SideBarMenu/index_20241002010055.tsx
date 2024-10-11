import React, { useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { ChevronFirst, ChevronLast } from "lucide-react";

// SidebarContext type definition
type SidebarContextType = {
  expanded: boolean;
};

// Create a context to manage the sidebar state
const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false); // Track whether sidebar is expanded

  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col bg-white border-r border-whiteLight3 transition-all ml-3 ${
          expanded ? "w-[140%] h-[130%]" : "w-[95px]"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* Dynamic logo */}
          <h1
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 text-2xl font-semibold" : "w-0"
            }`}
          >
            Menu
          </h1>

          {/* Toggle button */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="pl-3.5 rounded-lg bg-textColorGreen hover:bg-clientButtonGreen mr-2 w-14 h-11 mt-14"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Provide sidebar state context */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

// SidebarItem component
type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  path: string; // Add path prop for navigation
  onClick?: () => void;
};

export function SidebarItem({ icon, text, path, onClick }: SidebarItemProps) {
  const { pathname, push } = useRouter(); // Get current route
  const context = useContext(SidebarContext); // Access sidebar context
  const { expanded } = context!;

  // Check if the current route matches the path
  const isActive = pathname === path;

  return (
    <li
      onClick={() => push(path)} // Handle navigation
      className={`group relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors mt-8 ${
        isActive ? "bg-textColorGreen text-mainRedLight" : "hover:bg-textColorGreen text-gray-600"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {expanded && <span className="ml-4 text-xl text-black transition-all duration-200">{text}</span>}
      {!expanded && (
        <span className="absolute left-full whitespace-nowrap bg-textColorGreen text-black rounded-md py-1 px-2 transition-all duration-200 ml-2 opacity-0 group-hover:opacity-100">
          {text}
        </span>
      )}
    </li>
  );
}