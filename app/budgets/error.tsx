"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error("Erreur capturée :", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
            <h2 className="text-2xl font-bold text-red-600">Oups ! Une erreur s'est produite.</h2>
            <p className="text-gray-700">{error.message}</p>
            <button 
                onClick={() => reset()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Réessayer
            </button>
        </div>
    );
}
