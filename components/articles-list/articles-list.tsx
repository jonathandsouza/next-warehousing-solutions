import React, { useContext, useEffect, useRef, useState } from 'react';
import IArticle from '../../models/articles';
import ArticleService from '../../services/articles';
import LoaderContext from '../../services/loader';
import ArticleDetails from './article-details/article-details';
import { GridPlaceholderCard, GridView } from '../grid-view/grid-view';
import { Toolbar } from '../tool-bar/tool-bar.';
import { ArticleCard } from './article-card/article-card';

import styles from './articles-list.module.scss';
import { FailedToFetch } from '../failed-to-fetch/failed-to-fetch';
import ToastService from '../../services/toast';

const ArticlesList = () => {
	const [originalArticlesList, setOriginalArticlesList] =
		useState<Array<IArticle> | null>(null);
	const [articles, setArticles] = useState<Array<IArticle> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeArticle, setActiveArticle] = useState<IArticle | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const searchString = useRef<string>('');

	const fetchArticles = () => {
		setIsLoading(true);
		ToastService.promise<Array<IArticle>>(ArticleService.getAllArticles(), {
			error: 'Failed to fetch articles 🤯',
			pending: 'Fetching articles ⏳',
			success: 'Articles fetched successfully 👌',
		})
			.then(
				(articles) => {
					setArticles(articles);
					setOriginalArticlesList(articles);
					setFailedToFetch(false);
				},
				() => {
					setFailedToFetch(true);
					setArticles([]);
					setOriginalArticlesList([]);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	const getFilteredArticleList = (list: Array<IArticle> = []) => {
		return (
			list.filter(
				(article) =>
					article.name
						.toLowerCase()
						.indexOf(searchString.current.toLowerCase()) !== -1 ||
					article.id
						.toLowerCase()
						.indexOf(searchString.current.toLowerCase()) !== -1
			) || []
		);
	};

	const search = (str?: string) => {
		searchString.current = str ?? searchString.current;
		setArticles(getFilteredArticleList(originalArticlesList || []));
	};

	return (
		<>
			{/* <Toolbar onSearch={search} /> */}

			<div className={styles['button-list']}>
				<button
					className="btn-primary"
					onClick={() => {
						setActiveArticle(null);
						setShowDrawer(true);
					}}
					disabled={isLoading}
				>
					Add Article
				</button>

				<button
					className="btn-primary"
					onClick={() => {
						fetchArticles();
					}}
					disabled={isLoading}
				>
					Reload
				</button>
			</div>

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

			{failedToFetch && <FailedToFetch onRefetchClick={fetchArticles} />}

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
								const newList = [
									...(originalArticlesList || []),
									article,
								];
								setOriginalArticlesList(newList);
								setArticles(getFilteredArticleList(newList));
							}
						}}
						onUpdate={(article) => {
							{
								const articleList = (
									originalArticlesList || []
								).filter((a) => a.id !== article.id);

								articleList.push(article);
								setOriginalArticlesList(articleList);
								setArticles(
									getFilteredArticleList(articleList)
								);
							}
						}}
						onDelete={(article) => {
							{
								const articleList = (
									originalArticlesList || []
								).filter((a) => a.id !== article.id);

								setOriginalArticlesList(articleList);
								setArticles(
									getFilteredArticleList(articleList)
								);
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
