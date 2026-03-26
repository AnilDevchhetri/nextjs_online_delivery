'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { Bike, User, UserCog } from 'lucide-react'
function EditRoleMobile() {
    const [roles, setRoles] = useState([
        { id: "admin", label: "Admin", icon: UserCog },
        { id: "user", label: "User", icon: User },
        { id: "deliveryBoy", label: "DelvieryBoy", icon: Bike }
    ])
    const [selectedRole, setSelectedRole] = useState("")
    return (
        <div className='flex flex-col min-h-screen p-6 w-full '>

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
                className='text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8'
            >
                Select Your Role
            </motion.h1>
            <div className='flex flex-col md:flex-row justify-center items-center gap-6 mt-10'>
                {
                    roles.map((role) => {
                        const Icon = role.icon
                        const isSelected = (selectedRole == role.id)
                        return (
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                className={`flex flex-col items-center justify-center w-48 rounded-2xl border-2 transition-all cursor-pointer
                            ${isSelected ? "border-green-600 bg-green-100 shadow-lg"
                                        : "border-gray-300 bg-white hover:border-green-400"
                                    }
                            `}
                                onClick={() => setSelectedRole(role.id)}
                                key={role.id} >
                                <Icon />
                                <span> {role.label}</span>
                            </motion.div>
                        )
                    })
                }
            </div>
            <motion.div
                initial={{

                    opacity: 0
                }}
                animate={{

                    opacity: 1
                }}
                transition={{
                    delay: 0.4,
                    duration: 0.9
                }}

                className='flex flex-col items-center mt-10'>
                <label htmlFor='mobile' className='text-gray-700 font-medium mb-2'>Enter Your Mobile Number</label>

            </motion.div>
        </div>
    )
}

export default EditRoleMobile