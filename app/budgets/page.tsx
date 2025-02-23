"use client"
import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';


const page = () => {
    const { user } = useUser()
    const [budgetName, setBudgetName] = useState<string>("")
    const [budgetAmount, setBudgetAmount] = useState<string>("")
    const [selectedEmoji, setSelectedEmoji] = useState<string>("")
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
    return (
        <Wrapper>
            <button className="btn" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                Nouveau Budget
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">
                        Création d'un budget
                    </h3>
                    <p className="py-4">
                        Permet de contrôler ses dépenses facilement
                    </p>

                    <div className='w-full flex flex-col'>
                        <input
                            type='text'
                            value={budgetName}
                            placeholder='Nom du budget'
                            onChange={(e) => setBudgetName(e.target.value)}
                            className='input input-bordered mb-3'
                            required
                        />

                        <input
                            type='number'
                            value={budgetAmount}
                            placeholder='Somme Allouée'
                            onChange={(e) => setBudgetAmount(e.target.value)}
                            className='input input-bordered mb-3'
                            required
                        />
                        <button className='btn' onClick={() => setShowEmojiPicker(!showEmojiPicker)}> {selectedEmoji || "selecttionnez un emoji 👍"} </button>
                        {showEmojiPicker && (
                            <EmojiPicker />
                        )}

                        <button className='btn'>
                            Ajouter budget
                        </button>
                    </div>
                </div>
            </dialog>
        </Wrapper>
    )
}

export default page