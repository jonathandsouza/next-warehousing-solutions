import React, { useContext, useEffect, useRef, useState } from 'react';
import IArticle from '../../models/articles';
import ArticleService from '../../services/articles';
import ArticleDetails from './article-details/article-details';
import { GridPlaceholderCard, GridView } from '../grid-view/grid-view';
import { ArticleCard } from './article-card/article-card';

import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import ToastService from '../../services/toast';
import ActionButtonList from '../action-button-list/action-button-list';
import { SortAlphabetically } from '../../services/utilities';

const ArticlesList = () => {
	// region state
	const [articles, setArticles] = useState<Array<IArticle> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeArticle, setActiveArticle] = useState<IArticle | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// endregion

	// region code to fetch article details
	const fetchArticles = () => {
		setIsLoading(true);
		ToastService.promise<Array<IArticle>>(ArticleService.getAllArticles(), {
			error: 'Failed to fetch articles 🤯',
			pending: 'Fetching articles ⏳',
			success: 'Articles fetched successfully 👌',
		})
			.then(
				(articles) => {
					const sortedArticles = articles.sort(
						SortAlphabetically('name')
					);
					setArticles(sortedArticles);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setArticles([]);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};
	//endregion

	// region use effect
	useEffect(() => {
		fetchArticles();
	}, []);
	//endregion

	return (
		<>
			<ActionButtonList
				onAddClick={() => {
					setActiveArticle(null);
					setShowDrawer(true);
				}}
				disabled={isLoading}
				onReloadClick={() => {
					fetchArticles();
				}}
				addText="Add Article"
			/>

			{isLoading && (
				<>
					<GridView
						card={({ content }: { content: IArticle }) => (
							<GridPlaceholderCard />
						)}
						contents={Array.from(Array(10), () => ({}))}
					/>
				</>
			)}

			{!isLoading && failedToFetch && (
				<FailedToFetch onRefetchClick={fetchArticles} />
			)}

			{!isLoading && articles && articles.length > 0 && (
				<GridView
					card={({ content }: { content: IArticle }) => (
						<ArticleCard
							content={content}
							onSelect={(article) => {
								setActiveArticle(article);
								setShowDrawer(true);
							}}
						/>
					)}
					contents={articles || []}
				/>
			)}

			{showDrawer && (
				<div style={{ zIndex: 100 }}>
					<ArticleDetails
						article={activeArticle}
						onAdd={(article) => {
							{
								setArticles([...(articles || []), article]);
							}
						}}
						onUpdate={(article) => {
							{
								const articleList = (articles || []).filter(
									(a) => a.id !== article.id
								);

								articleList.push(article);
								setArticles(articleList);
							}
						}}
						onDelete={(article) => {
							{
								const articleList = (articles || []).filter(
									(a) => a.id !== article.id
								);

								setArticles(articleList);
							}
						}}
						onClose={() => {
							setActiveArticle(null);
							setShowDrawer(false);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default ArticlesList;
