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

	const loader = useContext(LoaderContext)

	useEffect(() => {
		loader.showLoader()
		ArticleService.getAllArticles().then((articles) => {
			setArticles(articles)
			setOriginalArticlesList(articles)
			loader.hideLoader()
		})
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
				<ArticleDetails
					article={activeArticle}
					onClose={() => {
						setActiveArticle(null)
						setShowDrawer(false)
					}}
				/>
			)}
		</>
	)
}

export default ArticlesList
