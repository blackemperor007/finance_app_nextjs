"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { getTotalTransactionAmount } from '../actions'
import Wrapper from '../components/Wrapper'
import { CircleDollarSign } from 'lucide-react'

const page = () => {

    const  { user } = useUser()
    const [totalAmount, setTotalAmount] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const email = user?.primaryEmailAddress?.emailAddress as string
            if (email) {
                const amount = await getTotalTransactionAmount(email)
                setTotalAmount(amount)
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des budgets", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [user])
  return (
    <Wrapper>
        
               {loading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
               ) : (
                <div>
                    <div className="gri md:grid-cols-3 gap-4">
                        <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
                            <div className="flex flex-col">
                            <span className='text-gray-500 text-sm'>
                                Total des transactions
                            </span>
                            <span className='text-2xl font-bold text-accent'>
                                {totalAmount !== null ? `{totalAmount}xcfa` : "N/A"}
                            </span>
                            </div>
                            <CircleDollarSign className="bg-accent w-9 h-9 rounded-full p-1 text-white"/>
                        </div>

                        <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
                            <div className="flex flex-col">
                            <span className='text-gray-500 text-sm'>
                                Total des transactions
                            </span>
                            <span className='text-2xl font-bold text-accent'>
                                {totalAmount !== null ? `{totalAmount}xcfa` : "N/A"}
                            </span>
                            </div>
                            <CircleDollarSign className="bg-accent w-9 h-9 rounded-full p-1 text-white"/>
                        </div>

                        <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
                            <div className="flex flex-col">
                            <span className='text-gray-500 text-sm'>
                                Total des transactions
                            </span>
                            <span className='text-2xl font-bold text-accent'>
                                {totalAmount !== null ? `{totalAmount}xcfa` : "N/A"}
                            </span>
                            </div>
                            <CircleDollarSign className="bg-accent w-9 h-9 rounded-full p-1 text-white"/>
                        </div>
                    </div>
                </div>
               )}
           
    </Wrapper>
  )
}

export default page