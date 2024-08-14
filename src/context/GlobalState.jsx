// import { createContext, useReducer, useState } from "react";
// import AppReducer from "./AppReducer";
// import PropTypes from 'prop-types';

// const initialState = {
//   transactions: [
//     // your initial transactions
//   ],
//   selectedTransaction: null,
// };

// export const GlobalContext = createContext(initialState);

// export const GlobalProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AppReducer, initialState);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   function deleteTransaction(id) {
//     dispatch({
//       type: "DELETE_TRANSACTION",
//       payload: id,
//     });
//   }

//   function addTransaction(transaction) {
//     dispatch({
//       type: "ADD_TRANSACTION",
//       payload: transaction,
//     });
//   }

//   function updateTransaction(updatedTransaction) {
//     dispatch({
//       type: "UPDATE_TRANSACTION",
//       payload: updatedTransaction,
//     });
//   }

//   function selectTransaction(transaction) {
//     setSelectedTransaction(transaction);
//   }

//   // Action to reorder transactions
//   const reorderTransactions = (transactions) => {
//     dispatch({
//       type: "REORDER_TRANSACTIONS",
//       payload: transactions,
//     });
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         transactions: state.transactions,
//         setSelectedTransaction,
//         selectedTransaction,
//         deleteTransaction,
//         addTransaction,
//         updateTransaction,
//         selectTransaction,
//         reorderTransactions,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// GlobalProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };