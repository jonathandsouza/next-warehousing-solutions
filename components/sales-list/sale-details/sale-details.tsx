import React, { FC, useEffect, useRef, useState } from 'react';
import Drawer from 'rc-drawer';
import { Field, Form } from 'react-final-form';
import Image from 'next/image';

import ToastService from '../../../services/toast';
import viewport from '../../../services/viewport';

import styles from './sale-details.module.scss';
import ProductService from '../../../services/products';
import { FailedToFetch } from '../../failed-to-fetch/failed-to-fetch';
import { DrawerHeader } from '../../drawer/drawer-header/drawer-header';
import ISale, { ISaleProduct } from '../../../models/sales';
import SalesService from '../../../services/sales';
import { IProduct } from '../../../models/products';
import SaleProductListItem from '../sale-product-list-item/sale-product-list-item';
import { AllProductList } from '../all-products-list/all-products-list';

const SaleDetails: FC<{
	sale: ISale | null;
	onClose: () => void;
	onAdd: (sale: ISale) => void;
	onUpdate: (sale: ISale) => void;
	onDelete: (sale: ISale) => void;
}> = ({ sale, onClose, onAdd, onDelete, onUpdate }) => {
	// region state
	const [isOpen, setIsOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [linkedProduct, setLinkedProduct] = useState<ISaleProduct | null>(
		null
	);
	const [productsAreLoading, setProductsAreLoading] =
		useState<boolean>(false);
	const [failedToFetchSaleProducts, setFailedToFetchSaleProducts] =
		useState<boolean>(false);

	const [showAllProductsDrawer, setShowAllProductsDrawer] = useState(false);

	// endregion

	// region Add Sale
	const AddSale = () => {
		if (linkedProduct && linkedProduct.amountSold === 0) {
			ToastService.error(<h1>error now</h1>);
			return;
		}

		setIsLoading(true);

		if (linkedProduct) {
			ToastService.promise<ISale>(
				SalesService.createSale({
					id: linkedProduct.id,
					amountSold: linkedProduct.amountSold,
				})
			)
				.then((sale) => {
					onAdd(sale);
					onClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};
	// endregion

	// region Update Sale
	const updateSale = () => {
		setIsLoading(true);
		if (sale && linkedProduct) {
			ToastService.promise(
				SalesService.updateSale({
					id: sale.id,
					product: linkedProduct,
					createdAt: new Date(),
				}),
				{
					pending: 'Updating sale ⏳',
					error: 'Failed to update sale 🤯',
					success: 'Save successful 👌',
				}
			).then(
				() => {
					setIsLoading(false);
					setTimeout(() => {
						onUpdate({
							...sale,
							...{
								product: linkedProduct,
							},
						});
						onClose();
					});
					return Promise.resolve();
				},
				() => {
					setIsLoading(false);
					return Promise.reject();
				}
			);
		}
	};
	// endregion

	// region Delete Sale
	const deleteSale = () => {
		if (sale) {
			setIsLoading(true);
			ToastService.promise(SalesService.deleteSale(sale.id))
				.then(() => {
					onDelete(sale);
					onClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};
	// endregion

	// region update Product amount required
	const updatedAmountSold: (value: number) => void = (value) => {
		if (linkedProduct) {
			linkedProduct.amountSold = value;
		}
	};
	//endregion

	// region submit form
	const onSubmit = () => {
		if (sale) {
			updateSale();
		} else {
			AddSale();
		}
	};

	const submitFinalForm = () => {
		const forms = document.getElementsByClassName('sale-form');
		for (const form of forms) {
			form.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true })
			);
		}
	};
	//endregion

	//region fetch sale article list
	const fetchSaleProductsList = () => {
		if (sale && !productsAreLoading) {
			setProductsAreLoading(true);
			setIsLoading(true);
			setFailedToFetchSaleProducts(false);

			ToastService.promise<IProduct>(
				ProductService.getProductById(sale.product.id),
				{
					pending: 'Fetching article list ⏳',
					error: 'Failed to fetch article list 🤯',
					success: 'Products fetched successfully 👌',
				}
			)
				.then(
					(product) => {
						setLinkedProduct({ ...sale.product, ...product });
						setFailedToFetchSaleProducts(false);
					},
					() => {
						setFailedToFetchSaleProducts(true);
					}
				)
				.finally(() => {
					setProductsAreLoading(false);
					setIsLoading(false);
				});
		}
	};
	// endregion

	useEffect(() => {
		fetchSaleProductsList();
		// eslint-disable-next-line
	}, []);

	const { isMobile } = viewport.getViewport();

	return (
		<Drawer
			open={isOpen}
			level={null}
			placement={isMobile ? 'bottom' : 'right'}
			onClose={() => {
				setIsOpen(false);
				onClose();
			}}
			width={isMobile ? '100vw' : '70vw'}
			height={isMobile ? '90vh' : '100vh'}
			handler={false}
			className="drawer1"
		>
			<>
				<DrawerHeader
					onSave={() => onSubmit()}
					isLoading={isLoading}
					onDelete={() => deleteSale()}
					showDeleteButton={!!sale}
					onClose={() => onClose()}
					disableSaveButton={!linkedProduct}
				/>

				{sale && (
					<div
						className={styles['products-list'] + ' form-container'}
					>
						<div className="form-title">Sale Details</div>

						<div className="name label-text">
							<span className={styles['product-title']}>
								id:&nbsp;
							</span>
							<span className={styles['product-value']}>
								{sale.id}
							</span>
						</div>

						<div className="name label-text">
							<span className={styles['product-title']}>
								Created on:&nbsp;
							</span>
							<span className={styles['product-value']}>
								{sale.createdAt.toDateString()}
							</span>
						</div>
					</div>
				)}

				<div className={styles['products-list'] + ' form-container'}>
					<div className="form-title">
						Products list
						{!sale && (
							<div
								className={styles.add}
								onClick={() => setShowAllProductsDrawer(true)}
							>
								<Image
									className={styles.remove}
									src="/add.svg"
									alt=""
									width={30}
									height={30}
								/>
							</div>
						)}
					</div>

					{linkedProduct && (
						<SaleProductListItem
							amountSold={sale ? sale.product.amountSold : 0}
							product={linkedProduct}
							onAmountSoldChanged={(amount) =>
								updatedAmountSold(amount)
							}
							onRemove={(product) => {}}
							showRemoveIcon={false}
						/>
					)}
				</div>

				{failedToFetchSaleProducts && (
					<FailedToFetch
						onRefetchClick={() => fetchSaleProductsList()}
					/>
				)}

				{showAllProductsDrawer && (
					<AllProductList
						filterProductsByIds={[]}
						addToSaleProducts={(product) => {
							setLinkedProduct(product);
							setShowAllProductsDrawer(false);
						}}
					/>
				)}
			</>
		</Drawer>
	);
};

export default SaleDetails;
