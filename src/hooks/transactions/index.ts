import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "@/services/transactions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const QUERY_KEY = 'qkTransaction'

const Create = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const ListAll = () => {
  return useQuery({ queryKey: [QUERY_KEY], queryFn: getTransactions})
}

const Delete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const Edit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}


export const useTransaction = {
    Create,
    ListAll,
    Delete,
    Edit
}

