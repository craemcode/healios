import { useEffect, useState } from "react";
import { Tag, Store, User } from "lucide-react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function SellerProductEdit() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data.product))
            .catch(err => console.log(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        api.put(`/products/${id}`, product)
            .then(() => alert("Product updated!"));
    };

    return (
        <div className="flex flex-col md:flex-row gap-10 p-8 max-w-6xl mx-auto">

            {/* Image */}
            <div className="w-full md:w-1/2">
                <img src={product.photo_url} className="w-full h-[450px] object-contain rounded-xl shadow" />
            </div>

            {/* Edit fields */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">

                <input
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                />

                <input
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                />

                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="border p-3 rounded w-full h-40"
                />

                <button
                    onClick={handleSave}
                    className="mt-4 bg-orange-600 text-white px-5 py-3 rounded-xl shadow hover:bg-orange-700"
                >
                    Save Changes
                </button>

            </div>
        </div>
    );
}
