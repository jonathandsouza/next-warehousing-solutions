import { FC } from 'react';
import styles from './failed-to-fetch.module.scss';

export const FailedToFetch: FC<{ onRefetchClick: () => void }> = ({
	onRefetchClick,
}) => {
	return (
		<div className={styles['failed-to-fetch-warning']}>
			<span>Failed to fetch 😢</span>
			<button
				className={styles['fetch-btn']}
				onClick={() => onRefetchClick()}
			>
				fetch again!
			</button>
		</div>
	);
};
