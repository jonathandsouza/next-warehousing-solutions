import React, { useContext, useEffect, useRef, useState } from 'react';
import { IProduct } from '../../models/products';
import LoaderContext from '../../services/loader';
import ProductService from '../../services/products';
import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import { GridView } from '../grid-view/grid-view';
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

	const searchString = useRef<string>('');

	const loader = useContext(LoaderContext);

	const fetchProducts = () => {
		loader.showLoader();
		ProductService.getAllProducts()
			.then(
				(products) => {
					setProducts(products);
					setOriginalProductsList(products);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setProducts([]);
					setOriginalProductsList([]);
				}
			)
			.finally(() => {
				loader.hideLoader();
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
			<Toolbar
				onSearch={(str) => (str.length ? search(str) : search())}
			/>

			<div className={styles['button-list']}>
				<button
					className="btn-primary"
					onClick={() => {
						setActiveProduct(null);
						setShowDrawer(true);
					}}
				>
					Add Product
				</button>

				<button
					className="btn-primary"
					onClick={() => {
						fetchProducts();
					}}
				>
					Reload
				</button>
			</div>

			{failedToFetch && <FailedToFetch onRefetchClick={fetchProducts} />}

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
