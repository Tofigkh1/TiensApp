import {
    addToBasket,
    deleteAllBasket,
    deleteFromBasket,
    fetchBasket
} from "../../../Redux/Featuries/basketSlice/basketSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../Redux/Store/store";
import Image from "next/image";
import styles from "../../sliderBasket/Slider.module.css";
import plus from '../../../public/plus (3).png';
import minus from '../../../public/minus-circle.png';
import trash from '../../../public/trash-bin.png';




export default function productCountPage {


    const basket = useSelector((state: RootState) => state.basket);
    const user = useSelector((state: RootState) => state.user);
    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
    const basketCount = basket?.data?.total_count;
    const basketAmount = basket?.data?.total_amount;
    const basketItems = basket?.data?.items || [];

    const basketId = basket?.data?.id;

    const handleAddFromBasket = (productId: string) => {

        const basketProduct = {
            user_id: user?.id,
            product_id: productId,
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
        };


        dispatch(addToBasket(basketProduct)).then((action) => {
            if (action.type === deleteFromBasket.rejected.type) {
                toast({
                    title: "Failed to remove product from the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Product added to the basket successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };

    const handleDeleteFromBasket = (productId: string) => {

        const basketProduct = {
            user_id: user?.id,
            product_id: productId,
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
        };

        dispatch(deleteFromBasket(basketProduct)).then((action) => {
            if (action.type === deleteFromBasket.rejected.type) {
                toast({
                    title: "Failed to remove product from the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Product removed from the basket successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };



    const handleDeleteAllBasket = (basketId: string) => {
        const basketAll = {
            user_id: user?.id,
            basket_id: basketId,
        };

        dispatch(deleteAllBasket(basketAll)).then((action) => {
            if (action.type === deleteAllBasket.rejected.type) {
                toast({
                    title: "Failed to clear the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Basket cleared successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                });
                const startTimeKey = `basketTimerStartTime_${basketId}`;
                localStorage.removeItem(startTimeKey);
            }
        });
    };


    return (
        <>


            {basketItems.map((items, index) => (
                <div key={index} className='flex flex-col justify-around'>
                    <div className='flex justify-around mt-10'>
                        <div className=" w-36 h-auto rounded-2xl   bg-white flex">
                            <div>
                                <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                            </div>
                        </div>
                        <h1 className=' font-bold text-xl mr-20 text-black'>{items.name}</h1>



                        <div className=' flex flex-col'>

                            <div>
                                <h1 className='text-black'>{items.count}</h1>
                            </div>

                            <div className=' mt-5'>
                                <button key={index} onClick={() => handleDeleteFromBasket(items.id)} className="bg-red-500 p-2 rounded-full">
                                    <Image src={minus} alt="Delete product" width={35} height={35} />
                                </button>
                            </div>

                            <div className=' mt-5'>
                                <button key={index} onClick={() => handleAddFromBasket(items.id)} className="bg-red-500 p-2 rounded-full">
                                    <Image src={plus} alt="Delete product" width={35} height={35} />
                                </button>
                            </div>

                        </div>

                        <div className=' right-0 bg-clientButtonGreen rounded-xl w-24 h-auto text-center text-black'>



                            <div className='ml-3 flex gap-2 mt-7 font-semibold text-xl text-center'>
                                <h1>{items.amount}</h1>
                                <h1>₼</h1>
                            </div>
                        </div>



                    </div>
                    <hr className={styles.line} />
                </div>
            ))}



            {basketId && (

                <div>
                    <button  className=' flex gap-5' onClick={() => handleDeleteAllBasket(basketId)}>
                        <Image width={30} height={30} src={trash}/>
                        Clear Cart
                    </button>
                </div>

            )}
        </>

    )


}


