export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transitio max-w-xs mx-auto">
      <img
        src={product.photo_url}
        alt={product.name}
        className="w-full h-40 object-contain bg-gray rounded-md mb-3"
      />

      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-1">Seller: {product.seller?.name}</p>

      <p className="text-orange-600 font-bold text-lg mt-2">
        KES {product.price}
      </p>
    </div>
  );
}