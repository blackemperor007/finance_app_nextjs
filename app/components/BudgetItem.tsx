import { Budget } from "@/type";
import React from "react";

interface BudgetItemProps {
    budget: Budget;
    enableHover? : number;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget , enableHover}) => {
    const transactionCount = budget.transactions ? budget.transactions.length : 0;
    const totalTransactionAmount = budget.transactions
        ? budget.transactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0)
        : 0

    const remainingAmount = budget.amount - totalTransactionAmount

    const progressValue = 
       totalTransactionAmount > budget.amount
       ? 100
       : (totalTransactionAmount /budget.amount) * 100

    const hoverClasse = enableHover === 1 ? "hover:shadow-xl hover:border-accent" :"";

    return (
        <li key={budget.id} className={`p-4 rounded-xl border-2 border-base-300 list-none ${hoverClasse} `}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-accent/20 text-xl h-10 w-10 rounded-full flex justify-center items-center">
                        {budget.emoji}
                    </div>
                    <div className="flex flex-col ml-3">
                        <span className="font-bold text-xl">{budget.name}</span>
                        <span className="text-gray-500 text-sm">
                            {transactionCount} transaction(s)
                        </span>
                    </div>
                </div>
                <div className="text-xl font-bold text-accent">{budget.amount} €</div>
            </div>
            <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                <span>{totalTransactionAmount} € dépensés</span>
                <span>{remainingAmount} € restants</span>
            </div>

            <div>
            <progress className="progress progress-accent w-full mt-4" value={progressValue} max="100"></progress>
            </div>

        </li>
    )
};

export default BudgetItem;
