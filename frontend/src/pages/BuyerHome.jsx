import { useEffect, useState } from "react";

import api from "../api";

import BuyerSidebar from "../components/BuyerSidebar";
import BuyerNavbar from "../components/BuyerNavbar";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import BasketButton from "../components/BasketButton";
import CartSidebar from "../components/CartSidebar";
import BuyerOrders from "./BuyerOrders";


export default function BuyerHome() {
  const [current, setCurrent] = useState("home");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products"); 
      let list = res.data.products;

      list = list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      if (category) {
        list = list.filter((p) => p.category === category);
      }

      setProducts(list);
    } catch (err) {
      console.log("Error loading products:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      
      <BuyerSidebar current={current} setCurrent={setCurrent} />

      <div className="flex-1 flex flex-col">
        
        <BuyerNavbar />
        <BasketButton />

        <div className="p-6">
          
          {current === "home" && (
            <>
              <FilterBar category={category} setCategory={setCategory} />

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}

          {current === "orders" && <BuyerOrders/>}

        </div>
      </div>
     <CartSidebar />
    </div>
  );
  
}



