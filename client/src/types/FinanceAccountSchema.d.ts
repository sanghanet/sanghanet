type FinanceAccountSchema = {
   currency: string;
   userId: string | null;
   email: string;
   userName: string;
   balance: PocketBalanceSchema;
   transactions: {
      membership: Array<FinanceTransactionSchema>;
      rent: Array<FinanceTransactionSchema>;
      event: Array<FinanceTransactionSchema>;
      angel: Array<FinanceTransactionSchema>;
   };
};
