import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './nav-bar.module.scss'
import { useRouter } from 'next/router'
import { PAGES } from '../../models/pages'

export const NavBar = () => {
	const [activePage, setActivePage] = useState<PAGES>(PAGES.ARTICLES)

	const router = useRouter()

	router

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			debugger
			if (url.indexOf('products') !== -1) {
				setActivePage(PAGES.PRODUCTS)
			} else if (url.indexOf('sales') !== -1) {
				setActivePage(PAGES.SALES)
			} else {
				setActivePage(PAGES.ARTICLES)
			}
		}

		router.events.on('routeChangeStart', handleRouteChange)
		handleRouteChange(location.href)

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [router.events])

	return (
		<nav role="navigation" className={styles.navbar}>
			<Link href="/">
				<a>
					<div className={styles.branding}>
						<div className={styles.icon}>
							<Image
								src="/icon.svg"
								alt="Landscape picture"
								width={50}
								height={50}
							/>
						</div>
						<div className={styles['brand-name']}>
							Next Warehousing
						</div>
					</div>
				</a>
			</Link>

			<ul
				className={[styles['nav-bar-list'], 'hidden-mobile'].join(' ')}
				role="tablist"
				aria-label="Top level navigation"
			>
				<li
					className={
						styles['nav-item'] +
						' ' +
						(activePage === PAGES.ARTICLES ? styles.active : '') +
						' hidden-mobile'
					}
					role="presentation"
				>
					<Link href="/">
						<a className={'nav-link'} aria-label="Sales">
							<span className={styles['nav-link-text']}>
								Articles
							</span>
						</a>
					</Link>
				</li>
				<li
					className={
						styles['nav-item'] +
						' ' +
						(activePage === PAGES.PRODUCTS ? styles.active : '')
					}
					role="presentation"
				>
					<Link href="/products">
						<a
							className={styles['nav-link']}
							aria-label="Workspace"
						>
							<span className={styles['nav-link-text']}>
								Products
							</span>
						</a>
					</Link>
				</li>
				<li
					className={
						styles['nav-item'] +
						' ' +
						(activePage === PAGES.SALES ? styles.active : '')
					}
					role="presentation"
				>
					<Link href="/sales">
						<a className={styles['nav-link']} aria-label="Sales">
							<span className={styles['nav-link-text']}>
								Sales
							</span>
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}
