import React from 'react'

const OrderCard = ({ order }) => {
  	return (
   		<div  className="flex gap-4 py-5 border-b border-slate-100 last:border-0 group">
         {/* Image */}
         <div className="w-[84px] h-[84px] rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-50">
           <img
             src={order?.image}
             alt={order.title}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
           />
         </div>
   
         {/* Info */}
         <div className="flex-1 min-w-0 flex flex-col gap-1.5">
           {/* Title + Price */}
           <div className="flex items-start justify-between gap-3">
             <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
               {order.title}
             </p>
             <span className="text-sm font-bold text-slate-900 font-mono whitespace-nowrap flex-shrink-0">
               {order?.price}
             </span>
           </div>
   
           {/* data ID + Qty */}
           <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
             <span>{order.id}</span>
             <span className="w-1 h-1 rounded-full bg-slate-300" />
             <span className="font-sans text-slate-500">
               Qty: <span className="font-semibold text-slate-700">{order.quantity}</span>
             </span>
           </div>
   
           {/* Status + Date */}
           <div className="flex items-center gap-3 mt-0.5">
             <StatusTag status={order.status} />
             <span className="text-xs text-slate-400">
               {/*{prefix}{" "}*/}
               <span className="text-slate-500 font-medium">{order.date}</span>
             </span>
           </div>
         </div>
       </div>
  	);
}
export default OrderCard