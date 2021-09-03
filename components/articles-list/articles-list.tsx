import React, { useContext, useEffect, useRef, useState } from 'react';
import IArticle from '../../models/articles';
import ArticleService from '../../services/articles';
import LoaderContext from '../../services/loader';
import ArticleDetails from '../article-details/article-details';
import { GridView } from '../grid-view/grid-view';
import { Toolbar } from '../tool-bar/tool-bar.';
import { ArticleCard } from './article-card/article-card';

import styles from './articles-list.module.scss';

const ArticlesList = () => {
	const [originalArticlesList, setOriginalArticlesList] =
		useState<Array<IArticle> | null>(null);
	const [articles, setArticles] = useState<Array<IArticle> | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [activeArticle, setActiveArticle] = useState<IArticle | null>(null);
	const [failedToFetch, setFailedToFetch] = useState(false);

	const searchString = useRef<string>('');

	const loader = useContext(LoaderContext);

	const fetchArticles = () => {
		loader.showLoader();
		ArticleService.getAllArticles()
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
				loader.hideLoader();
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
			<Toolbar onSearch={search} />

			<div className={styles['button-list']}>
				<button
					className="btn-primary"
					onClick={() => {
						setActiveArticle(null);
						setShowDrawer(true);
					}}
				>
					Add Article
				</button>

				<button
					className="btn-primary"
					onClick={() => {
						fetchArticles();
					}}
				>
					Reload
				</button>
			</div>

			{failedToFetch && (
				<div className={styles['failed-to-fetch-warning']}>
					<span>Failed to fetch articles</span>
					<button
						className={styles['fetch-btn']}
						onClick={() => fetchArticles()}
					>
						fetch again!
					</button>
				</div>
			)}

			{articles && articles.length > 0 && (
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
