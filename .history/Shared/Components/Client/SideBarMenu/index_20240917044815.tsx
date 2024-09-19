import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Iconlar
import userProfileIcon from '../../../../public/userProfileIcon.svg'
import shoppingBag from '../../../../public/shopping-bag.png'
import YourOrders from '../../../../public/fulfillment.png'
import ShoppingCheck from '../../../../public/ShoppingCheck3.png'
import LogoutIcon2 from '../../../../public/exit.png'

// Sidebar context oluşturuldu
const SidebarContext = createContext(null);

// Sidebar bileşeni
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { push } = useRouter();

  return (
    <aside className="h-screen ">
      <nav
        className="h-full flex flex-col bg-white border-r shadow-sm"
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-width duration-300 ${
              expanded ? "w-32" : "w-0 hidden"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* SidebarContext.Provider ile expanded değerini sağlıyoruz */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem
              icon={
                <Image src={userProfileIcon} alt="profile" width={24} height={24} />
              }
              text="Your Profile"
              onClick={() => push('/user/profile')}
              active={false}
            />
            <SidebarItem
              icon={
                <Image src={shoppingBag} alt="basket" width={24} height={24} />
              }
              text="Your Basket"
              onClick={() => push('/user/basket')}
              active={false}
            />
            <SidebarItem
              icon={
                <Image src={YourOrders} alt="orders" width={24} height={24} />
              }
              text="Your Orders"
              onClick={() => push('/user/orders')}
              active={false}
            />
            <SidebarItem
              icon={
                <Image src={ShoppingCheck} alt="checkout" width={24} height={24} />
              }
              text="Checkout"
              onClick={() => push('/user/checkout')}
              active={false}
            />
            <SidebarItem
              icon={
                <Image src={LogoutIcon2} alt="logout" width={24} height={24} />
              }
              text="Logout"
              onClick={() => {
                push('/');
                localStorage.removeItem("user_info");
                localStorage.removeItem("access_token");
              }}
              active={false}
            />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

// SidebarItem bileşeni
function SidebarItem({ icon, text, onClick, active,alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
           relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : ""
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
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
  );
}
