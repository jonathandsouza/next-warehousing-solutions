import Drawer from 'rc-drawer';
import React, { FC, useEffect, useState } from 'react';
import IArticle from '../../../models/articles';
import { IProductArticle } from '../../../models/products';
import ArticleService from '../../../services/articles';
import ToastService from '../../../services/toast';
import viewport from '../../../services/viewport';
import { DrawerHeader } from '../../drawer/drawer-header/drawer-header';
import { FailedToFetch } from '../../failed-to-fetch/failed-to-fetch';

import styles from './all-article-list.module.scss';

export const AllArticleList: FC<{
	addToProductArticles: (articleList: Array<IArticle>) => void;
	filterArticlesByIds?: Array<string>;
}> = ({ addToProductArticles, filterArticlesByIds = [] }) => {
	// region state
	const { isMobile } = viewport.getViewport();
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(true);
	const [articles, setArticles] = useState<Array<IArticle>>([]);
	const [failedToFetchProductArticles, setFailedToFetchProductArticles] =
		useState<boolean>(false);
	const [checkList, setCheckList] = useState<{ [key: string]: boolean }>({});
	// endregion

	// region fetch all articles list
	const fetchAllArticlesList = () => {
		setIsLoading(true);
		setFailedToFetchProductArticles(false);

		ToastService.promise<Array<IArticle>>(ArticleService.getAllArticles(), {
			pending: 'Fetching articles ⏳',
			error: 'Failed to fetch articles 🤯',
			success: 'Fetched articles 👌',
		})
			.then(
				(articles) => {
					setArticles(
						articles.filter(
							(e) => filterArticlesByIds.indexOf(e.id) === -1
						)
					);
				},
				() => {
					setFailedToFetchProductArticles(true);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};
	// endregion

	// region use state
	useEffect(() => {
		fetchAllArticlesList();
		// eslint-disable-next-line
	}, []);
	//endregion

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
						addToProductArticles(
							articles.filter((article) => checkList[article.id])
						);
					}}
					showDeleteButton={false}
					disableSaveButton={Object.keys(checkList).length === 0}
				/>

				{articles && articles.length > 0 && (
					<table className={styles['table-container']}>
						<thead>
							<th></th>
							<th>ID</th>
							<th>Name</th>
							<th>Amount in stock</th>
						</thead>
						<tbody>
							{articles.map((article) => {
								return (
									<tr key={article.id}>
										<td className="checkbox-container">
											<input
												checked={
													!!checkList[article.id]
												}
												type="checkbox"
												name="article"
												id="article"
												onChange={(e) => {
													setCheckList({
														...checkList,
														...{
															[article.id]:
																e.target
																	.checked,
														},
													});
												}}
											/>
										</td>
										<td>{article.id}</td>
										<td>{article.name}</td>
										<td>{article.amountInStock}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}

				{failedToFetchProductArticles && (
					<FailedToFetch
						onRefetchClick={() => fetchAllArticlesList()}
					/>
				)}
			</>
		</Drawer>
	);
};
