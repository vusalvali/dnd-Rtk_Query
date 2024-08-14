import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import transactionReducer from "./transactionSlice/";
import { transactionsApi } from "./apis/transactionsApi";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(transactionsApi.middleware);
  },
});

setupListeners(store.dispatch);
