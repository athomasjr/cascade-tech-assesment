import { defineStore } from "pinia";

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    startingBalance: 400.0,
    statement: {
      Transactions: [
        {
          OriginalTraceAuditNo: null,
          AccountNumber: "123456789",
          TransactionTypeId: "Debit",
          TransactionDate: "2020-08-28T03:36:33",
          BusinessDate: "2020-08-28T03:36:33",
          AvailableBalance: 400.0,
          Amount: 12.08,
          Description: "Other: POS Transaction",
          Billed: false,
          MerchantName: "Good Buy",
          MerchantId: "GbLV-01",
        },
        {
          OriginalTraceAuditNo: null,
          AccountNumber: "123456789",
          TransactionTypeId: "Debit",
          TransactionDate: "2020-08-28T03:50:01",
          BusinessDate: "2020-08-28T03:50:01",
          AvailableBalance: 400.0,
          Amount: 129.74,
          Description: "Other: POS Transaction",
          Billed: false,
          MerchantName: "Wally World",
          MerchantId: "WWV-000-1220",
        },
        {
          OriginalTraceAuditNo: null,
          AccountNumber: "123456789",
          TransactionTypeId: "Debit",
          TransactionDate: "2020-08-28T06:43:12",
          BusinessDate: "2020-08-28T06:43:12",
          AvailableBalance: 400.0,
          Amount: 8.08,
          Description: "Other: POS Transaction",
          Billed: true,
          MerchantName: "Quickly Gas Stop",
          MerchantId: "QGS-01",
        },
      ],
      NotSettled: [
        {
          OriginalTraceAuditNo: null,
          AccountNumber: "123456789",
          TransactionTypeId: "Debit",
          TransactionDate: "2020-08-28T03:36:33",
          BusinessDate: "2020-08-28T03:36:33",
          AvailableBalance: 400.0,
          Amount: 12.08,
          Description: "Other: POS Transaction",
          MerchantName: "Good Buy",
          MerchantId: "GbLV-01",
        },
        {
          OriginalTraceAuditNo: null,
          AccountNumber: "123456789",
          TransactionTypeId: "Debit",
          TransactionDate: "2020-08-28T03:50:01",
          BusinessDate: "2020-08-28T03:50:01",
          AvailableBalance: 400.0,
          Amount: 129.74,
          Description: "Other: POS Transaction",
          MerchantName: "Wally World",
          MerchantId: "WWV-000-1220",
        },
      ],
    },
  }),
  getters: {
    getBalance: (state) =>
      state.startingBalance -
      state.statement.Transactions.reduce((acc, curr) => acc + curr.Amount, 0),
  },
});
