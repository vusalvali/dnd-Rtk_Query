import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    fetchTransactions: builder.query({
      providesTags: ["transaction"],
      query: () => ({
        url: "/transactions",
        method: "GET",
        // params: transactions? { filter: transactions } : {},
      }),
    }),
    addTransaction: builder.mutation({
      invalidatesTags: ["transaction"],
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...transaction }) => ({
        url: `/transactions/${id}`,
        method: "PUT", // Or PATCH, depending on your API
        body: transaction,
      }),
      invalidatesTags: ["transaction"],
    }),
    reorderTransactions: builder.mutation({
      query: (reorderedTransactions) => ({
        url: "/transactions/reorder",
        method: "POST",
        body: reorderedTransactions,
      }),
      // Assuming the backend returns the updated order
      onQueryStarted: async (reorderedTransactions, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(transactionsApi.util.updateQueryData('fetchTransactions', undefined, (draft) => {
            return reorderedTransactions;
          }));
        } catch (err) {
          console.error('Reordering failed:', err);
        }
      },
    }),
  }),
});

export const {
  useFetchTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useReorderTransactionsMutation,
} = transactionsApi;
export { transactionsApi };
