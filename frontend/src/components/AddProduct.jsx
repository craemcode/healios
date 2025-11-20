import { useState } from "react";
import api from "../api";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "clinical",
    price: "",
    description: "",
    photo: null, 
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFile = (e) => {
    setForm(prev => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("image", form.photo); // file key MUST match backend

      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      setSuccess(true);

      setForm({ name: "", category: "clinical", price: "", description: "",photo: null });

    } catch (err) {
      console.log(err);
      setError("Failed to add product");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5 text-orange-600">Add New Product</h1>

      {success && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Product added successfully!
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-lg">

        {/* Name */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="clinical">Clinical</option>
            <option value="electronics">Electronics</option>
            <option value="sanitation">Sanitation</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Selling Price (KES)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>


        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            rows="5"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Product Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-bold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}