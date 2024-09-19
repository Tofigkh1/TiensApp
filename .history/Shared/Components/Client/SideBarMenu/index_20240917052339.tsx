import { ChevronFirst, MoreVertical } from "lucide-react";
import { Children, useState } from "react";





export default function Sidebar({children}) {

    const [expanded, setExpanded] = useState(true)

    return(
        <aside className=" h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />

          <button onClick={()=> setExpanded()} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst/>

          </button>

          <ul className="flex-1 px-3">
            {Children}
          </ul>

          <div className=" border-t flex p-3">
            <img
               src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
               alt=""
               className="w-10 h-10 rounded-md"
            />

            <div className={`flex justify-between items-center w-52 ml-3`}>
                <div className="leading-4">
                    <h4 className="font-semibold">john doe</h4>
                    <span className="text-xs text-gray-60"></span>
                </div>
                <MoreVertical size={20}/>
            </div>
          </div>

                </div>

            </nav>

        </aside>
    )
}


export function SidebarItem ({icon, text, active, alert}) {

    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        active?"bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800":
        "hover:bg-indigo-50 text-gray-600"
        }
        `}
        >
            {icon}
            <span className="w-52 ml-3">{text}</span>
            {alert && <div className={` absolute right-2 w-2 h-2 rounded bg-indigo-400 `}/>}
        </li>
    )
}