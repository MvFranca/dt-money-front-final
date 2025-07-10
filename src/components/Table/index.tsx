import { useState } from "react";
import { Trash, Pencil } from "lucide-react";
import { useTransaction } from "@/hooks/transactions";
import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";
import { ConfirmModal } from "@/components/ConfirmModal";
import { FormModal } from "@/components/FormModal";

export interface ITableProps {
  data: ITransaction[];
}

export function Table({ data }: ITableProps) {
  const { mutateAsync: deleteTransaction } = useTransaction.Delete();
  const { mutateAsync: editTransaction } = useTransaction.Edit();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      await deleteTransaction(selectedId);
      closeDeleteModal();
    }
  };

  const openEditModal = (transaction: ITransaction) => {
    console.log("transaction", transaction);
    setSelectedTransaction(transaction);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setSelectedTransaction(null);
    setIsFormModalOpen(false);
  };

  return (
    <>
      <table className="w-full mt-16 border-0 border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Título
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Preço
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Categoria
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Data
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id} className="bg-white h-16 rounded-lg">
              <td className="px-4 py-4 whitespace-nowrap text-title">
                {transaction.title}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap text-right ${
                  transaction.type === "INCOME" ? "text-income" : "text-outcome"
                }`}
              >
                {formatCurrency(transaction.price)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                {transaction.category}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                {transaction.data ? formatDate(new Date(transaction.data)) : ""}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                <div className="flex items-center gap-2 h-full">
                  <button
                    onClick={() => openEditModal(transaction)}
                    className="hover:text-blue-600 transition-colors"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(transaction.id!)}
                    className="hover:text-red-600 transition-colors"
                    title="Excluir"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Excluir transação"
        description="Tem certeza que deseja excluir esta transação? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
      />

      {isFormModalOpen && selectedTransaction && (
        <FormModal
          formTitle="Editar transação"
          closeModal={closeFormModal}
          addTransaction={(data) =>
            editTransaction({ ...selectedTransaction, ...data })
          }
          transaction={selectedTransaction}
        />
      )}
    </>
  );
}
