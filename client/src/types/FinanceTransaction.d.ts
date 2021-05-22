type FinanceTransaction = {
   amount: number;
   description: string;
   currency: string;
   pocket: string;
   entryDate: string;
   dueDate: string;
   _id: string;
   status: string; // calculated on the fly, during fetch
   deleted: DeletedTransaction | null;
   by: string;
};
