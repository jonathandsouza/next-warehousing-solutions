import { FC } from 'react';
import ISale from '../../../models/sales';
import styles from '../../../styles/card.module.scss';

const SaleCard: FC<{
	content: ISale;
	onSelect: (article: ISale) => void;
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
				<h1>{content.amountSold}</h1>
				<p className={styles['title']}>
					CreatedOn:&nbsp;{content.createdAt}
				</p>
			</div>
		</div>
	);
};

export default SaleCard;
