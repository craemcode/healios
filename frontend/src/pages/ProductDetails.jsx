import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag, User, Store, CheckCircle, XCircle } from "lucide-react";
import api from "../api";
import AddToCartModal from "../components/AddToCartModal";
import BasketButton from "../components/BasketButton";
import CartSidebar from "../components/CartSidebar";


import BuyerNavbar from "../components/BuyerNavbar";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  //add to cart modal function
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data.product);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center p-10 text-red-600">Product not found</div>;
  }

  





  return (
    <div>
        <BuyerNavbar />
        
    <div className="flex flex-col md:flex-row gap-10 p-8 max-w-6xl mx-auto">

        
      {/* LEFT — LARGE IMAGE */}
      <div className="w-full md:w-1/2">
        <img
          src={product.photo_url}
          alt={product.name}
          className="w-full h-[450px] object-contain rounded-xl shadow"
        />
      </div>

      {/* RIGHT — DETAILS */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

        <BasketButton />

          {/* Stock Status */}
          <div className="flex items-center text-md gap-3">
            {product.stock > 0 ? (
              <>
                <CheckCircle className="text-green-500" />
                <span className="text-green-600 italic">Available for purchase</span>
              </>
            ) : (
              <>
                <XCircle className="text-gray-400" />
                <span className="text-gray-500 italic">This product is not in stock</span>
              </>
            )}
          </div>


        {/* Price */}
        <div className="flex items-center text-2xl font-semibold text-orange-500 gap-3">
          <Tag className="text-orange-400" />
          KES {product.price}
        </div>

        {/* Seller */}
        <div className="flex items-center text-gray-600 text-lg gap-3">
          <User className="text-gray-400" />
          {product.seller?.name}
        </div>

        {/* Company */}
        <div className="flex items-center text-gray-600 text-lg gap-3">
          <Store className="text-gray-400" />
          {product.seller?.company_name ?? "No company listed"}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description provided."}
          </p>
        </div>
          <button
            disabled={product.current_stock === 0}
            onClick={() => setShowModal(true)}
            className={`px-6 py-3 rounded-xl text-white font-semibold 
        transition-all duration-200
        ${product.current_stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"}
                `}
          >
            {product.current_stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>


          <AddToCartModal
            product={product}
            show={showModal}
            onClose={() => setShowModal(false)}
          />

      </div>
      <CartSidebar />
    </div>
    </div>
  );
}