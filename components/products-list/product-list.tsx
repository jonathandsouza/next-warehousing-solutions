import React, { useContext, useEffect, useRef, useState } from 'react';
import IArticle from '../../models/articles';
import { IProduct } from '../../models/products';
import LoaderContext from '../../services/loader';
import ProductService from '../../services/products';
import ToastService from '../../services/toast';
import { SortAlphabetically } from '../../services/utilities';
import ActionButtonList from '../action-button-list/action-button-list';
import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import { GridPlaceholderCard, GridView } from '../grid-view/grid-view';
import { Toolbar } from '../tool-bar/tool-bar.';
import { ProductCard } from './product-card/product-card';
import ProductDetails from './product-details/product-details';

import styles from './product-list.module.scss';

const ProductList = () => {
	const [originalProductsList, setOriginalProductsList] =
		useState<Array<IProduct> | null>(null);
	const [products, setProducts] = useState<Array<IProduct> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeProduct, setActiveProduct] = useState<IProduct | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const searchString = useRef<string>('');

	const loader = useContext(LoaderContext);

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
					setOriginalProductsList(sortedProducts);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setProducts([]);
					setOriginalProductsList([]);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const getFilteredProductList = (list: Array<IProduct> = []) => {
		return (
			list.filter(
				(product) =>
					product.name
						.toLowerCase()
						.indexOf(searchString.current.toLowerCase()) !== -1 ||
					product.id
						.toLowerCase()
						.indexOf(searchString.current.toLowerCase()) !== -1
			) || []
		);
	};

	const search = (str?: string) => {
		searchString.current = str ?? searchString.current;
		setProducts(getFilteredProductList(originalProductsList || []));
	};

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
								const newList = [
									...(originalProductsList || []),
									product,
								];
								setOriginalProductsList(newList);
								setProducts(getFilteredProductList(newList));
							}
						}}
						onUpdate={(product) => {
							{
								const productList = (
									originalProductsList || []
								).filter((a) => a.id !== product.id);

								productList.push(product);
								setOriginalProductsList(productList);
								setProducts(
									getFilteredProductList(productList)
								);
							}
						}}
						onDelete={(product) => {
							{
								const productList = (
									originalProductsList || []
								).filter((a) => a.id !== product.id);

								setOriginalProductsList(productList);
								setProducts(
									getFilteredProductList(productList)
								);
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
