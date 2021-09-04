import React, { useContext, useEffect, useRef, useState } from 'react';
import ISale from '../../models/sales';
import LoaderContext from '../../services/loader';
import SalesService from '../../services/sales';
import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import { GridView } from '../grid-view/grid-view';
import { Toolbar } from '../tool-bar/tool-bar.';
import SaleCard from './sale-card/sale-card';
import SaleDetails from './sale-details/sale-details';

import styles from './sales-list.module.scss';

const SalesList = () => {
	const [originalSaleList, setOriginalSaleList] =
		useState<Array<ISale> | null>(null);
	const [sales, setSale] = useState<Array<ISale> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeSale, setActiveSale] = useState<ISale | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);

	const searchString = useRef<string>('');

	const loader = useContext(LoaderContext);

	const fetchSale = () => {
		loader.showLoader();
		SalesService.getAllSales()
			.then(
				(sales) => {
					setSale(sales);
					setOriginalSaleList(sales);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setSale([]);
					setOriginalSaleList([]);
				}
			)
			.finally(() => {
				loader.hideLoader();
			});
	};

	useEffect(() => {
		fetchSale();
	}, []);

	const getFilteredSaleList = (list: Array<ISale> = []) => {
		return (
			list.filter(
				(sale) =>
					sale.id
						.toLowerCase()
						.indexOf(searchString.current.toLowerCase()) !== -1
			) || []
		);
	};

	const search = (str?: string) => {
		searchString.current = str ?? searchString.current;
		setSale(getFilteredSaleList(originalSaleList || []));
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
						setActiveSale(null);
						setShowDrawer(true);
					}}
				>
					Add Sale
				</button>

				<button
					className="btn-primary"
					onClick={() => {
						fetchSale();
					}}
				>
					Reload
				</button>
			</div>

			{failedToFetch && <FailedToFetch onRefetchClick={fetchSale} />}

			<GridView
				card={({ content }: { content: ISale }) => (
					<SaleCard
						content={content}
						onSelect={(sale) => {
							setActiveSale(sale);
							setShowDrawer(true);
						}}
					/>
				)}
				contents={sales || []}
			/>

			{showDrawer && (
				<div style={{ zIndex: 100 }}>
					<SaleDetails
						sale={activeSale}
						onAdd={(sale) => {
							{
								const newList = [
									...(originalSaleList || []),
									sale,
								];
								setOriginalSaleList(newList);
								setSale(getFilteredSaleList(newList));
							}
						}}
						onUpdate={(sale) => {
							{
								const saleList = (
									originalSaleList || []
								).filter((a) => a.id !== sale.id);

								saleList.push(sale);
								setOriginalSaleList(saleList);
								setSale(getFilteredSaleList(saleList));
							}
						}}
						onDelete={(sale) => {
							{
								const saleList = (
									originalSaleList || []
								).filter((a) => a.id !== sale.id);

								setOriginalSaleList(saleList);
								setSale(getFilteredSaleList(saleList));
							}
						}}
						onClose={() => {
							setActiveSale(null);
							setShowDrawer(false);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default SalesList;
