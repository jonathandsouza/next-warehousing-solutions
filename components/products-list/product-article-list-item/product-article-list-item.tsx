import { FC, useState } from 'react';
import { IProductArticle } from '../../../models/products';
import Image from 'next/image';

import styles from './product-article-list-item.module.scss';

const ProductArticleListItem: FC<{
	article: IProductArticle;
	onAmountRequiredChanged: (amt: number) => void;
	onRemove: (article: IProductArticle) => void;
}> = ({ article, onAmountRequiredChanged, onRemove }) => {
	const [amountRequired, setAmountRequired] = useState<number>(
		article.amountRequired
	);

	return (
		<>
			<div className={styles['article-item']} key={article.id}>
				<div className="name label-text">
					<span className={styles['article-title']}>name:</span>
					<span className={styles['article-value']}>
						{article.name}
					</span>
				</div>
				<div className="amountInStock label-text">
					<span className={styles['article-title']}>
						amountInStock:
					</span>
					<span className={styles['article-value']}>
						{article.amountInStock}
					</span>
				</div>
				<div className="amountRequired label-text">
					<div>
						<label className={styles['article-title']}>
							Amount required:
						</label>
						<input
							type="number"
							name="amountRequired"
							id="amountRequired"
							value={amountRequired}
							onChange={(e) => {
								const val = parseInt(e.target.value);
								if (
									article.amountInStock &&
									val > article.amountInStock
								) {
									return false;
								}
								setAmountRequired(val);
								onAmountRequiredChanged(val);
							}}
						/>
					</div>
				</div>

				<div
					className={styles.remove}
					onClick={() => onRemove(article)}
				>
					<Image
						className={styles.remove}
						src="/remove_circle_black.svg"
						alt=""
						width={30}
						height={30}
					/>
				</div>
			</div>
		</>
	);
};

export default ProductArticleListItem;
