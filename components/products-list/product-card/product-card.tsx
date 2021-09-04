import { FC } from 'react';
import { IProduct } from '../../../models/products';
import styles from '../../../styles/card.module.scss';

export const ProductCard: FC<{
	content: IProduct;
	onSelect: (article: IProduct) => void;
}> = ({ content, onSelect }) => {
	return (
		<div
			className={styles['wrapper']}
			onClick={() => {
				onSelect(content);
			}}
		>
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
		</div>
	);
};
