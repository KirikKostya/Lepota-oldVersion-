import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialState } from './Interfaces'

const initialState:IInitialState = {
    isAuthorizate: Boolean(localStorage.getItem('accessToken')),
    isAdmine: false,
    isLoading: true,
    myAccountIsOpen: false,
    countOfOrders: 0,
    searchOrderById: 0,
    refreshTokenIsExpired: false,
    totalSumInConstuctor: 0,
    //admine:
    variantId: 1
}

const isAuthorizateSlice = createSlice({
    name: 'authorizate',
    initialState: initialState.isAuthorizate,
    reducers: {
        complatedAuth: (state)=>state = true,
        uncomplatedAuth: (state)=>state = false
    }
})

const isAdmineSlice = createSlice({
    name: 'isAdmine',
    initialState: initialState.isAdmine,
    reducers: {
        isAdmine: (state)=>state = true,
        isNotAdmine: (state)=>state = false
    }
})

const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: initialState.isLoading,
    reducers: {
        loadingComplate: (state)=>state = false,
        loadingUncomplate: (state)=>state = true
    }
})

const myAccountIsOpenSlice = createSlice({
    name: 'myAccountIsOpen',
    initialState: initialState.myAccountIsOpen,
    reducers: {
        openAccount: (state)=>state = true,
        closeAccount: (state)=>state = false
    }
})

const countOfOrdersSlice = createSlice({
    name: 'countOfOrders',
    initialState: initialState.countOfOrders,
    reducers: {
        setCountOfOrder: (state, action: PayloadAction<number>)=>state = action.payload,
    }
})

const searchOrderByIdSlice = createSlice({
    name: 'searchOrderById',
    initialState: initialState.searchOrderById,
    reducers: {
        changeSearchId: (state, action: PayloadAction<number>)=>state = action.payload,
    }
})

const refreshTokenIsExpiredSlice = createSlice({
    name: 'refreshTokenIsExpired',
    initialState: initialState.refreshTokenIsExpired,
    reducers: {
        changeRefreshTokenStatus: (state, action: PayloadAction<boolean>)=>state = action.payload,
    }
})

const totalSumInConstuctorSlice = createSlice({
    name: 'totalSumInConstuctor',
    initialState: initialState.totalSumInConstuctor,
    reducers: {
        setTotalSum: (state, action: PayloadAction<number>)=>state = action.payload,
        incrementTotalSum: (state, action: PayloadAction<number>)=>state + action.payload,
        decrementTotalSum: (state, action: PayloadAction<number>)=>state - action.payload,
    }
})

const variantIdSlice = createSlice({
    name: 'variantId',
    initialState: initialState.variantId,
    reducers: {
        setVariantId: (state, action: PayloadAction<number>)=>state = action.payload
    }
})


//export all actions:
export const { complatedAuth, uncomplatedAuth } = isAuthorizateSlice.actions;
export const { isAdmine, isNotAdmine } = isAdmineSlice.actions;
export const { loadingComplate, loadingUncomplate } = isLoadingSlice.actions;
export const { openAccount, closeAccount } = myAccountIsOpenSlice.actions;
export const { setCountOfOrder } = countOfOrdersSlice.actions;
export const { changeSearchId } = searchOrderByIdSlice.actions;
export const { changeRefreshTokenStatus } = refreshTokenIsExpiredSlice.actions;
export const { setTotalSum, incrementTotalSum, decrementTotalSum } = totalSumInConstuctorSlice.actions;
export const { setVariantId } = variantIdSlice.actions;

//export all redusers
export const isAuthorizateReduce = isAuthorizateSlice.reducer;
export const isAdmineReduce = isAdmineSlice.reducer;
export const isLoadingReduce = isLoadingSlice.reducer;
export const myAccountIsOpenReduce = myAccountIsOpenSlice.reducer;
export const countOfOrdersReduce = countOfOrdersSlice.reducer;
export const searchOrderByIdReduce = searchOrderByIdSlice.reducer;
export const refreshTokenIsExpiredReduce = refreshTokenIsExpiredSlice.reducer;
export const totalSumInConstuctorReduce = totalSumInConstuctorSlice.reducer;
export const variantIdReduce = variantIdSlice.reducer;