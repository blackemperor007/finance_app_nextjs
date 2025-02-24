import React from 'react'
import { Budget } from '@/type'

interface BudgetItemsProps {
    budget: Budget
    enableHover?: number
}

const BudgetItems: React.FC<BudgetItemsProps> = ({ budget, enableHover}) => {

    const transactionCount = budget.transactions ? budget.transactions.length : 0
    const totalTransactionAmount = budget.transactions
        ? budget.transactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0)
        : 0

    const remainingAmount = budget.amount - totalTransactionAmount

    const progressValue = totalTransactionAmount > budget.amount ? 100 : (totalTransactionAmount / budget.amount) * 100
    const hoverClasses = enableHover === 1 ? "hover:shadow-xl hover:border-accent" : ""

    return (
        <li key={budget.id} className={`p-4 rounded-xl border-base-300 list-none border-2 ${hoverClasses}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-accent/20 text-xl h-10 w-10 rounded-full flex justify-center items-center">
                        {budget.emoji}</div>
                    <div className="flex flex-col ml-3">
                        <span className="font-bold text-xl">{budget.name}</span>
                        <span className="text-sm text-gray-500">
                            {transactionCount} transaction(s)
                        </span>
                    </div>
                </div>
                <div className="text-xl font-bold text-accent">
                    {budget.amount} fcfa
                </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <span>{transactionCount} xcfa dépensés</span>
                <span>{remainingAmount} xcfa restants</span>
            </div>

            <div>
            <progress className="progress w-full" value={progressValue} max={100}></progress>
            </div>
        </li>
    )
}

export default BudgetItems