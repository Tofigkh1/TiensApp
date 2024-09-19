import { ChevronFirst } from "lucide-react";
import { Children } from "react";





export default function Sidebar({}) {

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

          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst/>

          </button>

          <ul className="flex-1 px-3">
            {Children}
          </ul>

          <div className=" flex-1">

          </div>

                </div>

            </nav>

        </aside>
    )
}