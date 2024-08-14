import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "counter",
  initialState: {
    transactions: [],
    selectedTransaction: null,
  },
  reducers: {
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    addTransaction: (state, action) => {
      state.transactions = [action.payload, ...state.transactions];
    },
    updateTransaction: (state, action) => {
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction
      );
    },
    reorderTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    selectTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  deleteTransaction,
  addTransaction,
  updateTransaction,
  reorderTransactions,
  selectTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
