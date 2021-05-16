type FinanceAccount = {
   currency: string;
   userId: string | null;
   email: string;
   userName: string;
   transactions: Transactions;
   balance: PocketBalance;
};
