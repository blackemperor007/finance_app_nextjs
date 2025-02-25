"use client"
import { Transaction } from '@/type'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { getTransactionsByEmailAndPeriod } from '../actions'
import Wrapper from '../components/Wrapper'
import TransactionItems from '../components/TransactionItems'

const page = () => {

    const { user } = useUser()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const fetchTransactions = async (period: string) => {
        if (user?.primaryEmailAddress?.emailAddress) {
            setLoading(true)
            try {
                const transactionsData = await getTransactionsByEmailAndPeriod(user?.primaryEmailAddress?.emailAddress, period)
                if (transactionsData) {
                    setTransactions(transactionsData)
                }
                setLoading(false)
            } catch (error) {
                console.error("Erreur lors de la récupération des transactions", error)
            }
        }
    }

    useEffect(() => {
        fetchTransactions("last30")
    }, [user?.primaryEmailAddress?.emailAddress])

    return (
        <Wrapper>
            <div className="overflow-x-auto w-full bg-base-200/35 p-5 rounded-xl">
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <span className="loading loading-infinity loading-md"></span>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className='flex justify-center items-center h-full'>
                            <span className='text-gray-500 text-sm'>
                                Aucune transaction trouvée pour cette période
                            </span>
                        </div>
                    ) : (
                        <ul className="divide-y divide-base-300">
                            {transactions.map((transaction) => (
                                <TransactionItems transaction={transaction} key={transaction.id}></TransactionItems>
                            ))}
                        </ul>
                    )
                }
            </div>
        </Wrapper>
    )
}

export default page