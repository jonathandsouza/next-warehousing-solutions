import { FC } from 'react'
import IArticle from '../../../models/articles'
import styles from './article-card.module.scss'

export const ArticleCard: FC<{
	content: IArticle
	onSelect: (article: IArticle) => void
}> = ({ content, onSelect }) => {
	return (
		<>
			<div className={styles['wrapper']}>
				<div className={styles['overviewInfo']}>
					<div className={styles['productinfo']}>
						<div className={styles['grouptext']}>
							<h3>ID#</h3>
							<p>{content.id}</p>
						</div>
					</div>
				</div>

				<div className={styles['productSpecifications']}>
					<h1>{content.name}</h1>
					<p className={styles['title']}>Amount In stock</p>
					<p>{content.amountInStock}</p>
				</div>

				<button
					onClick={() => {
						onSelect(content)
					}}
				>
					edit
				</button>
			</div>
		</>
	)
}
