import { useEffect, useState } from "react";
import api from "../api";
import { SellerOrderActions } from "../components/SellerOrderActions";
import { formatDate } from "../utils/date";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [items, setItems] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    api.get("/seller/orders")
      .then(res => setOrders(res.data.orders))
      .catch(console.error);
  }, []);

  const toggleOrder = async (orderId) => {
    if (expanded === orderId) {
      setExpanded(null);
      return;
    }

    setExpanded(orderId);

    if (!items[orderId]) {
      try {
        setLoadingId(orderId);
        const res = await api.get(`/seller/orders/${orderId}/items`);
        setItems(prev => ({
          ...prev,
          [orderId]: res.data.items
        }));
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="border rounded-xl bg-white shadow-sm"
          >
            {/* Summary */}
            <div
              onClick={() => toggleOrder(order.id)}
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Order #{order.seller_order_number}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {formatDate(order.created_at,  { withTime: true })}
                </p>
                <p className="text-sm text-gray-500">
                    Buyer Order# {order.order.order_number}
                </p>
                <p className="text-sm text-gray-500">
                    Bought by {order.order.buyer.name}
                </p>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${statusColor(order.status)}`}>
                  {order.status}
                </span>

                <p className="text-orange-600 font-semibold mt-1">
                  Earnings: ${order.seller_earnings}
                </p>
                {order.order.status === "pending_payment" && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-600 font-bold text-xs">
                      !
                    </span>
                    <span className="italic font-bold">
                      Awaiting payment
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* Items */}
            {expanded === order.id && (
              <div className="border-t p-4 bg-gray-50">
                {loadingId === order.id ? (
                  <p className="text-sm text-gray-500">
                    Loading items…
                  </p>
                ) : (
                  items[order.id]?.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between py-2"
                    >
                      <div>
                        <p className="font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${item.total}
                      </p>
                    </div>
                  ))
                )}

                {/* Actions */}
                <SellerOrderActions order={order} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function statusColor(status) {
  return {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  }[status];
}
