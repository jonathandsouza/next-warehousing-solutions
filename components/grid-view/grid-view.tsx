import React, { FC, useEffect } from 'react';
import IArticle from '../../models/articles';
import { IProduct } from '../../models/products';
import viewport from '../../services/viewport';
import styles from './grid-view.module.scss';

export const GridView: FC<{
	card: (content: any) => JSX.Element;
	contents: Array<IArticle | IProduct>;
}> = ({ contents, card }) => {
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
			{contents.map((e, index) => {
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
