import React, { useContext, useEffect, useState } from 'react'
import IArticle from '../../models/articles'
import { IProduct } from '../../models/products'
import LoaderContext from '../../services/loader'
import ProductService from '../../services/products'
import { GridView } from '../grid-view/grid-view'
import { ProductCard } from './product-card/product-card'

const ProductList = () => {
	const [products, setProducts] = useState<Array<IProduct> | null>(null)

	const loader = useContext(LoaderContext)

	useEffect(() => {
		loader.showLoader()
		ProductService.getAllProducts().then((products) => {
			setProducts(products)
			loader.hideLoader()
		})
	}, [])

	if (!products) return null

	return (
		<>
			<GridView
				card={({ content }: { content: IArticle }) => (
					<ProductCard content={content} />
				)}
				contents={products}
			/>
		</>
	)
}

export default ProductList
