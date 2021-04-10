type FinanceTransactionSchema = {
   amount: number;
   description: string;
   currency: string;
   pocket: string;
   entryDate: Date;
   dueDate: Date;
   _id: string;
   paymentMethod: string;
   status: string; // calculated on the fly, during fetch
   deleted: DeletedTransactionSchema | null;
   by: string;
};
