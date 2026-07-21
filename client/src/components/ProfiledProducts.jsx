import React from 'react'
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import StarRating from "./StarRating.jsx"
import SectionHeader from "./SectionHeader.jsx"
import ProductCard from "./ProductCard.jsx"
import { TrendingUp, Flame, Star as StarIcon } from 'lucide-react';

const ProfiledProducts = () => {
	const { data, error, isLoading } = useGetProductsQuery();
	const sections = [
		{
			title: 'Featured products',
			icon: TrendingUp,
			iconColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
			products: data?.products?.slice(0, 3) || []
		},
		{
			title: 'On sale products',
			icon: Flame,
			iconColor: 'bg-gradient-to-br from-orange-500 to-red-500',
			products: data?.products?.slice(4, 7) || []
		},
		{
			title: 'Top rated products',
			icon: StarIcon,
			iconColor: 'bg-gradient-to-br from-amber-500 to-yellow-500',
			products: data?.products?.slice(8, 11) || []
		}
	];
	return (
		<section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{sections.map((section, idx) => (
						<div key={idx} className="flex flex-col">
							{/* Section Header */}
							<SectionHeader 
								title={section.title}
								icon={section.icon}
								iconColor={section.iconColor}
							/>

							{/* Product List */}
							<div className="flex flex-col space-y-2">
								{section.products.map((product, index) => (
									<ProductCard 
										key={product?._id} 
										product={product}
										index={index}
									/>
								))}
							</div>

							{/* Empty State */}
							{section.products.length === 0 && (
								<div className="flex items-center justify-center h-48 text-sm text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
									No products available
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ProfiledProducts