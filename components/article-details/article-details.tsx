import React, { FC, useRef, useState } from 'react';
import IArticle from '../../models/articles';
import Drawer from 'rc-drawer';
import { Field, Form } from 'react-final-form';
import Image from 'next/image';

import styles from './article-details.module.scss';
import ArticleService from '../../services/articles';
import ToastService from '../../services/toast';

const ArticleDetails: FC<{
	article: IArticle | null;
	onClose: () => void;
	onAdd: (article: IArticle) => void;
	onUpdate: (article: IArticle) => void;
	onDelete: (article: IArticle) => void;
}> = ({ article, onClose, onAdd, onDelete, onUpdate }) => {
	// region state
	const [isOpen, setIsOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	// endregion

	// region Add Article
	const AddArticle = (value: any) => {
		setIsLoading(true);

		ToastService.promise<IArticle>(
			ArticleService.createArticle({
				name: value.name,
				amountInStock: parseInt(value.amountInStock),
			})
		)
			.then((article) => {
				onAdd({
					id: article.id,
					name: value.name,
					amountInStock: parseInt(value.amountInStock),
				});
				onClose();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	// endregion

	// region Update Article
	const updateArticle = (value: any) => {
		setIsLoading(true);

		if (article) {
			ToastService.promise(
				ArticleService.updateArticles([
					{
						id: article.id,
						name: value.name,
						amountInStock: parseInt(value.amountInStock),
					},
				]).then(
					() => {
						setIsLoading(false);
						setTimeout(() => {
							onUpdate({
								...article,
								...{
									name: value.name,
									amountInStock: parseInt(
										value.amountInStock
									),
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
				)
			);
		}
	};
	// endregion

	// region Delete Article
	const deleteArticle = () => {
		if (article) {
			setIsLoading(true);
			ToastService.promise(ArticleService.removeArticleById(article.id))
				.then(() => {
					onDelete(article);
					onClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};
	// endregion

	// region submit form
	const onSubmit = (value: { name: string; amountInStock: string }) => {
		if (article) {
			updateArticle(value);
		} else {
			AddArticle(value);
		}
	};

	const submitFinalForm = () => {
		const forms = document.getElementsByClassName('article-form');
		for (const form of forms) {
			form.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true })
			);
		}
	};
	//endregion

	return (
		<>
			<Drawer
				open={isOpen}
				level={null}
				placement={'right'}
				onClose={() => {
					setIsOpen(false);
					onClose();
				}}
				width={'70vw'}
				handler={false}
			>
				<div className={styles['drawer-container']}>
					<div className={styles['drawer-header']}>
						<div className={styles['close']} onClick={onClose}>
							<Image
								src="/cross.svg"
								alt=""
								width={30}
								height={30}
							/>
						</div>

						<div className={styles['drawer-title']}></div>

						{!article && (
							<button
								className={
									styles['drawer-btn'] +
									' ' +
									styles['drawer-save-button'] +
									' btn-primary'
								}
								onClick={submitFinalForm}
								disabled={isLoading}
							>
								{isLoading && (
									<Image
										src="/rings.svg"
										alt=""
										width={40}
										height={40}
									/>
								)}
								{!isLoading && 'Save'}
							</button>
						)}

						{article && (
							<button
								className={
									styles['drawer-btn'] +
									' ' +
									styles['drawer-delete-button'] +
									' btn-primary'
								}
								onClick={deleteArticle}
								disabled={isLoading}
							>
								{isLoading && (
									<Image
										src="/rings.svg"
										alt=""
										width={40}
										height={40}
									/>
								)}
								{!isLoading && 'Delete'}
							</button>
						)}
					</div>

					<Form
						onSubmit={onSubmit}
						initialValues={{
							name: article?.name,
							amountInStock: article?.amountInStock,
						}}
						render={({ handleSubmit }) => (
							<form
								onSubmit={handleSubmit}
								className="article-form"
							>
								<div className="form-title">Article</div>
								<div>
									<label>Name</label>
									<Field
										name="name"
										type="text"
										component="input"
										placeholder="Name"
									/>
								</div>

								<div>
									<label>Amount in stock</label>
									<Field
										name="amountInStock"
										component="input"
										type="number"
										placeholder="Amount in stock"
									/>
								</div>
							</form>
						)}
					/>
				</div>
			</Drawer>
		</>
	);
};

export default ArticleDetails;
