"use client"

import React from 'react'

function EmptyState() {
    return (
        <div
            className='                
                px-4
                py-10
                sm:px-6
                lg:px-8
                h-full
                flex
                justify-center
                items-center
                bg-gray-100
            '
        >
            <div className='text-center items-center flex flex-col'>
                <h3
                    className='
                        mt-2
                        text-xl
                        font-semibold
                        text-gray-900
                    '
                >
                    Seleciona un chat o inicia una nueva conversacion
                </h3>
            </div>
        </div>
    )
}

export default EmptyState