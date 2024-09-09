import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from '../Featuries/User/userSlice';
import sidebarReducer from '../Featuries/Sidebar/sideBarSlice';
import productsReducer from '../Featuries/products/productSlice'
import basketReducer from '../Featuries/basketSlice/basketSlice.tsx'
import buttonVisibilityReducer from '../Featuries/ageSize/ageSize';


const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            sidebar: sidebarReducer,
            products:productsReducer,
            basket: basketReducer,
            simpleBasket:simpleBasket.Reducer,
            buttonVisibility: buttonVisibilityReducer,
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(
               
            )
        },
      
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);