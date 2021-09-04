import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import ProductList from '../components/products-list/product-list';
import { IProduct } from '../models/products';

const Products: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ProductList />
		</>
	);
};

export default Products;
