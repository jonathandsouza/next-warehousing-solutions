import React, { useContext, useEffect, useState } from 'react'
import IArticle from '../../models/articles'
import ArticleService from '../../services/articles'
import LoaderContext from '../../services/loader'
import ArticleDetails from '../article-details/article-details'
import { GridView } from '../grid-view/grid-view'
import { Toolbar } from '../tool-bar/tool-bar.'
import { ArticleCard } from './article-card/article-card'

const ArticlesList = () => {
	const [originalArticlesList, setOriginalArticlesList] =
		useState<Array<IArticle> | null>(null)
	const [articles, setArticles] = useState<Array<IArticle> | null>(null)
	const [showDrawer, setShowDrawer] = useState<boolean>(false)
	const [activeArticle, setActiveArticle] = useState<IArticle | null>(null)
	const [failedToFetch, setFailedToFetch] = useState(false)

	const loader = useContext(LoaderContext)

	const fetchArticles = () => {
		loader.showLoader()
		ArticleService.getAllArticles().then(
			(articles) => {
				setArticles(articles)
				setOriginalArticlesList(articles)
				loader.hideLoader()
			},
			() => {
				setFailedToFetch(true)
			}
		)
	}

	useEffect(() => {
		fetchArticles()
	}, [])

	const search = (str: string) => {
		setArticles(
			originalArticlesList?.filter(
				(article) =>
					article.name.indexOf(str) !== -1 ||
					article.id.indexOf(str) !== -1
			) || []
		)
	}

	if (!articles) return null

	return (
		<>
			<Toolbar onSearch={search} />

			<button
				onClick={() => {
					setActiveArticle(null)
					setShowDrawer(true)
				}}
			>
				Add Article
			</button>

			<button
				onClick={() => {
					fetchArticles()
				}}
			>
				Reload
			</button>

			<GridView
				card={({ content }: { content: IArticle }) => (
					<ArticleCard
						content={content}
						onSelect={(article) => {
							setActiveArticle(article)
							setShowDrawer(true)
						}}
					/>
				)}
				contents={articles}
			/>

			{showDrawer && (
				<div style={{ zIndex: 100 }}>
					<ArticleDetails
						article={activeArticle}
						onClose={() => {
							setActiveArticle(null)
							setShowDrawer(false)
						}}
					/>
				</div>
			)}

			{failedToFetch && (
				<div>
					<p>Failed to fetch articles</p>
					<button onClick={() => fetchArticles()}>
						fetch again!
					</button>
				</div>
			)}
		</>
	)
}

export default ArticlesList
