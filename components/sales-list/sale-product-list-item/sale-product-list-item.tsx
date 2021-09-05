import { FC, useState } from 'react';
import Image from 'next/image';

import styles from './sale-product-list-item.module.scss';
import { IProduct } from '../../../models/products';
import { ISaleProduct } from '../../../models/sales';

const SaleProductListItem: FC<{
	amountSold: number;
	product: ISaleProduct;
	onAmountSoldChanged: (amt: number) => void;
	onRemove: (product: IProduct) => void;
	showRemoveIcon?: boolean;
}> = ({
	product,
	amountSold,
	onAmountSoldChanged: onAmountRequiredChanged,
	onRemove,
	showRemoveIcon = true,
}) => {
	const [amountSoldState, setAmountSoldState] = useState<number>(amountSold);

	return (
		<div className={styles['product-item']} key={product.id}>
			<div className="name label-text">
				<span className={styles['product-title']}>id:</span>
				<span className={styles['product-value']}>{product.id}</span>
			</div>
			<div className="name label-text">
				<span className={styles['product-title']}>name:</span>
				<span className={styles['product-value']}>{product.name}</span>
			</div>

			<div className="amountSold label-text">
				<div>
					<label className={styles['product-title'] + '  label-text'}>
						Amount sold:
					</label>
					<input
						type="number"
						name="amountRequired"
						id="amountRequired"
						value={amountSoldState}
						onChange={(e) => {
							const val = parseInt(e.target.value);
							setAmountSoldState(val);
							onAmountRequiredChanged(val);
						}}
					/>
				</div>
			</div>

			{showRemoveIcon && (
				<div
					className={styles.remove}
					onClick={() => onRemove(product)}
				>
					<Image
						className={styles.remove}
						src="/remove_circle_black.svg"
						alt=""
						width={30}
						height={30}
					/>
				</div>
			)}
		</div>
	);
};

export default SaleProductListItem;
