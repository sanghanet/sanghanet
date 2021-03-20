type FinanceAccountSchema = {
   0: {
      currency: string;
      userId: string | null;
      email: string;
      userName: string;
      transactions: {
         membership: Array<FinanceTransactionSchema>;
         rent: Array<FinanceTransactionSchema>;
         event: Array<FinanceTransactionSchema>;
         angel: Array<FinanceTransactionSchema>;
      };
   };
   balance: PocketBalanceSchema;
};
