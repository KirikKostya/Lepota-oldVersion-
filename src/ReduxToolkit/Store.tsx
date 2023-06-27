import { configureStore } from '@reduxjs/toolkit';
import {
    isAuthorizateReduce, isAdmineReduce, isLoadingReduce, 
    myAccountIsOpenReduce, countOfOrdersReduce, searchOrderByIdReduce,
    refreshTokenIsExpiredReduce, totalSumInConstuctorReduce, variantIdReduce
} from './Slices';

const store = configureStore({
    reducer: { 
        isAuthorizate: isAuthorizateReduce, 
        isAdmine: isAdmineReduce, 
        isLoading: isLoadingReduce, 
        myAccountIsOpen: myAccountIsOpenReduce, 
        countOfOrders: countOfOrdersReduce, 
        searchOrderById: searchOrderByIdReduce,
        refreshTokenIsExpired: refreshTokenIsExpiredReduce, 
        totalSumInConstuctor: totalSumInConstuctorReduce, 
        variantId: variantIdReduce
    }
})

export default store;