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
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const take = 10;

  const { data, isLoading } = useTransaction.ListAll(page * take, take);

  const { mutateAsync: addTransaction } = useTransaction.Create();
  const openModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  };

  const totalTransactions = useMemo(() => {
    if (!data) {
      return { totalIncome: 0, totalOutcome: 0, total: 0 };
    }
    return {
      totalIncome: data.totalIncome,
      totalOutcome: data.totalOutcome,
      total: data.totalBalance,
    };
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ToastContainer />
      <Header openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        {/* Passa só os items paginados */}
        <Table data={data?.items || []} />

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className={`
              flex items-center gap-1 rounded px-3 py-1 font-semibold transition 
              ${page === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            <ChevronLeft size={18} />
            Anterior
          </button>

          {/* Exibe página atual e total de páginas */}
          <span className="font-medium">
            Página {page + 1} de {Math.ceil((data?.totalCount ?? 0) / take)}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data || page + 1 >= Math.ceil(data.totalCount / take)}
            className={`
              flex items-center gap-1 rounded px-3 py-1 font-semibold transition
              ${!data || page + 1 >= Math.ceil((data?.totalCount ?? 0) / take)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            Próximo
            <ChevronRight size={18} />
          </button>
        </div>

        {isModalOpen && (
          <FormModal
            closeModal={handleCloseModal}
            formTitle="Adicionar Transação"
            addTransaction={handleAddModal}
          />
        )}
      </BodyContainer>
    </div>
  );
}
