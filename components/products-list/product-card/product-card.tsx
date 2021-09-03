import { FC } from 'react'
import IArticle from '../../../models/articles'
import { IProduct } from '../../../models/products'
import styles from './product-card.module.scss'
import Image from 'next/image'

export const ProductCard: FC<{ content: IProduct }> = ({ content }) => {
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
					<p className={styles['title']}>
						Articles:&nbsp;{content.articles.length}
					</p>
				</div>

				{/* <div>
					Edit{' '}
					<Image
						src="/arrow.svg"
						width={20}
						height={10}
						alt="arrow"
					/>
				</div> */}
			</div>
		</>
	)
}
