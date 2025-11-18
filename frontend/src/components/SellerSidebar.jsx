import { useState } from "react";

import { ChartBar, ShoppingBag, Layers, BarChart3 } from "lucide-react";




export function SellerSidebar({ current, setCurrent }) {
    const links = [
        { id: "dashboard", label: "Dashboard", icon: <ChartBar /> },
        { id: "add-product", label: "Add Product", icon: <ShoppingBag /> },
        { id: "sales", label: "Sales Data", icon: <BarChart3 /> },
    ];


    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-6">Seller Panel</h2>
            {links.map((link) => (
                <button
                    key={link.id}
                    onClick={() => setCurrent(link.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all font-semibold
                        ${current === link.id ? "bg-orange-500" : "hover:bg-gray-700"}`}
                >
                    {link.icon}
                    {link.label}
                </button>
            ))}
        </div>
    );
}