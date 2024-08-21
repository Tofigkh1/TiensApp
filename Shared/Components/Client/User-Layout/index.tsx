import Image from "next/image";
import React from "react";
import { UseSelector, useDispatch } from "react-redux";
import userProfileIcon from '../../../../public/userProfileIcon.svg'
import basket from '../../../../public/basketicon.png'
import logoutSvg from '../../../../public/logout (1).png'
import checkoutSvg from '../../../../public/checkout.png'
import basketDef from '../../../../public/basketDef.png'
import profileSettings from '../../../../public/profileSettings.png'
import orderSvg from '../../../../public/order.png'
import userProfileDef from '../../../../public/user.png'
import styles from './userLayout.module.css';
import { useRouter } from "next/router";
import { clearUser } from "../../../Redux/Featuries/User/userSlice";
import { AppDispatch } from "../../../Redux/Store/store";


interface PROPS{
    active:number
}

function Navbar(props:PROPS) {
    const {push, pathname} = useRouter();

    const dispatch: AppDispatch = useDispatch();

    let {active} = props

    return (
        <div className={styles.navbar}>
            
           
            
              <div
             className={ active===1? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
             onClick={()=>push('/user/profile')}
             >
                <Image
                src={ active===1? userProfileIcon:profileSettings}
                alt='Activeprofileicon'
                width={24}
                height={24}
                />
                <h3 className={ active===1? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Profile</h3>

            </div>

            <div className={active ===2? styles.icondiv + ' ' + styles.activediv: styles.icondiv}
            onClick={()=>push('/user/basket')}
            >
                  <Image
                src={active===2?basket:basketDef}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===2? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Basket</h3>
            </div>

            <div 
            className={active===3? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>push('/user/orders')}
            >
                <Image
                src={active===3?basket:orderSvg}
                alt='defBasketIcon'
                width={30}
                height={30}
                />
                <h3 className={active===3? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Orders </h3>

            </div>

           

            <div
             className={active===4? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
             onClick={()=>push('/user/checkout')}
             >
                <Image
                src={active===4?userProfileIcon:checkoutSvg}
                alt='defBasketIcon'
                width={30}
                height={30}
                />
                <h3 className={active===4? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Checkout</h3>

            </div>

            <div 
            className={active===5? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>{
                push('/')
                localStorage.removeItem("user_info")
                localStorage.removeItem("access_token")
                dispatch(clearUser());
            }}
            >
                <Image
                src={active===5?userProfileIcon:logoutSvg}
                alt='defBasketIcon'
                width={30}
                height={30}
                />
                <h3 className={active===5? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Logout</h3>

            </div>

            <div className={styles.horizontalLine2}></div>


            <div
             className={ active===7? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
             onClick={()=>push('/user/profile')}
             >
                <Image
                src={ active===1? userProfileIcon:userProfileDef}
                alt='Activeprofileicon'
                width={24}
                height={24}
                />
                <h3 className={ active===7? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Profile</h3>

            </div>

            <div className={active ===2? styles.icondiv + ' ' + styles.activediv: styles.icondiv}
            onClick={()=>push('/user/basket')}
            >
                  <Image
                src={active===2?userProfileIcon:userProfileDef}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===2? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Basket</h3>
            </div>

            <div 
            className={active===3? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>push('/user/orders')}
            >
                <Image
                src={active===3?basket:basketDef}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===3? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Orders </h3>

            </div>

            <div
             className={active===4? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
             onClick={()=>push('/user/checkout')}
             >
                <Image
                src={active===4?userProfileIcon:basketDef}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===4? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Checkout</h3>

            </div>
           
            <div 
            className={active===5? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>{
                push('/')
                localStorage.removeItem("user_info")
                localStorage.removeItem("access_token")
                dispatch(clearUser());
            }}
            >
                <Image
                src={active===5?userProfileIcon:basketDef}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===5? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Logout</h3>

            </div>
            


            <div className={styles.verticalLine}></div>
            

            <div className=" mt-28"></div>
        </div>

        
    )
}


export default Navbar