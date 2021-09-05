import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './nav-bar.module.scss';
import { useRouter } from 'next/router';
import { PAGES } from '../../models/pages';
import Drawer from 'rc-drawer';
import viewport from '../../services/viewport';

export const NavBar = () => {
	const [activePage, setActivePage] = useState<PAGES>(PAGES.ARTICLES);
	const [isMobile, setIsMobile] = useState(false);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	router;

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			if (url.indexOf('products') !== -1) {
				setActivePage(PAGES.PRODUCTS);
			} else if (url.indexOf('sales') !== -1) {
				setActivePage(PAGES.SALES);
			} else {
				setActivePage(PAGES.ARTICLES);
			}
			setOpen(false);
		};

		router.events.on('routeChangeStart', handleRouteChange);
		handleRouteChange(location.href);

		const { isMobile } = viewport.getViewport();
		setIsMobile(isMobile);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
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
					className={[styles['nav-bar-list'], 'hidden-mobile'].join(
						' '
					)}
					role="tablist"
					aria-label="Top level navigation"
				>
					<li
						className={
							(activePage === PAGES.ARTICLES
								? styles.active
								: '') + ' hidden-mobile'
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
							activePage === PAGES.PRODUCTS ? styles.active : ''
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
							activePage === PAGES.SALES ? styles.active : ''
						}
						role="presentation"
					>
						<Link href="/sales">
							<a
								className={styles['nav-link']}
								aria-label="Sales"
							>
								<span className={styles['nav-link-text']}>
									Sales
								</span>
							</a>
						</Link>
					</li>
				</ul>

				<div
					className={styles['desktop-avatar'] + ' ' + 'hidden-mobile'}
				></div>
			</nav>

			{isMobile && (
				<Drawer
					level={null}
					open={open}
					onHandleClick={() => setOpen(!open)}
					placement={'left'}
					width={'80vw'}
					height={'100vh'}
					className="drawer1"
				>
					<div className={styles['avatar-container']}>
						<div className={styles['avatar']}></div>
					</div>

					<div className={styles['mobile-menu']}>
						<div
							className={
								styles['mobile-menu-item'] +
								' ' +
								(activePage === PAGES.ARTICLES
									? styles['active-mobile-menu-item']
									: '')
							}
						>
							<Link href="/">
								<a>Articles</a>
							</Link>
						</div>

						<div
							className={
								styles['mobile-menu-item'] +
								' ' +
								(activePage === PAGES.PRODUCTS
									? styles['active-mobile-menu-item']
									: '')
							}
						>
							<Link href="/products">
								<a>Products</a>
							</Link>
						</div>

						<div
							className={
								styles['mobile-menu-item'] +
								' ' +
								(activePage === PAGES.SALES
									? styles['active-mobile-menu-item']
									: '')
							}
						>
							<Link href="/sales">
								<a>Sales</a>
							</Link>
						</div>
					</div>
				</Drawer>
			)}
		</>
	);
};
