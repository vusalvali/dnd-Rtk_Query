import { useRef } from "react";
import { Transaction } from "./Transaction";
import { useDispatch } from "react-redux";

// import { reorderTransactions } from "../store/transactionSlice";

import {
  useFetchTransactionsQuery,
  useReorderTransactionsMutation,
} from "../store/apis/transactionsApi";

export const TransactionList = () => {
  // const transactions = useSelector((state) => state.transaction.transactions);
  const [reorderTransactions, results] = useReorderTransactionsMutation();
  const {
    data: transactionsData,
    isLoading,
    isError,
  } = useFetchTransactionsQuery();
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dispatch = useDispatch();

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...transactionsData];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // Clear refs
    dragItem.current = null;
    dragOverItem.current = null;
    // Send the reordered array to the server
    // dispatch(reorderTransactions(copyListItems));
    reorderTransactions(copyListItems);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching transactions.</p>;

  if (!transactionsData || transactionsData.length === 0) {
    return <p>No transactions available.</p>;
  }

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactionsData.map((transaction, index) => (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={transaction.id}
            draggable
          >
            <Transaction
              // key={transaction.id}
              transaction={{ ...transaction, id: +transaction.id }}
            />
          </div>
        ))}
      </ul>
    </>
  );
};
