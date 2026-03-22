'use client'
import { ArrowLeft, Leaf } from 'lucide-react'
import { motion } from 'motion/react';

type PropType = {
    previousStep: (s: number) => void;
}
function RegisterForm({ previousStep }: PropType) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
            <div className='absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer' onClick={() => previousStep(1)}>
                <ArrowLeft className='w-5 h-5' />
                <span className='font-medium'>Back</span>
            </div>
            <motion.h1
                initial={{
                    y: -10,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.9
                }}
                className='text-4xl font-extrabold text-green-700 mb-2'>
                Register Account
            </motion.h1>
            <p className='flex text-grey-600 items-center '>Join Today <Leaf className='w-5 h-5 text-green-700' /></p>
            <motion.form className='flex flex-col gap-5 w-full max-w-sm'>

            </motion.form>
        </div>
    )
}

export default RegisterForm