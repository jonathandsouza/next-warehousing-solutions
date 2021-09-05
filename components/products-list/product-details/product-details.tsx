import React, { FC, useEffect, useRef, useState } from 'react';
import Drawer from 'rc-drawer';
import { Field, Form } from 'react-final-form';
import Image from 'next/image';

import ProductService from '../../../services/products';
import ToastService from '../../../services/toast';
import viewport from '../../../services/viewport';
import { IProduct, IProductArticle } from '../../../models/products';

import DrawerStyles from '../../../styles/drawer.module.scss';
import styles from './product-details.module.scss';
import ArticleService from '../../../services/articles';
import IArticle from '../../../models/articles';
import { FailedToFetch } from '../../failed-to-fetch/failed-to-fetch';
import ProductArticleListItem from '../product-article-list-item/product-article-list-item';
import { AllArticleList } from '../all-article-list/all-article-list';
import { DrawerHeader } from '../../drawer/drawer-header/drawer-header';

const ProductDetails: FC<{
	product: IProduct | null;
	onClose: () => void;
	onAdd: (product: IProduct) => void;
	onUpdate: (product: IProduct) => void;
	onDelete: (product: IProduct) => void;
}> = ({ product, onClose, onAdd, onDelete, onUpdate }) => {
	// region state
	const [isOpen, setIsOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [linkedArticles, setLinkedArticles] = useState<
		Array<IProductArticle>
	>([]);
	const [articlesAreLoading, setArticlesAreLoading] =
		useState<boolean>(false);
	const [failedToFetchProductArticles, setFailedToFetchProductArticles] =
		useState<boolean>(false);

	const [showAllArticlesDrawer, setShowAllArticlesDrawer] = useState(false);
	// endregion

	// region Add Product
	const AddProduct = (value: any) => {
		setIsLoading(true);
		ToastService.promise<IProduct>(
			ProductService.createProduct({
				name: value.name,
				articles: linkedArticles,
			})
		)
			.then((product) => {
				onAdd({
					id: product.id,
					name: value.name,
					articles: linkedArticles,
				});
				onClose();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	// endregion

	// region Update Product
	const updateProduct = (value: any) => {
		setIsLoading(true);
		if (product) {
			ToastService.promise(
				ProductService.updateProduct({
					id: product.id,
					name: value.name,
					articles: linkedArticles,
				}),
				{
					pending: 'Updating product ⏳',
					error: 'Failed to update product 🤯',
					success: 'Save successful 👌',
				}
			).then(
				() => {
					setIsLoading(false);
					setTimeout(() => {
						onUpdate({
							...product,
							...{
								name: value.name,
								articles: linkedArticles,
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

	// region Delete Product
	const deleteProduct = () => {
		if (product) {
			setIsLoading(true);
			ToastService.promise(ProductService.removeProductById(product.id))
				.then(() => {
					onDelete(product);
					onClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};
	// endregion

	// region update Article amount required
	const updateAmountRequired: (index: number, value: number) => void = (
		index,
		value
	) => {
		linkedArticles[index].amountRequired = value;
		setLinkedArticles(linkedArticles);
	};
	//endregion

	// region remove article from Product
	const removeArticleFromProduct: (article: IProductArticle) => void = (
		article
	) => {
		setLinkedArticles(linkedArticles.filter((a) => a.id !== article.id));
	};

	// endregion

	// region submit form
	const onSubmit = (value: { name: string; amountInStock: string }) => {
		if (product) {
			updateProduct(value);
		} else {
			AddProduct(value);
		}
	};

	const submitFinalForm = () => {
		const forms = document.getElementsByClassName('product-form');
		for (const form of forms) {
			form.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true })
			);
		}
	};
	//endregion

	//region fetch product article list
	const fetchProductArticlesList = () => {
		if (product && !articlesAreLoading) {
			setArticlesAreLoading(true);
			setIsLoading(true);
			setFailedToFetchProductArticles(false);
			ToastService.promise<Array<IArticle>>(
				ArticleService.getArticleByIds(
					product?.articles.map((e) => e.id)
				),
				{
					pending: 'Fetching article list ⏳',
					error: 'Failed to fetch article list 🤯',
					success: 'Articles fetched successfully 👌',
				}
			)
				.then(
					(articles) => {
						setLinkedArticles(
							articles.map((article, index) => {
								return {
									...product.articles[index],
									...article,
								};
							})
						);

						setFailedToFetchProductArticles(false);
					},
					() => {
						setFailedToFetchProductArticles(true);
					}
				)
				.finally(() => {
					setArticlesAreLoading(false);
					setIsLoading(false);
				});
		}
	};
	// endregion

	useEffect(() => {
		fetchProductArticlesList();
		// eslint-disable-next-line
	}, []);

	const { isMobile } = viewport.getViewport();

	return (
		<>
			<Drawer
				open={isOpen}
				level={null}
				placement={isMobile ? 'bottom' : 'right'}
				onClose={() => {
					setIsOpen(false);
					onClose();
				}}
				width={isMobile ? '100vw' : '70vw'}
				height={isMobile ? '95vh' : '100vh'}
				handler={false}
				className="drawer1"
			>
				<>
					<div className={DrawerStyles['drawer-container']}>
						<DrawerHeader
							onSave={() => submitFinalForm()}
							isLoading={isLoading}
							onDelete={() => deleteProduct()}
							showDeleteButton={!!product}
							onClose={() => onClose()}
						/>

						<Form
							onSubmit={onSubmit}
							initialValues={{
								name: product?.name,
							}}
							render={({ handleSubmit }) => (
								<form
									onSubmit={handleSubmit}
									className="product-form"
								>
									<div className="form-title">Product</div>
									<div>
										<label>Name</label>
										<Field
											name="name"
											type="text"
											component="input"
											placeholder="Name"
										/>
									</div>
								</form>
							)}
						/>

						<div
							className={
								styles['articles-list'] + ' form-container'
							}
						>
							<div className="form-title">
								Articles list
								<div
									className={styles.add}
									onClick={() =>
										setShowAllArticlesDrawer(true)
									}
								>
									<Image
										className={styles.remove}
										src="/add.svg"
										alt=""
										width={30}
										height={30}
									/>
								</div>
							</div>

							{linkedArticles.map((article, index) => (
								<ProductArticleListItem
									article={article}
									key={article.id}
									onAmountRequiredChanged={(amount) =>
										updateAmountRequired(index, amount)
									}
									onRemove={(article) =>
										removeArticleFromProduct(article)
									}
								/>
							))}
						</div>

						{failedToFetchProductArticles && (
							<FailedToFetch
								onRefetchClick={() =>
									fetchProductArticlesList()
								}
							/>
						)}
					</div>

					{showAllArticlesDrawer && (
						<AllArticleList
							filterArticlesByIds={linkedArticles.map(
								(e) => e.id
							)}
							addToProductArticles={(articles) => {
								setLinkedArticles([
									...linkedArticles,
									...articles.map((e) => ({
										...e,
										...{
											amountRequired: 1,
										},
									})),
								]);

								setShowAllArticlesDrawer(false);
							}}
						/>
					)}
				</>
			</Drawer>
		</>
	);
};

export default ProductDetails;
