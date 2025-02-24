import React from 'react'
import { Budget } from '@/type'

interface BudgetItemsProps {
    budget: Budget          
}

const BudgetItems : React.FC<BudgetItemsProps> = ({budget}) => {

    const transactionCount = budget.transactions ? budget.transactions.length : 0
    const totalTransactionAmount = budget.transactions
        ? budget.transactions.reduce(
            (sum , transaction) => sum + transaction.amount , 0)
        : 0

    const remainingAmount = budget.amount - totalTransactionAmount
    
    
  return (
    <div>BudgetItems

    </div>
  )
}

export default BudgetItems