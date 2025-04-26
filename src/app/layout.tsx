// src/app/layout.tsx
import '@/styles/globals.css';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import React from "react";
import Providers from "@/app/providers";

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
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
        <body className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Providers>
            <Header />
            <main className="flex-grow w-full">
                {children}
            </main>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
