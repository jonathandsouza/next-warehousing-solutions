import React, { useContext, useEffect, useRef, useState } from 'react';
import { IProduct } from '../../models/products';
import ProductService from '../../services/products';
import ToastService from '../../services/toast';
import { SortAlphabetically } from '../../services/utilities';
import ActionButtonList from '../action-button-list/action-button-list';
import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import { GridPlaceholderCard, GridView } from '../grid-view/grid-view';
import { ProductCard } from './product-card/product-card';
import ProductDetails from './product-details/product-details';

const ProductList = () => {
	// region state
	const [products, setProducts] = useState<Array<IProduct> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeProduct, setActiveProduct] = useState<IProduct | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// endregion

	// region fetch products list
	const fetchProducts = () => {
		setIsLoading(true);

		ToastService.promise<Array<IProduct>>(ProductService.getAllProducts(), {
			error: 'Failed to fetch products 🤯',
			pending: 'Fetching products ⏳',
			success: 'Products fetched successfully 👌',
		})

			.then(
				(products) => {
					const sortedProducts = products.sort(
						SortAlphabetically('name')
					);
					setProducts(sortedProducts);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setProducts([]);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};
	// endregion

	// region use effect
	useEffect(() => {
		fetchProducts();
	}, []);
	// endregion

	return (
		<>
			<ActionButtonList
				onAddClick={() => {
					setActiveProduct(null);
					setShowDrawer(true);
				}}
				disabled={isLoading}
				onReloadClick={() => {
					fetchProducts();
				}}
				addText="Add Product"
			/>

			{isLoading && (
				<>
					<GridView
						card={({ content }: { content: IProduct }) => (
							<GridPlaceholderCard />
						)}
						contents={Array.from(Array(10), () => ({}))}
					/>
				</>
			)}

			{!isLoading && failedToFetch && (
				<FailedToFetch onRefetchClick={fetchProducts} />
			)}

			{!isLoading && products && products.length > 0 && (
				<GridView
					card={({ content }: { content: IProduct }) => (
						<ProductCard
							content={content}
							onSelect={(product) => {
								setActiveProduct(product);
								setShowDrawer(true);
							}}
						/>
					)}
					contents={products || []}
				/>
			)}

			{showDrawer && (
				<div style={{ zIndex: 100 }}>
					<ProductDetails
						product={activeProduct}
						onAdd={(product) => {
							{
								setProducts([...(products || []), product]);
							}
						}}
						onUpdate={(product) => {
							{
								const productList = (products || []).filter(
									(a) => a.id !== product.id
								);

								productList.push(product);
								setProducts(productList);
							}
						}}
						onDelete={(product) => {
							{
								const productList = (products || []).filter(
									(a) => a.id !== product.id
								);

								setProducts(productList);
							}
						}}
						onClose={() => {
							setActiveProduct(null);
							setShowDrawer(false);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default ProductList;
