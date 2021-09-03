import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import ProductList from '../components/products-list/product-list'
import { Toolbar } from '../components/tool-bar/tool-bar.'
import { IProduct } from '../models/products'
import ProductService from '../services/products'

const Products: NextPage = () => {
	const [state, setState] = useState<Array<IProduct>>([])
	const [singleProduct, setSingleProduct] = useState<IProduct | null>(null)

	const [createdProduct, setCreatedProduct] = useState<any>(null)

	const [removedProduct, setRemovedProduct] = useState<any>(null)

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
	)
}

export default Products
