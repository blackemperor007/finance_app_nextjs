'use server'
import prisma from '@/lib/prisma'

export async function checkAndAddUser(email :string | undefined) {
    if(!email) return
    try {
        const existingUser = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if (!existingUser) {
            await prisma.user.create({
                data:{email}
            })
        console.log("nouvel utilisateur ajouter dans la base de donnée")
        } else {
        console.log("Utilisateur déjà présent dans la base de donnée")
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur", error)
    }
}

export async function addBudget(email :string , name : string , amount : number, selectedEmoji : string) {
    try {
        const user = await prisma.user.findUnique({
            where: {email}
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

export async function getBudgetsByUser(email : string) {
    try {
        const user = await prisma.user.findUnique({
            where: {email},
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

export async function getTransactionsByBudgetId(budgetId : string) {
    try {
        const budget = await prisma.budget.findUnique({
            where: {id: budgetId},
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

export async function addTransactionBudget(budgetId : string, amount : number, description : string) {
    try {
        const budget = await prisma.budget.findUnique({
            where: {id: budgetId},
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
                budget : {
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
