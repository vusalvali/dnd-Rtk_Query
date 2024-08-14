import PropTypes from "prop-types";
import { selectTransaction } from "../store/transactionSlice";
import { useDispatch } from "react-redux";
import { useDeleteTransactionMutation } from "../store/apis/transactionsApi";

// Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$ " +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const Transaction = ({ transaction }) => {
  const [removeTransaction, removeTransactionResults] =
    useDeleteTransactionMutation();
  const dispatch = useDispatch();

  if (!transaction) {
    console.error("Transaction prop is undefined");
    return null;
  }

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      className={transaction.amount < 0 ? "minus" : "plus"}
      onClick={() => dispatch(selectTransaction(transaction))}
    >
      {transaction.text}{" "}
      <span>
        {sign}
        {moneyFormatter(transaction.amount)}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling up
          removeTransaction(transaction.id);
          dispatch(selectTransaction(null));
        }}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};
