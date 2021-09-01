import React, { useContext, useEffect, useState } from 'react'
import IArticle from '../../models/articles'
import ArticleService from '../../services/articles'
import LoaderContext from '../../services/loader'
import { GridView } from '../grid-view/grid-view'
import { ArticleCard } from './article-card/article-card'

const ArticlesList = () => {
	const [articles, setArticles] = useState<Array<IArticle> | null>(null)

	const loader = useContext(LoaderContext)

	useEffect(() => {
		loader.showLoader()
		ArticleService.getAllArticles().then((articles) => {
			setArticles(articles)
			loader.hideLoader()
		})
	}, [])

	if (!articles) return null

	return (
		<>
			<GridView
				card={({ content }: { content: IArticle }) => (
					<ArticleCard content={content} />
				)}
				contents={articles}
			/>
		</>
	)
}

export default ArticlesList
