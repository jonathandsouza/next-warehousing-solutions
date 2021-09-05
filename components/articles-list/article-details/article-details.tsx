import React, { FC, useRef, useState } from 'react';
import IArticle from '../../../models/articles';
import Drawer from 'rc-drawer';
import { Field, Form } from 'react-final-form';
import Image from 'next/image';

import ArticleService from '../../../services/articles';
import ToastService from '../../../services/toast';
import viewport from '../../../services/viewport';

import styles from '../../../styles/drawer.module.scss';
import { DrawerHeader } from '../../drawer/drawer-header/drawer-header';

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
			ToastService.promise(ArticleService.removeArticleById(article.id), {
				error: 'Failed to delete article 🤯',
				success: 'Article deleted successfully 👌',
				pending: 'Deleting article ⏳',
			})
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
				height={'100vh'}
				handler={false}
			>
				<div className={styles['drawer-container']}>
					<DrawerHeader
						onSave={() => submitFinalForm()}
						isLoading={isLoading}
						onDelete={() => deleteArticle()}
						showDeleteButton={!!article}
						onClose={() => onClose()}
					/>

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
