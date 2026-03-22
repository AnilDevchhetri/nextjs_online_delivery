'use client'
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'
type PropType = {
    nextStep: (s: number) => void
}
function Welcome({ nextStep }: PropType) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
            <motion.div initial={{
                opacity: 0,
                y: -10
            }} animate={{
                opacity: 1,
                y: 0
            }}
                transition={{
                    duration: 0.6
                }}
                className='flex items-cneter gap-3'
            >
                <ShoppingBasket className='w-10 h-10 text-green-600' />
                <h1 className='text-4xl md:text-5xl font-extrabold text-green-700 '>QuickDelivery</h1>


            </motion.div>
            <motion.p
                initial={{
                    opacity: 0,
                    y: 10
                }} animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.4
                }}
                className='mt-4 text-gray-700 text-lg md:text-xl max-w-lg'
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, velit fuga quas neque nobis magni. Atque iste veritatis quia sed.
            </motion.p>
            <motion.div

                initial={{
                    opacity: 0,
                    scale: 0.7
                }} animate={{
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.6

                }}
                className='flex gap-10 items-center justify-center mt-10'
            >
                <ShoppingBasket className='w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md' />
                <Bike className='w-24 h-24 md:w-32 md:h-32 text-orange-500' />
            </motion.div>
            <motion.button
                onClick={() => nextStep(2)}
                initial={{
                    opacity: 0,
                    y: 20
                }} animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.6
                }}
                className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shado-md transition-all duration-200 cursor-pointer mt-16'
            >
                View <ArrowRight />
            </motion.button>
        </div>
    )
}

export default Welcome