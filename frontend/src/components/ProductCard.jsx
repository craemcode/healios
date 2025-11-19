import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transitio max-w-xs mx-auto">
      <img
        src={product.photo_url}
        alt={product.name}
        className="w-full h-40 object-contain bg-gray rounded-md mb-3"
      />
       {/* Product name becomes a link */}
      <Link 
        to={`/product/${product.id}`} 
        className="mt-3 font-semibold text-lg text-black-600 hover:underline block"
      >
        {product.name}
      </Link> 

      <p className="text-sm text-gray-600 mb-1"> {product.seller?.name}</p>

      <p className="text-orange-600 font-bold text-lg mt-2">
        $ {product.price}
      </p>
    </div>
  );
}