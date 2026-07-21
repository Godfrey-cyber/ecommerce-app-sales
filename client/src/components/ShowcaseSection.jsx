import { slides } from "../utilities/assets.js"
import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useGetProductsQuery } from "../redux/productsApi.jsx"
const ShowcaseSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const { data, error, isLoading } = useGetProductsQuery();

	console.log("products", data?.products)

	useEffect(() => {
		if (!isAutoPlaying) return;
		
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % data?.products?.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, data?.products?.length]);

	const goToSlide = (index) => {
		setCurrentSlide(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 5000);
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % data?.products?.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 5000);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + data?.products?.length) % data?.products?.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 5000);
	};

	return (
		<div className="grid grid-cols-12 h-[750px] md:h-[400px] w-full px-2 md:px-10 lg:px-20 my-10 lg:gap-x-4  bg-white">
			<div className="col-span-12 lg:col-span-9 relative overflow-hidden bg-gray-100 w-full h-['450px']">
				{/* Carousel Slides */}
				{data?.products?.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute inset-0 flex justify-between items-center px-4 md:px-7 py-4 md:px-10 transition-all duration-700 ease-in-out ${
							index === currentSlide
								? 'opacity-100 translate-x-0'
								: index < currentSlide
								? 'opacity-0 -translate-x-full'
								: 'opacity-0 translate-x-full'
						}`}
					>
						{/*desc*/}
						<div className="flex flex-col space-y-4 lg:space-y-3 w-4/5 md:w-1/2">
							<p className="text-xl md:text-2xl lg:text-6xl text-green-400">{slide.title}</p>
							<p className="text-sm text-gray-800">{slide.description}</p>
							<p className="text-xl md:text-2xl lg:text-5xl font-bold text-gray-800">{slide.price}</p>
							<button className="bg-yellow-400 font-bold text-sm px-8 py-3 my-4 rounded-md w-fit cursor-pointer">Buy Now</button>
						</div>
						<div className="flex h-full w-full">
							<img className="object-cover" src="" alt='image.jpg' />
						</div>
					</div>
				))}

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
					aria-label="Previous slide"
				>
					<ChevronLeft className="w-6 h-6 text-gray-900" />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
					aria-label="Next slide"
				>
					<ChevronRight className="w-6 h-6 text-gray-900" />
				</button>

				{/* Dots Navigation */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`transition-all ${
								index === currentSlide
									? 'w-8 bg-yellow-400'
									: 'w-2 bg-gray-400 hover:bg-gray-600'
							} h-2 rounded-full`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
			{/* side profile */}
            <div className="flex col-span-12 grid grid-cols-3 lg:grid-cols-1 lg:col-span-3 flex justify-between items-center gap-x-2 lg:gap-x-0 lg:gap-y-2">
                <div className="xs:flex-col lg:flex justify-between space-x-.5 lg:space-x-3 items-center bg-gray-100 rounded-sm p-3 lg:p-3">
                    <img className="cursor-pointer h-20 w-20 " src="https://electrox.arenacommerce.com/cdn/shop/files/slider-img-h4-1.png?v=1650005832&width=338" alt="" />
                    <div className="cursor-pointer">
                        <p className="text-xs lg:text-xl lg:font-normal font-semibold lg:text-2xl text-gray-800">CATCH BIG DEALS ON THE CAMERAS</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-sm font-semibold">Buy now</p>
                            <span className="flex items-center space-x-3 justify-center bg-yellow-400 h-5 w-5 rounded-full">
                                <ChevronRight className="items-center" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="xs:flex-col lg:flex justify-between space-x-.5 lg:space-x-3 items-center bg-gray-100 rounded-sm p-3 lg:p-3">
                    <img className="cursor-pointer h-20 w-20 " src="https://electrox.arenacommerce.com/cdn/shop/files/image-right-h4-2.png?v=1651141955&width=100" alt="" />
                    <div className="cursor-pointer">
                        <p className="text-xs lg:text-xl lg:font-normal font-semibold lg:text-2xl text-gray-800">CATCH BIG DEALS ON THE CAMERAS</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-sm font-semibold">Buy now</p>
                            <span className="flex items-center space-x-3 justify-center bg-yellow-400 h-5 w-5 rounded-full">
                                <ChevronRight className="items-center" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="xs:flex-col lg:flex justify-between space-x-.5 lg:space-x-3 items-center bg-gray-100 rounded-sm p-3 lg:p-3">
                    <img className="cursor-pointer h-20 w-20 " src="https://electrox.arenacommerce.com/cdn/shop/files/image-right-h4-3.png?v=1651141968&width=100" alt="" />
                    <div className="cursor-pointer">
                        <p className="text-xs lg:text-xl lg:font-normal font-semibold lg:text-2xl text-gray-800">CATCH BIG DEALS ON THE CAMERAS</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-sm font-semibold">Buy now</p>
                            <span className="flex items-center space-x-3 justify-center bg-yellow-400 h-5 w-5 rounded-full">
                                <ChevronRight className="items-center" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	)
}
export default ShowcaseSection