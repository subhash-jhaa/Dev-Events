'use client'

import { motion } from 'framer-motion'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const demoUsers = [
    { name: "John Doe", color: "bg-blue-500", delay: 0 },
    { name: "Jane Smith", color: "bg-green-500", delay: 0.1 },
    { name: "Dev Kid", color: "bg-purple-500", delay: 0.2 },
    { name: "Tech Guru", color: "bg-orange-500", delay: 0.3 },
    { name: "Code Queen", color: "bg-pink-500", delay: 0.4 },
    { name: "System Architect", color: "bg-teal-500", delay: 0.5 },
]

export const CommunityCluster = () => {
    return (
        <div className="flex -space-x-3 items-center justify-center">
            {demoUsers.map((user, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: user.delay,
                        ease: "easeOut"
                    }}
                    whileHover={{
                        scale: 1.2,
                        zIndex: 10,
                        transition: { duration: 0.2 }
                    }}
                >
                    <Avatar className="w-10 h-10 border-2 border-[#030708] shadow-xl cursor-help ring-2 ring-transparent hover:ring-primary transition-all">
                        <AvatarFallback className={`${user.color} text-white text-[10px] font-bold`}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                </motion.div>
            ))}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pl-6 text-sm font-medium text-light-200"
            >
                <span className="text-white font-bold">+ 37,200</span> developers joined
            </motion.div>
        </div>
    )
}
