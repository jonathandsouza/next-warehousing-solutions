import { FC, useRef } from 'react'
import styles from './tool-bar.module.scss'

export const Toolbar: FC<{ onSearch: (id: string) => void }> = ({
	onSearch,
}) => {
	const ref = useRef()

	const search = () => {
		onSearch((document.getElementById('search') as any).value || '')
	}

	return (
		<div className={styles['tool-bar-container']}>
			<input
				className={styles['search-bar']}
				type="text"
				name="search"
				id="search"
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						search()
					}
				}}
			/>
			<button className={styles['search-button']} onClick={search}>
				search
			</button>
		</div>
	)
}
