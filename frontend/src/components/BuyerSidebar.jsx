import { Link } from "react-router-dom";

export default function BuyerSidebar({ current, setCurrent }) {
  return (
    <div className="w-60 h-screen bg-white border-r p-4 shadow-sm">
      <h2 className="text-xl font-bold text-orange-600 mb-6">Healios</h2>

      <nav className="space-y-2">
        <button
          onClick={() => setCurrent("home")}
          className={`w-full text-left p-2 rounded-lg font-medium 
            ${current === "home" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"}`}
        >
          Products
        </button>

        <button
          onClick={() => setCurrent("orders")}
          className={`w-full text-left p-2 rounded-lg font-medium 
            ${current === "orders" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"}`}
        >
          My Orders
        </button>
      </nav>
    </div>
  );
}