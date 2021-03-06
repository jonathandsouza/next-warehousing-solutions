import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import ProductList from '../components/products-list/product-list';

const Products: NextPage = () => {
	return (
		<>
			<Head>
				<title>Next Warehousing solutions.</title>
				<meta name="description" content="warehouse products" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container-fluid">
				<ProductList />
			</div>
		</>
	);
};

export default Products;
