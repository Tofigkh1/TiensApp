




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

          <button>
            
          </button>

                </div>

            </nav>

        </aside>
    )
}