import styles from './main-loader.module.scss'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import LoaderContext from '../../services/loader'

export const MainLoader = observer(() => {
	const context = useContext(LoaderContext)

	useEffect(() => {
		if (context.show) {
			document.getElementsByTagName('main')[0].style.opacity = '0.1'
		} else {
			document.getElementsByTagName('main')[0].style.opacity = '1'
		}
	}, [context.show])

	if (!context.show) {
		return null
	}

	return (
		<div className={styles.container}>
			<Image src="/rings.svg" alt="" width={200} height={200} />
			<p>Loading...</p>
		</div>
	)
})
