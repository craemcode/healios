import { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { dollarAmount } from "../utils/dollarAmount";
import BuyerSidebar from "../components/BuyerSidebar";
import api from "../api";
import BuyerNavbar from "../components/BuyerNavbar";

export default function BuyerOrders() {
    const [current, setCurrent] = useState("orders");
    
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState({});
    const [loadingOrderId, setLoadingOrderId] = useState(null);

    useEffect(() => {
        api.get("/buyer/orders")
            .then(res => setOrders(res.data.orders))
            .catch(err => console.error(err));
    }, []);

    const toggleOrder = async (orderId) => {
        
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
            return;
        }

        setExpandedOrder(orderId);



        if (orderItems[orderId]) return;

        try {
            setLoadingOrderId(orderId);

            const res = await api.get(`/buyer/orders/${orderId}`);
            //console.log(res.data.order)
            setOrderItems(prev => ({
                ...prev,
                [orderId]: res.data.order.items
            }));

            //console.log(orderItems)
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingOrderId(null);
        }
    };

    const confirmDelivery = async (subOrderId) => {
        try {
            await api.post(`/buyer/suborders/${subOrderId}/deliver`);


        } catch (err) {
            console.error(err);
            alert("Failed to confirm delivery");
        }
    };




    const statusStyles = {
        pending_payment: "bg-gray-100 text-gray-600",
        processing: "bg-orange-100 text-orange-700",
        partially_fulfilled: "bg-blue-100 text-blue-700",
        fulfilled: "bg-purple-100 text-purple-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div className="flex min-h-screen">
            <BuyerSidebar current={current} setCurrent={setCurrent} /> 

                <div className="flex-1 flex flex-col">
                    <BuyerNavbar/>







            <div className="space-y-4 p-6 ">
                <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>

                {orders.length === 0 && (
                    <p className="text-gray-500">You have not placed any orders yet.</p>
                )}

                {orders.map(order => (

                    <div
                        key={order.id}
                        className="bg-white rounded-xl shadow border"
                    >
                        {/* ORDER SUMMARY */}
                        <div
                            onClick={() => toggleOrder(order.id)}
                            className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">
                                    Order #{order.order_number}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Placed on {formatDate(order.created_at, { withTime: true })}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
                                >
                                    {order.status.replace("_", " ")}
                                </span>


                                <span className="font-semibold text-gray-800">
                                    $ {dollarAmount(order.total)}
                                </span>



                            </div>
                        </div>

                        {/* ORDER ITEMS (EXPANDED) */}
                        {expandedOrder === order.id && (
                            <div className="border-t px-4 py-3 space-y-3">
                                {orderItems[order.id]?.map(item => {

                                    const subOrder = order.sub_orders.find(
                                        so => so.seller_id === item.seller_id
                                    );
                                    console.log("order:", order);
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-sm text-gray-700 border-b pb-2"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    {/* Green tick if delivered */}
                                                    {subOrder?.status === "delivered" && (
                                                        <span className="text-green-600">✔</span>
                                                    )}

                                                    <p className="font-medium">{item.product.name}</p>
                                                </div>

                                                <p className="text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>

                                                {/* Shipping status messaging */}
                                                {(order.status === "fulfilled" || order.status === "partially_fulfilled") && subOrder && (
                                                    <>
                                                        {subOrder.status === "shipped" && (
                                                            <p className="text-orange-600">
                                                                This item has been shipped
                                                            </p>
                                                        )}

                                                        {subOrder.status === "processing" && (
                                                            <p className="text-gray-400">
                                                                ⏳ Awaiting shipment
                                                            </p>
                                                        )}
                                                    </>
                                                )}

                                                {/* Confirm delivery button */}
                                                {subOrder?.status === "shipped" && (
                                                    <button
                                                        onClick={() => confirmDelivery(subOrder.id)}
                                                        className="mt-1 text-xs text-white bg-orange-600 p-1 rounded-md hover:bg-green-700"
                                                    >
                                                        Confirm delivery
                                                    </button>
                                                )}
                                            </div>

                                            <div className="font-semibold">
                                                $ {dollarAmount(item.total)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}