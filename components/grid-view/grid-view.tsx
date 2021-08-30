import { FC, useEffect } from 'react'
import styles from './grid-view.module.scss'

const content = [
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
	'Orange is the new black',
]

export const GridView: FC<{}> = () => {
	useEffect(() => {
		const tiles = document.querySelectorAll('.tile')

		tiles.forEach((tile) => {
			tile.addEventListener('mouseover', (e) => {
				let reachedTarget = false

				for (let i = 0; i < tiles.length; i++) {
					if (tiles[i] == e.currentTarget) {
						reachedTarget = true
						continue
					}

					tiles[i].classList.add(styles['darker'])
				}
			})

			tile.addEventListener('mouseout', () => {
				for (let i = 0; i < tiles.length; i++) {
					tiles[i].classList.remove(styles['darker'])
				}
			})
		})
	}, [])

	return (
		<>
			<div className={styles['row']}>
				{content.map((e, index) => {
					return (
						<div key={index} className={'tile ' + styles['tile']}>
							<div className={styles['overlay']}></div>
						</div>
					)
				})}
			</div>
		</>
	)
}
