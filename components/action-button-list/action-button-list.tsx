import { FC } from 'react';

import styles from './action-button-list.module.scss';

const ActionButtonList: FC<{
	onAddClick: () => void;
	onReloadClick: () => void;
	disabled: boolean;
	addText: string;
}> = ({ onAddClick, onReloadClick, disabled, addText }) => {
	return (
		<div className={styles['button-list']}>
			<button
				className="btn-primary"
				disabled={disabled}
				onClick={() => onAddClick()}
			>
				{addText}
			</button>

			<button
				className="btn-primary"
				disabled={disabled}
				onClick={() => onReloadClick()}
			>
				Reload
			</button>
		</div>
	);
};

export default ActionButtonList;
