interface HandleTransaction {
   (
      description: string,
      amount: string,
      pocketName: string,
      transactionType: string,
      dueDate: Date | null
   ): void;
}
