"use client"
import React from 'react';
import { useUser, UserButton } from "@clerk/nextjs";
import Link from 'next/link';

const Navbar = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    return (
        <div className='bg-base-200/30 px-5 md:px-[10%] py-4'>
            {isLoaded && (
                (isSignedIn ? (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="flex text-2xl items-center font-bold">
                                Cash <span className='text-accent'>.Track</span>
                            </div>
                            <div className="md:flex hidden items-center gap-4">
                                <Link href="/budgets" className='btn'>Budgets</Link>
                                <Link href="/budgets" className='btn'>Tableau de bord</Link>
                                <Link href="/budgets" className='btn'>Transactions</Link>
                            </div>
                            <UserButton/>
                        </div>

                        <div className="md:hidden flex items-center gap-4">
                                <Link href="/budgets" className='btn btn-sm md:btn-md'>Budgets</Link>
                                <Link href="/dashboard" className='btn mx-4 btn-sm'>Tableau de bord</Link>
                                <Link href="/transaction" className='btn btn-sm'>Transactions</Link>
                            </div>
                    </>
                ) : (
                    <div className='flex items-center justify-between'>
                        <div className="flex text-2xl items-center font-bold">
                                Cash <span className='text-accent'>.Track</span>
                            </div>
                         <div className="md:flex items-center gap-4">
                                <Link href={"/sign-in"} className='btn btn-accent'>Connexion</Link>
                                <Link href={"/sign-up"} className='btn'>Inscription</Link>
                            </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Navbar;