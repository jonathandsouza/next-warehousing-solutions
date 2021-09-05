import Drawer from 'rc-drawer';
import React, { FC, useEffect, useState } from 'react';
import { ISaleProduct } from '../../../models/sales';
import ProductService from '../../../services/products';
import ToastService from '../../../services/toast';
import viewport from '../../../services/viewport';
import { DrawerHeader } from '../../drawer/drawer-header/drawer-header';
import { FailedToFetch } from '../../failed-to-fetch/failed-to-fetch';

import styles from './all-products-list.module.scss';

export const AllProductList: FC<{
	addToSaleProducts: (articleList: ISaleProduct) => void;
	filterProductsByIds: Array<string>;
}> = ({ addToSaleProducts, filterProductsByIds = [] }) => {
	const { isMobile } = viewport.getViewport();

	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(true);
	const [products, setProducts] = useState<Array<ISaleProduct>>([]);
	const [failedToFetchSaleProducts, setFailedToFetchSaleProducts] =
		useState<boolean>(false);
	const [checkList, setCheckList] = useState<{ [key: string]: boolean }>({});

	const fetchAllProductsList = () => {
		setIsLoading(true);
		setFailedToFetchSaleProducts(false);

		ToastService.promise<Array<ISaleProduct>>(
			ProductService.getAllProducts(),
			{
				pending: 'Fetching products ⏳',
				error: 'Failed to fetch products 🤯',
				success: 'Fetched products 👌',
			}
		)
			.then(
				(products) => {
					setProducts(
						products.filter(
							(e) => filterProductsByIds.indexOf(e.id) === -1
						)
					);
				},
				() => {
					setFailedToFetchSaleProducts(true);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchAllProductsList();
		// eslint-disable-next-line
	}, []);

	return (
		<Drawer
			handler={false}
			open={isOpen}
			onClose={() => {}}
			className="drawer2"
			level=".drawer1"
			placement="right"
			levelMove={100}
			width={isMobile ? '100vw' : '70vw'}
			height={'100vh'}
		>
			<>
				<DrawerHeader
					isLoading={isLoading}
					onClose={() => setIsOpen(false)}
					onDelete={() => {}}
					onSave={() => {
						const product = products.find(
							(product) => checkList[product.id]
						);
						product && addToSaleProducts(product);
					}}
					showDeleteButton={false}
					disableSaveButton={Object.keys(checkList).length === 0}
				/>

				{products && products.length > 0 && (
					<table className={styles['table-container']}>
						<thead>
							<th></th>
							<th>ID</th>
							<th>Name</th>
						</thead>
						<tbody>
							{products.map((product) => {
								return (
									<tr key={product.id}>
										<td className="checkbox-container">
											<input
												checked={
													!!checkList[product.id]
												}
												type="radio"
												name="product"
												id={'article' + product.id}
												onChange={(e) => {
													setCheckList({
														...checkList,
														...{
															[product.id]:
																e.target
																	.checked,
														},
													});
												}}
											/>
										</td>
										<td>{product.id}</td>
										<td>{product.name}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}

				{failedToFetchSaleProducts && (
					<FailedToFetch
						onRefetchClick={() => fetchAllProductsList()}
					/>
				)}
			</>
		</Drawer>
	);
};
