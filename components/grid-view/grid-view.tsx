import React, { FC, useEffect } from 'react';
import IArticle from '../../models/articles';
import { IProduct } from '../../models/products';
import ISale from '../../models/sales';
import viewport from '../../services/viewport';
import styles from './grid-view.module.scss';

export const GridPlaceholderCard = () => (
	<div className={styles['grid-placeholder-card']}></div>
);

export const GridView: FC<{
	card: (content: any) => JSX.Element;
	contents: Array<IArticle | IProduct | ISale | any>;
}> = ({ contents, card }) => {
	card = card || GridPlaceholderCard;

	useEffect(() => {
		if (viewport.getViewport().isDesktop) {
			const tiles = document.querySelectorAll('.tile');

			tiles.forEach((tile) => {
				tile.addEventListener('mouseover', (e) => {
					let reachedTarget = false;

					for (let i = 0; i < tiles.length; i++) {
						if (tiles[i] == e.currentTarget) {
							reachedTarget = true;
							continue;
						}

						tiles[i].classList.add(styles['darker']);
					}
				});

				tile.addEventListener('mouseout', () => {
					for (let i = 0; i < tiles.length; i++) {
						tiles[i].classList.remove(styles['darker']);
					}
				});
			});
		}
	}, []);

	return (
		<div className={styles['row']}>
			{card &&
				contents.map((e, index) => {
					return (
						<div key={index} className={'tile ' + styles['tile']}>
							{card({ content: e })}
							<div className={styles['overlay']}>
								{card({ content: e })}
							</div>
						</div>
					);
				})}
		</div>
	);
};
