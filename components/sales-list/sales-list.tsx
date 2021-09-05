import React, { useEffect, useRef, useState } from 'react';
import ISale from '../../models/sales';
import SalesService from '../../services/sales';
import ToastService from '../../services/toast';
import ActionButtonList from '../action-button-list/action-button-list';
import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import { GridPlaceholderCard, GridView } from '../grid-view/grid-view';
import SaleCard from './sale-card/sale-card';
import SaleDetails from './sale-details/sale-details';

const SalesList = () => {
	const [sales, setSale] = useState<Array<ISale> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeSale, setActiveSale] = useState<ISale | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchSale = () => {
		setIsLoading(true);

		ToastService.promise<Array<ISale>>(SalesService.getAllSales(), {
			error: 'Failed to fetch sales 🤯',
			pending: 'Fetching sales ⏳',
			success: 'Sales fetched successfully 👌',
		})

			.then(
				(sales) => {
					setSale(sales);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setSale([]);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchSale();
	}, []);

	return (
		<>
			<ActionButtonList
				onAddClick={() => {
					setActiveSale(null);
					setShowDrawer(true);
				}}
				disabled={isLoading}
				onReloadClick={() => {
					fetchSale();
				}}
				addText="Add Sale"
			/>

			{isLoading && (
				<>
					<GridView
						card={({ content }: { content: ISale }) => (
							<GridPlaceholderCard />
						)}
						contents={Array.from(Array(10), () => ({}))}
					/>
				</>
			)}

			{!isLoading && failedToFetch && (
				<FailedToFetch onRefetchClick={fetchSale} />
			)}

			{!isLoading && sales && sales.length > 0 && (
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
			)}

			{showDrawer && (
				<div style={{ zIndex: 100 }}>
					<SaleDetails
						sale={activeSale}
						onAdd={(sale) => {
							{
								setSale([...(sales || []), sale]);
							}
						}}
						onUpdate={(sale) => {
							{
								const saleList = (sales || []).filter(
									(a) => a.id !== sale.id
								);

								saleList.push(sale);
								setSale(saleList);
							}
						}}
						onDelete={(sale) => {
							{
								const saleList = (sales || []).filter(
									(a) => a.id !== sale.id
								);

								setSale(saleList);
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
