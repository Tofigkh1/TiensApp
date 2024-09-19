import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react'
import { useContext, createContext, useState } from 'react'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
const [expanded, setExpanded] = useState(true)

return (



<img
src='https://img.logoipsum.com/243.svg'
className={overflow-hidden transition-all ${ expanded ? 'w-32 opacity-90' : 'w-0' }}
alt=''
/>
<button
onClick={() => setExpanded((curr) => !curr)}
className='rounded-lg bg-gray-50 hover:bg-gray-100'
>
{expanded ? : }

    <SidebarContext.Provider value={{ expanded }}>
      <div>
        <ul
          className={` rounded-lg transition-all ${
            expanded ? 'bg-[#333333] opacity-90' : 'w-[40px]'
          }`}
        >
          {children}
        </ul>
      </div>
    </SidebarContext.Provider>

    <div className='flex p-3 bg-[#FFE328] rounded-lg'>
      <img
        src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
        alt=''
        className='w-10 h-10 rounded-md'
      />
      <div
        className={`
          flex justify-between items-center
          overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
      `}
      >
        <div className='leading-4'>
          <h4 className='font-semibold'>John Doe</h4>
          <span className='text-xs text-gray-600'>johndoe@gmail.com</span>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  </nav>
</aside>
)
}

export function SidebarItem({ icon, text, active, alert }) {
const { expanded } = useContext(SidebarContext)

return (
<li
className={relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${ active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600' }}
>
{icon}
<span
className={overflow-hidden transition-all ${ expanded ? 'w-52 ml-3' : 'w-0' }}
>
{text}

{alert && (
<div
className={absolute right-2 w-2 h-2 rounded bg-indigo-400 ${ expanded ? '' : 'top-2' }}
/>
)}

  {!expanded && (
    <div
      className={`
      absolute left-full rounded-md px-2 py-1 ml-6
      bg-indigo-100 text-indigo-800 text-sm
      invisible opacity-20 -translate-x-3 transition-all
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
  `}
    >
      {text}
    </div>
  )}
</li>
)
}

`