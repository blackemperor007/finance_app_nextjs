"use client"
import { deleteBudget, deleteTransaction, getTransactionsByBudgetId } from '@/app/actions'
import BudgetItems from '@/app/components/BudgetItems'
import Wrapper from '@/app/components/Wrapper'
import { Budget} from '@/type'
import React, { useEffect, useState } from 'react'
import Notification from '@/app/components/Notification'
import { SendIcon, TrashIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

const Page = ({ params }: { params: Promise<{ budgetId: string }> }) => {

  const [budgetId, setBudgetId] = useState<string>('')
  const [budget, setBudget] = useState<Budget>()
  const [description, setDescription] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const [notification, setNotification] = useState<string>("")
  const closeNotification = () => (
    setNotification("")
  )

  async function fetchBudgetData(budgetId: string) {
    try {
      if (budgetId) {
        const budgetData = await getTransactionsByBudgetId(budgetId)
        setBudget(budgetData)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données du budget", error)
      throw error
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params
      setBudgetId(resolvedParams.budgetId)
      fetchBudgetData(resolvedParams.budgetId)
    }
    getId()
  }, [params])

  const handleAddTransaction = async () => {
    if (!amount || !description) {
      setNotification("Veuillez remplir tous les champs")
      return
    }

    try {
      const amountNumber = parseFloat(amount)
      if (isNaN(amountNumber) || amountNumber <= 0) {
        throw new Error("Le montant doit être un nombre valide et supérieur à 0")
      }

      // const newTransaction = await addTransactionBudget(budgetId, amountNumber, description)
      setNotification("Transaction ajoutée avec succès")
      fetchBudgetData(budgetId)
      setDescription('')
      setAmount('')

    } catch (error) {
      setNotification("Vous avez dépassé votre budget")
    }
  }

  const handleDeleteBudget = async () => {
    const confirmed = window.confirm("Etes-vous sûr de vouloir supprimer ce budget et toutes ses transactions associées ?")

    if (confirmed) {
      try {
      await deleteBudget(budgetId)
      } catch (error) {
        console.error("Erreue lors de la suppression du budget : ", error);
        throw error
        
      }
      redirect("/budgets")
    }
  }

  const handleDeleteTransaction = async (transactionId : string) => {
    const confirmed = window.confirm("Etes-vous sûr de vouloir supprimer cette transaction ?")

    if (confirmed) {
      try {
      await deleteTransaction(transactionId)
      fetchBudgetData(budgetId)
      setNotification("Dépense supprimée")
      } catch (error) {
        console.error("Erreue lors de la suppression du budget : ", error);
        throw error
        
      }
      redirect("/budgets")
    }
  }
  return (
    <Wrapper>
      {notification && (
        <Notification message={notification} onclose={closeNotification}></Notification>
      )}
      {budget && (
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/3">
            <BudgetItems budget={budget}></BudgetItems>
            <button 
            onClick={() => handleDeleteBudget()}
            className='btn mt-4'
            >
              Supprimer le budget</button>
            <div className="space-y-4 flex flex-col mt-4">
              <input
                type="text"
                id="description"
                placeholder='Description'
                className='input input-bordered w-full'
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <input
                type="number"
                id="amount"
                placeholder='Montant'
                className='input input-bordered w-full'
                required
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />

              <button className='btn btn-primary' onClick={handleAddTransaction}>
                Ajouter
              </button>
            </div>
          </div>
          {budget?.transactions && budget.transactions.length > 0 ? (
            <div className="overflow-x-auto md:mt-0 md:w-2/3 ml-4">
              <table className="table">
                {/* head */}
                <thead className='font-bold'>
                  <tr>
                    <th></th>
                    <th>Montant</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.transactions.map((transaction) => (
                    <tr className="" key={transaction.id}>
                      <td className='text-lg md:text-3xl'>{transaction.emoji}</td>
                      <td>
                        <div className="badge badge-accent badge-xs md:badge-sm">{transaction.amount}</div>
                      </td>
                      <td>{transaction.description}</td>
                      <td>{transaction.createdAt.toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}</td>
                      <td>{transaction.createdAt.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                      })}</td>
                      <td>
                        <button className='btn btn-accent btn-xs md:btn-sm'
                        onClick={() => handleDeleteTransaction(transaction.id)}>
                          <TrashIcon className='w-4 h-4' />
                          </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          ) : (
            <div className='md:w-2/3 mt-10 md:ml-4 flex items-center justify-center'>
              <SendIcon className='w-8 h-8 text-accent' strokeWidth={1.5} />
              <span className='text-gray-500 ml-2'>Aucune transaction trouvée</span>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  )
}

export default Page