// src/app/page.tsx
import { getProductRepository } from '@/lib/di/container';
import ProductCard from '@/app/products/components/ProductCard';
import Link from "next/link";
import React from "react";

export default async function HomePage() {
    const productRepository = getProductRepository();
    const featuredProductsResponse = await productRepository.getProducts({ limit: 4 });
    const featuredProducts = featuredProductsResponse.data?.products || [];

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-blue-600">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Premium Quality Products</h1>
                            <p className="text-lg mb-8 text-blue-100">
                                Shop our curated collection of high-quality items at competitive prices.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    replace={true}
                                    href="/products"
                                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                                >
                                    Shop Now
                                </Link>
                                <Link
                                    href="/categories"
                                    className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
                                >
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="relative rounded-lg overflow-hidden shadow-xl">
                                <img
                                    src="https://via.placeholder.com/600x400?text=StoreFront"
                                    alt="Featured products"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Explore our handpicked selection of top products
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/products"
                            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
