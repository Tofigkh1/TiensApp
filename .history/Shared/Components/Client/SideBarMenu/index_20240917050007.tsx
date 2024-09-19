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

          <div className=" border-t flex p-3">
            <img
               src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
               alt=""
               className="w-10 h-10 rounded-md"
            />

            <div className={`flex justify-between items-center w-52 ml-3`}>
                <div>
                    <h4 className="font-semibold">john doe</h4>
                </div>
            </div>
          </div>

                </div>

            </nav>

        </aside>
    )
}