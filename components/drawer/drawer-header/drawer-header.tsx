import Image from 'next/image';
import { FC } from 'react';

import styles from './drawer-header.module.scss';

export const DrawerHeader: FC<{
	onClose: () => void;
	onSave: () => void;
	onDelete: () => void;
	isLoading: boolean;
	showDeleteButton: boolean;
	disableSaveButton?: boolean;
	disableDeleteButton?: boolean;
}> = ({
	onClose,
	onSave,
	onDelete,
	isLoading,
	showDeleteButton,
	disableSaveButton = false,
	disableDeleteButton = false,
}) => {
	return (
		<div className={styles['drawer-header']}>
			<div className={styles['close']} onClick={onClose}>
				<Image src="/close.svg" alt="" width={30} height={30} />
			</div>

			<div className={styles['drawer-title']}></div>

			<button
				className={
					styles['drawer-btn'] +
					' ' +
					styles['drawer-save-button'] +
					' btn-primary'
				}
				onClick={onSave}
				disabled={isLoading || disableSaveButton}
			>
				{isLoading && (
					<Image src="/rings.svg" alt="" width={40} height={40} />
				)}
				{!isLoading && 'Save'}
			</button>

			{showDeleteButton && (
				<button
					className={
						styles['drawer-btn'] +
						' ' +
						styles['drawer-delete-button'] +
						' btn-primary'
					}
					onClick={onDelete}
					disabled={isLoading || disableDeleteButton}
				>
					{isLoading && (
						<Image src="/rings.svg" alt="" width={40} height={40} />
					)}
					{!isLoading && 'Delete'}
				</button>
			)}
		</div>
	);
};
