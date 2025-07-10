import { ITransaction } from "@/types/transaction";
import { api } from "../api"
import { toast } from "react-toastify";
export async function getTransactions() {
    try {
      const response = await api.get('/transaction') 
      return response.data; 
    } catch (error) {
        throw new Error("Erro ao buscar transações: " + error);
    }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post('/transaction', transaction);
        toast.success("Transação adicionada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar transação: " + error);
    }
}

export async function deleteTransaction(id: string) {
    try {
        const response = await api.delete(`/transaction/${id}`);
        toast.success("Item excluído com sucesso!")
        return response.data;
        
    } catch (error) {
        throw new Error("Erro ao excluir o item: " + error);

    }
}


export async function editTransaction(transaction: ITransaction) {
    console.log('transcation', transaction)
    try {
        const response = await api.patch(`/transaction/${transaction.id}`, {title: transaction.title, category: transaction.category, data: transaction.data, price: transaction.price, type: transaction.type });
        toast.success("Item editado com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao editar o item: " + error);
    }
}