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
                            <div className="flex items-center gap-4">
                                <Link href="/budgets">Mes budgets</Link>
                                <UserButton afterSignOutUrl="/"/>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between items-center">
                        <div className="flex text-2xl items-center font-bold">
                            Cash <span className='text-accent'>.Track</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Navbar;