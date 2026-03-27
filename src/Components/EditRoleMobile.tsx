'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, User, UserCog } from 'lucide-react'
import axios from 'axios'
function EditRoleMobile() {
    const [roles, setRoles] = useState([
        { id: "admin", label: "Admin", icon: UserCog },
        { id: "user", label: "User", icon: User },
        { id: "deliveryBoy", label: "DelvieryBoy", icon: Bike }
    ])
    const [selectedRole, setSelectedRole] = useState("")
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false)

    const handleEdit = async () => {
        try {
            if (loading) { return; }
            setLoading(true);
            const result = await axios.post("/api/user/edit-role-mobile", {
                role: selectedRole,
                mobile
            });
            console.log(result.data)
            setLoading(false);

        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    return (
        <div className='flex flex-col min-h-screen items-center p-6 w-full '>

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
                                className={`role-div flex flex-col items-center justify-center w-48 rounded-2xl border-2 transition-all cursor-pointer
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
                <input id='mobile' type='tel' className='w-64 m:w-80 py-3 pl-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800' placeholder='eg. 000000000' value={mobile} onChange={(e) => setMobile(e.target.value)} />

            </motion.div>
            <motion.button
                initial={{
                    y: 20,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    delay: 0.7
                }}
                disabled={mobile.length !== 10 || !selectedRole || loading}
                className={`inline-flex items-center gap-2 font-semibold py-3 px-10 rounded-2xl shadow-md transition-all duration-200  w-[200px] mt-15 ${(selectedRole && mobile.length == 10)
                    ? "bg-green-600 hover:bg-greeen-700 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                    
            `}
                onClick={handleEdit}
            >
                {
                    loading ? "Updating....."
                        : "Update"

                }
                <ArrowRight />
            </motion.button>
        </div>
    )
}

export default EditRoleMobile