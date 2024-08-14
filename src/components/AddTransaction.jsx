import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useAddTransactionMutation,
  useUpdateTransactionMutation,
} from "../store/apis/transactionsApi";

import {
  // updateTransaction,
  selectTransaction,
} from "../store/transactionSlice";

export const AddTransaction = () => {
  const [addTransaction, resultsAdd] = useAddTransactionMutation();
  const [updateTransaction, resultsUpdate] = useUpdateTransactionMutation();

  const selectedTransaction = useSelector(
    (state) => state.transaction.selectedTransaction
  );
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (selectedTransaction) {
      setText(selectedTransaction.text);
      setAmount(selectedTransaction.amount);
    }
  }, [selectedTransaction]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (selectedTransaction) {
      const updatedTransaction = {
        ...selectedTransaction,
        text,
        amount: +amount,
      };
      updateTransaction(updatedTransaction);
      dispatch(selectTransaction(null));
    } else {
      const newTransaction = {
        // id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
      };
      addTransaction(newTransaction);
    }

    // Reset form
    setText("");
    setAmount(0);
  };

  return (
    <>
      <h3>
        {selectedTransaction ? "Edit transaction" : "Add new transaction"}
      </h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">
          {selectedTransaction ? "Save changes" : "Add transaction"}
        </button>
      </form>
    </>
  );
};
