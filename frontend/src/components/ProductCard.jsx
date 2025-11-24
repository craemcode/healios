import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function ProductCard({ product }) {
  
  const formatPrice = (price) => {
  const [dollars, cents] = Number(price)
    .toFixed(2)
    .split(".");

  return { 
    dollars: Number(dollars).toLocaleString(), 
    cents 
  };
};

const { dollars, cents } = formatPrice(product.price);

  
  
  
  
  
  
  return (
    
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition">
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
     <div className="flex items-center text-gray-600 text-sm gap-3">
          <User className="text-gray-400" />
          {product.seller?.name}
        </div>

      <p className="text-orange-600 font-bold text-lg mt-2">
        $ {dollars}.<sup className="text- ">{cents}</sup>
      </p>
    </div>
  );
}