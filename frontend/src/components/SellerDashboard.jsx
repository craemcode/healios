import { motion } from "framer-motion";
import { ChartBar, Layers, BarChart3 } from "lucide-react";



export function SellerDashboard() {
    const stats = [
        { label: "Total Sales", value: "$12,540", icon: <ChartBar /> },
        { label: "Products", value: "28", icon: <Layers /> },
        { label: "Categories", value: "6", icon: <Layers /> },
        { label: "Monthly Volume", value: "$3,200", icon: <BarChart3 /> },
    ];


    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white rounded-2xl shadow flex items-center gap-4"
                >
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl text-xl">{s.icon}</div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                        <p className="text-xl font-bold">{s.value}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}