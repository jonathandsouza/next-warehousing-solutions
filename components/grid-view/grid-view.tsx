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
					// check if current tile is hovered
					if (tiles[i] == e.currentTarget) {
						reachedTarget = true
						continue
					}

					// make other tiles darker
					tiles[i].classList.add('darker')
				}
			})

			tile.addEventListener('mouseout', () => {
				// move all tiles back to initial position
				for (let i = 0; i < tiles.length; i++) {
					tiles[i].classList.remove('shiftLeft')
					tiles[i].classList.remove('shiftRight')
					tiles[i].classList.remove('darker')
				}
			})
		})
	}, [])

	return (
		<>
			<div className={'row'}>
				{content.map((e, index) => {
					return (
						<div key={index} className={'tile'}>
							<div className={'overlay'}></div>
						</div>
					)
				})}
			</div>
		</>
	)
}
