import { FC, useRef } from 'react'
import styles from './tool-bar.module.scss'

export const Toolbar: FC<{ onSearch: (id: string) => void }> = ({
	onSearch,
}) => {
	const ref = useRef()

	return (
		<div className={styles['tool-bar-container']}>
			<input
				className={styles['search-bar']}
				type="text"
				name="search"
				id="search"
			/>
			<button
				className={styles['search-button']}
				onClick={(e) =>
					onSearch(
						(document.getElementById('search') as any).value || ''
					)
				}
			>
				search by ID
			</button>
		</div>
	)
}
