import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { SellerNavbar } from "../components/SellerNavbar";

export default function SellerProducts() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/seller/products")
            .then(res => setProducts(res.data.products))
            .catch(err => console.log(err));
    }, []);

    return (
        <div><SellerNavbar />
            <div className="p-6 max-w-5xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">My Products</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="p-4 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
                            onClick={() => navigate(`/seller/products/${product.id}`)}
                        >
                            <img
                                src={product.photo_url}
                                className="w-full h-40 object-contain mb-3 rounded"
                            />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-orange-600 text-lg font-bold">KES {product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
