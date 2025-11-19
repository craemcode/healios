import { useState } from "react";
import { SellerNavbar } from "../components/SellerNavbar";
import { SellerSidebar } from "../components/SellerSidebar";
import {SellerFooter} from "../components/SellerFooter";
import { SellerDashboard } from "../components/SellerDashboard";
import AddProduct from "../components/AddProduct";




export default function SellerHome() {
  const [current, setCurrent] = useState("dashboard");


  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SellerSidebar current={current} setCurrent={setCurrent} />


      <div className="flex flex-col flex-1 overflow-y-auto">
        <SellerNavbar />


        <div className="flex-1 bg-gray-50">
          {current === "dashboard" && <SellerDashboard />}
          {current === "add-product" && <AddProduct/>}
          {current === "sales" && (
            <div className="p-6 text-gray-700 text-lg font-semibold">Sales Data Page (coming soon)</div>
          )}
        </div>


        <SellerFooter />
      </div>
    </div>
  );
}
