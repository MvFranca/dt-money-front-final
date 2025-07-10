"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transactions";
import { ITotal, ITransaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: transactions , isLoading } = useTransaction.ListAll();
  const { mutateAsync: addTransaction } = useTransaction.Create();
  const openModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  }

  const totalTransactions: ITotal = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalIncome: 0, totalOutcome: 0, total: 0 };
    }
  
    return transactions.reduce(
      (acc: ITotal, { type, price }: ITransaction) => {
        if (type === 'INCOME') {
          acc.totalIncome += price;
          acc.total += price;
        } else if (type === 'OUTCOME') {
          acc.totalOutcome += price;
          acc.total -= price;
        }
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0, total: 0 }
    );
  }, [transactions]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ToastContainer />
      <Header openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        <Table data={transactions} />
        { isModalOpen && <FormModal closeModal={handleCloseModal} formTitle="Adicionar Transação" addTransaction={handleAddModal} /> }
      </BodyContainer>
    </div>
  );
}
