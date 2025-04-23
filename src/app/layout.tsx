// src/app/layout.tsx
import '@/styles/globals.css';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import React from "react";

export const metadata: Metadata = {
    title: {
        template: '%s | StoreFront',
        default: 'StoreFront - Premium Online Shopping Experience',
    },
    description: 'Discover premium products with fast shipping and excellent customer service.',
    keywords: ['ecommerce', 'shopping', 'online store'],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}
