import React, { useContext, useEffect, useState } from 'react'
import { IProduct } from '../../models/products'
import LoaderContext from '../../services/loader'
import ProductService from '../../services/products'
import { GridView } from '../grid-view/grid-view'
import { Toolbar } from '../tool-bar/tool-bar.'
import { ProductCard } from './product-card/product-card'

const ProductList = () => {
	const [products, setProducts] = useState<Array<IProduct> | null>(null)

	const loader = useContext(LoaderContext)

	useEffect(() => {
		searchAll()
	}, [])

	const search = (id: string) => {
		loader.showLoader()
		ProductService.getProductById(id).then((product) => {
			setProducts([product])
			loader.hideLoader()
		})
	}

	const searchAll = () => {
		loader.showLoader()
		ProductService.getAllProducts().then((products) => {
			setProducts(products)
			loader.hideLoader()
		})
	}

	if (!products) return null

	return (
		<>
			<Toolbar
				onSearch={(str) => (str.length ? search(str) : searchAll())}
			/>

			<GridView
				card={({ content }: { content: IProduct }) => (
					<ProductCard content={content} />
				)}
				contents={products}
			/>
		</>
	)
}

export default ProductList
