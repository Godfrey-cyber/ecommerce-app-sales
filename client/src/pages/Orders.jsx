import { useState } from "react";
import { useGetOrdersQuery } from "../redux/orderApi.jsx"
import OrderCard from "../components/order/OrderCard.jsx"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ongoingOrders = [];

const cancelledOrders = [
  {
    id: "ORD-2025-00441",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=160&h=160&fit=crop",
    title: "Zara Women's Premium Trench Coat — Camel",
    qty: 1,
    status: "cancelled",
    date: "Mar 12, 2025",
    price: "KSh 8,499",
  },
  {
    id: "ORD-2025-00388",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&h=160&fit=crop",
    title: "Nike Air Max 270 — Black / Anthracite",
    qty: 2,
    status: "returned",
    date: "Feb 28, 2025",
    price: "KSh 14,200",
  },
  {
    id: "ORD-2025-00301",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=160&h=160&fit=crop",
    title: "Adidas Ultraboost 23 Running Shoes — Cloud White",
    qty: 1,
    status: "returned",
    date: "Feb 14, 2025",
    price: "KSh 17,850",
  },
];

// ─── Sidebar config ───────────────────────────────────────────────────────────
const sidebarItems = [
  {
    label: "My Account",
    path: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z",
  },
  {
    label: "Orders",
    path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
  },
  {
    label: "Inbox",
    path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  },
  {
    label: "Pending Reviews",
    path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  },
  {
    label: "Vouchers",
    path: "M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-2-1.46V18H6V6h12v4.54z",
  },
  {
    label: "Wishlist",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  },
];

// ─── Status Tag ───────────────────────────────────────────────────────────────
const statusMap = {
  delivered: {
    label: "Delivered",
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-rose-500",
    pill: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  returned: {
    label: "Returned",
    dot: "bg-amber-500",
    pill: "bg-amber-50 text-amber-700 ring-amber-200",
  },
};

const datePrefixMap = {
  delivered: "Delivered on",
  cancelled: "Cancelled on",
  returned: "Returned on",
};

function StatusTag({ status }) {
  const cfg = statusMap[status];
  if (!cfg) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ring-1 ${cfg.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}


// ─── Orders Page ──────────────────────────────────────────────────────────────
const Orders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [activeSidebar, setActiveSidebar] = useState("Orders");
  const { data:orders, isLoading:load, error:isError } = useGetOrdersQuery();
	 const data = orders?.orders
  // const prefix = datePrefixMap[order?.status] ?? "Date";
	 console.log("data", data)

  // const orders = activeTab === "ongoing" ? ongoingOrders : cancelledOrders;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto mb-6">
        <p className="text-xs text-slate-400 tracking-wide">
          Home &rsaquo;{" "}
          <span className="text-slate-700 font-semibold">My Account</span>
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-[220px_1fr] gap-5 items-start">

        {/* ── LEFT SIDEBAR ── */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

          {/* User card */}
          <div className="bg-slate-900 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                G
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">Godfrey M.</p>
                <p className="text-[11px] text-slate-400 truncate">godfrey@email.com</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="py-2">
            {sidebarItems.map(({ label, path }) => {
              const isActive = activeSidebar === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveSidebar(label)}
                  className={`w-full flex items-center gap-3 px-5 py-2.5 text-left border-l-[3px] transition-all duration-150
                    ${isActive
                      ? "border-slate-900 bg-slate-50"
                      : "border-transparent hover:bg-slate-50"
                    }`}
                >
                  <svg
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-slate-900" : "text-slate-400"}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={path} />
                  </svg>
                  <span
                    className={`text-[13px] transition-colors ${isActive ? "font-semibold text-slate-900" : "font-medium text-slate-500"}`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

          {/* Header */}
          <div className="px-7 pt-6 pb-0 border-b border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-5">
              Orders
            </h1>

            {/* Tabs */}
            <div className="flex gap-1">
              {[
                {
                  key: "ongoing",
                  label: "Ongoing / Delivered",
                  count: ongoingOrders.length,
                },
                {
                  key: "cancelled",
                  label: "Cancelled / Returned",
                  count: cancelledOrders.length,
                },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all duration-150
                      ${isActive
                        ? "border-slate-900 text-slate-900"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    {tab.label}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-all
                        ${isActive
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-400"
                        }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Orders list */}
          <div className="px-7 pb-4">
            {data?.length === 0 ? (
              <EmptyState />
            ) : (
              data?.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders