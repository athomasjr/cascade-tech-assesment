<script setup lang="ts">
import { useTransactionStore } from "@/stores/transaction";
const transactionStore = useTransactionStore();
</script>

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
  </div>
</template>
