# Technical Assessment

---

## Candidate Information

Antonio Thomas

- Portfolio: [athomasjr.com](https://www.athomasjr.com)
- Freelance: [antoniothomasjr.com](https://antoniothomasjr.com/)
- Twitter: [@athomas_jr](https://twitter.com/athomas_jr)
- Github: [@athomasjr](https://github.com/athomasjr)
- LinkedIn: [@athomas-jr](https://linkedin.com/in/athomas-jr)

## Tech Used

- Vue
- Typescript
- TailwindCSS

## Project Solution

---

### State

I started the project by defining a [Pinia](https://pinia.vuejs.org/) store; per the documentation, Pinia is the standard, and it "could simply consider Pinia as Vuex 5 with a different name."

I used the provided transaction data from the instructions. I knew that I would need a starting balance based on the instructions. Although one wasn't directly provided, I used the data's AvailableBalance as my starting point.

```typescript
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
});
```

I also added a getter, "getBalance" to return my starting balance minus the transactions in the data. I based the getter logic on the information provided. For example, If this were an actual billing/transaction feed, I would also account for incoming deposits.

```typescript
import { defineStore } from "pinia";

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
   ...
  getters: {
    getBalance: (state) =>
      state.startingBalance -
      state.statement.Transactions.reduce((acc, curr) => acc + curr.Amount, 0),
  },
});
```

### Component

I created a TransactionFeed component using Composition API and imported my useTransactionStore.

```vue
<script setup lang="ts">
import { useTransactionStore } from "@/stores/transaction";
const transactionStore = useTransactionStore();
</script>

<template></template>
```

I started with my balance, the starting, and ending.

```vue
<template>
  <div class="flex flex-col gap-10">
    <h1 class="text-2xl">Balance</h1>
    <div class="flex gap-20">
      <div class="flex flex-col gap-2">
        <p class="text-xl font-medium">Starting</p>
        <p class="text-xl font-medium">
          &dollar;{{ transactionStore.startingBalance.toFixed(2) }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-xl font-medium">Ending</p>
        <p class="text-xl font-medium">
          &dollar;{{ transactionStore.getBalance.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>
```

I started with my balance, the starting, and ending. I used my store to access the startingBalance and getBalance using toFixed() to two decimal places.

Next, I used a v-for to loop through the transactions and return the information. We need access to the MerchantName, and underneath I placed the reformated date.

When working with the transaction amount and status, I wanted to display the status:

1. First I used a minus symbol to show that the amount was a deduction. I would have used a v-if rather than hard coding the minus if I had income information to display plus or minus.

2. I assumed the transaction was pending if the transaction was unsettled and the billed property was false. I used that information to add v-bind to class for the text to be green if settled and a blue if pending. Also, I set a text under to display "paid" or "pending" based on the status.

```vue
<template>
  <div class="flex flex-col gap-4">
    <p class="font-medium text-xl text-green-700">Latest Transactions</p>
    <ul class="flex flex-col gap-6">
      <li
        v-for="transaction in transactionStore.statement.Transactions"
        :key="transaction.TransactionDate"
        class="flex relative justify-between after:content-[''] after:absolute after:-bottom-2 after:h-0.5 after:w-full after:bg-slate-400"
      >
        <div class="flex flex-col gap-1">
          <p>{{ transaction.MerchantName }}</p>
          <time class="text-gray-600">
            {{
              new Date(transaction.TransactionDate).toLocaleDateString(
                "en-us",
                { day: "numeric", month: "short", year: "numeric" }
              )
            }}
          </time>
        </div>

        <div class="flex flex-col gap-1">
          <p
            :class="{ 'text-red-600': transaction.Billed }"
            class="font-medium"
          >
            <span>&minus;</span> &dollar;{{ transaction.Amount }}
          </p>
          <p
            :class="{
              'text-green-700': transaction.Billed,
              'text-blue-600': !transaction.Billed,
            }"
          >
            {{ transaction.Billed ? "Paid" : "Pending" }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
```
