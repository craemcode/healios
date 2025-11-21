import { motion } from "framer-motion";
import { ChartBar, Layers, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";



export function SellerDashboard() {
   const [stats, setStats] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/seller/stats")
            .then(res => setStats(res.data))
            .catch(err => console.log(err));
    }, []);

    if (!stats) return <p>Loading...</p>;

    const cards = [
        { label: "Total Sales", value: stats.sales, icon: <ChartBar /> },
        { 
            label: "Products", 
            value: stats.products, 
            icon: <Layers />, 
            clickable: true, 
            onClick: () => navigate("/seller/products") 
        },
        { label: "Categories", value: stats.categories, icon: <Layers /> },
        { label: "Monthly Volume", value: stats.monthly_volume, icon: <BarChart3 /> },
    ];


    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((s, index) => (
                <motion.div
                    key={index}
                    onClick={s.clickable ? s.onClick : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 bg-white rounded-2xl shadow flex items-center gap-4
                        ${s.clickable ? "cursor-pointer hover:shadow-lg hover:bg-gray-50" : ""}
                    `}
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