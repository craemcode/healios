import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { SellerNavbar } from "../components/SellerNavbar";
import { SellerProductReviewsModal } from "../components/SellerProductReviewsModal";
import { PackagePlus, Pencil } from "lucide-react";
import { motion } from "framer-motion";

export default function SellerProducts() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [qty, setQty] = useState("");
    const [cost, setCost] = useState("");

    //review states
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/seller/products")
            .then(res => setProducts(res.data.products))
            .catch(err => console.log(err));
    }, []);

    const openRestockModal = (product) => {
        setSelectedProduct(product);
        setQty("");
        setCost("");
        setShowModal(true);
    };

    const handleRestock = () => {
        api.post(`/products/${selectedProduct.id}/restock`, {
            quantity: qty,
            unit_cost: cost,

        })
            .then((res) => {
                setShowModal(false);

                const newStock = res.data.current_stock;  // ← get accurate stock from backend

                // Update local UI state safely
                setProducts(prev =>
                    prev.map(p =>
                        p.id === selectedProduct.id
                            ? { ...p, stock: newStock }
                            : p
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const openReviews = (product) => {
            setSelectedProduct(product);
            setShowReviewsModal(true);
            setLoadingReviews(true);

            api.get(`/products/${product.id}/reviews`)
                .then(res => setReviews(res.data.reviews))
                .catch(() => setReviews([]))
                .finally(() => setLoadingReviews(false));
    };






    return (
        <div>
            <SellerNavbar />

            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Products</h1>

                <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 px-2">Name</th>
                                <th className="py-3 px-2">Category</th>
                                <th className="py-3 px-2">Price </th>
                                <th className="py-3 px-2">Stock</th>
                                <th className="py-3 px-2 text-center">Actions</th>
                                <th className="py-3 px-2">Reviews</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-2 font-semibold">{product.name}</td>
                                    <td className="py-3 px-2">{product.category}</td>
                                    <td className="py-3 px-2 font-bold text-orange-600">{product.price}</td>
                                    <td className="py-3 px-2">{product.stock ?? 0}</td>

                                    <td className="py-3 px-2 flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => navigate(`/seller/products/${product.id}`)}
                                            className="flex items-center gap-1 text-blue-600 hover:underline"
                                        >
                                            <Pencil size={16} /> Edit
                                        </button>

                                        <button
                                            onClick={() => openRestockModal(product)}
                                            className="flex items-center gap-1 text-orange-600 hover:underline"
                                        >
                                            <PackagePlus size={16} /> Restock
                                        </button>
                                    </td>
                                    <td className="py-3 px-2 ">
                                        <button
                                            onClick={() => openReviews(product)}
                                            className="text-orange-600 hover:underline font-medium"
                                        >
                                           See Reviews
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= RESTOCK MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <PackagePlus className="text-orange-600" /> 
                            Restock: {selectedProduct?.name}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Quantity Added</label>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={e => setQty(e.target.value)}
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Buying Price per Unit</label>
                                <input
                                    type="number"
                                    value={cost}
                                    onChange={e => setCost(e.target.value)}
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </div>

                            {(qty && cost) && (
                                <div className="font-semibold text-gray-700">
                                    Total Cost: <span className="text-orange-600">KES {qty * cost}</span>
                                </div>
                            )}

                            

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleRestock}
                                    disabled={!qty || !cost}
                                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:bg-orange-300"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
            <SellerProductReviewsModal
                show={showReviewsModal}
                onClose={() => setShowReviewsModal(false)}
                product={selectedProduct}
                reviews={reviews}
                loading={loadingReviews}
            />


        </div>
    );
}



