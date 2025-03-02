'use server'
import prisma from '@/lib/prisma'
import { Transaction , Budget } from "@/type";

export async function checkAndAddUser(email: string | undefined) {
    if (!email) return
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!existingUser) {
            await prisma.user.create({
                data: { email }
            })
            console.log("nouvel utilisateur ajouter dans la base de donnée")
        } else {
            console.log("Utilisateur déjà présent dans la base de donnée")
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur", error)
    }
}

export async function addBudget(email: string, name: string, amount: number, selectedEmoji: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        await prisma.budget.create({
            data: {
                name,
                amount,
                emoji: selectedEmoji,
                userId: user.id
            }
        })

    } catch (error) {
        console.error("Erreur d'ajout du budget", error);
        throw error
    }
}

export async function getBudgetsByUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        // const budgets = await prisma.budget.findMany({
        //     where: {userId: user.id}
        // })
        return user.budgets

    } catch (error) {
        console.error("Erreur lors de la récupération des budgets", error)
        throw error
    }
}

export async function getTransactionsByBudgetId(budgetId: string) {
    try {
        const budget = await prisma.budget.findUnique({
            where: { id: budgetId },
            include: {
                transactions: true
            }
        })

        if (!budget) {
            throw new Error("Budget non trouvé")
        }

        return budget
    } catch (error) {
        console.error("Erreur lors de la récupération des transactions", error)
        throw error
    }
}

export async function addTransactionBudget(budgetId: string, amount: number, description: string) {
    try {
        const budget = await prisma.budget.findUnique({
            where: { id: budgetId },
            include: {
                transactions: true
            }
        })

        if (!budget) {
            throw new Error("Budget non trouvé")
        }

        const totalTransactionAmount = budget.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
        const totalWithNewTransaction = totalTransactionAmount + amount

        if (totalWithNewTransaction > budget.amount) {
            throw new Error("Le budget est dépassé")
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                amount,
                description,
                emoji: budget.emoji,
                budget: {
                    connect: {
                        id: budget.id
                    }
                }
            }
        })

        return newTransaction

    } catch (error) {
        console.error("Erreur lors de l'ajout de la transaction", error)
        throw error
    }
}

export async function deleteBudget(budgetId: string) {
    try {
        await prisma.transaction.deleteMany({
            where: { budgetId }
        })
        await prisma.budget.delete({
            where: { id: budgetId }
        })
    } catch (error) {
        console.error("Erreur lors de la suppression du budget", error)
        throw error
    }
}

export async function deleteTransaction(transactionId: string) {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId }
        })

        if (!transaction) {
            throw new Error("Transaction non trouvée")
        }

        await prisma.transaction.delete({
            where: { id: transactionId }
        })
    } catch (error) {
        console.error("Erreur lors de la suppression de la transaction", error)
        throw error
    }
}

export async function getTransactionsByEmailAndPeriod(email: string, period: string) {
    try {
        const now = new Date()
        let dateLimit

        switch (period) {
            case 'last30':
                dateLimit = new Date(now)
                dateLimit.setDate(now.getDate() - 30)
                break
            case 'last90':
                dateLimit = new Date(now)
                dateLimit.setDate(now.getDate() - 90)
                break
            case 'last7':
                dateLimit = new Date(now)
                dateLimit.setDate(now.getDate() - 7)
                break
            case 'last365':
                dateLimit = new Date(now)
                dateLimit.setFullYear(now.getFullYear() - 1)
                break
            default:
                throw new Error("Période non valide")
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: {
                            where: {
                                createdAt: {
                                    gte: dateLimit
                                }
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }
                }
            }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }
        
        const transactions = user.budgets.flatMap(budget => budget.transactions.map(transaction => ({
            ...transaction,
            budgetName : budget.name,
            budgetId : budget.id
        })))

        return transactions
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions')
    }
}

// dashboard.ts
export async function getTotalTransactionAmount(email: string)  {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        const totalAmount = user.budgets.reduce((sum, budget) => {
            const totalTransactionAmount = budget.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
            return sum + totalTransactionAmount
        }, 0)

        return totalAmount
    } catch (error) {
        console.error("Erreur lors de la récupération du montant total", error)
        throw error
    }
}

export async function getTotalTransactionCount(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        const totalTransactionCount = user.budgets.reduce((count, budget) => {
            return count + budget.transactions.length
        }, 0)

        return totalTransactionCount
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre total de transactions", error)
        throw error
    }
}

export async function getReachedBudgets(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) throw new Error("Utilisateur non trouvé")

            const totalBudgets = user.budgets.length
            const reachedBudgets = user.budgets.filter(budget => {
                const totalTransactionAmount = budget.transactions.reduce((sum, transaction) => sum + transaction.amount , 0)
                return totalTransactionAmount >= budget.amount
            }).length 

            return `${reachedBudgets}/${totalBudgets}`
    } catch (error) {
        console.error("Erreur lors de la récuppération des données")
    }
}

export async function getUserBudgetData(email: string) {
    try {

        const user = await prisma.user.findUnique({
            where: { email },
            include: { budgets: { include: { transactions: true } } },
        });

        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        const data = user.budgets.map(budget => {
            const totalTransactionsAmount = budget.transactions.reduce( (sum , transaction) => sum + transaction.amount ,0)
            return {
                budgetName: budget.name,
                totalBudgetAmount : budget.amount,
                totalTransactionsAmount
            }
        })
        
        return data

    } catch (error) {
        console.error("Erreur lors de la récupération des données budgétaires:", error);
        throw error;
    }
}

export const getLastTransactions = async (email: string) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where : {
                budget : {
                    user: {
                       email : email 
                    }
                }
            },
            orderBy : {
                createdAt: 'desc',
            },
            take: 10 , 
            include: {
                budget : {
                    select: {
                        name : true
                    }
                }
            }

        })

        const transactionsWithBudgetName = transactions.map(transaction => ({
            ...transaction,
            budgetName: transaction.budget?.name || 'N/A', 
        }));


        return transactionsWithBudgetName

    } catch (error) {
        console.error('Erreur lors de la récupération des dernières transactions: ', error);
        throw error;
    }
}

export const getLastBudgets = async (email: string) => {
    try {
         const  budgets = await prisma.budget.findMany({
            where : {
                user : {
                    email
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            take : 3,
            include: {
                transactions: true
            }

         })

         return budgets

    } catch (error) {
        console.error('Erreur lors de la récupération des derniers budgets: ', error);
        throw error;
    }
}