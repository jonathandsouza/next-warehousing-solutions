import '../styles/globals.scss'
import 'normalize.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<nav role="navigation">
				<ul
					className="_md-nav-bar-list"
					role="tablist"
					aria-label="Top level navigation"
				>
					<li
						className="md-nav-item"
						role="presentation"
						data-md-nav-href="#/container/accounts/112031/containers/126673"
					>
						<a
							className="_md-nav-button md-accent md-button md-gtm-theme md-ink-ripple md-active md-primary"
							aria-label="Workspace"
						>
							<span
								ng-transclude=""
								className="_md-nav-button-text"
							>
								{' '}
								Workspace{' '}
							</span>
						</a>
					</li>
					<li
						className="md-nav-item"
						role="presentation"
						data-md-nav-href="#/versions/accounts/112031/containers/126673/versions"
						data-name="versions"
					>
						<a
							className="_md-nav-button md-accent md-button md-gtm-theme md-ink-ripple md-unselected"
							tabIndex="-1"
							role="tab"
							aria-selected="false"
							ng-href="#/versions/accounts/112031/containers/126673/versions"
							href="#/versions/accounts/112031/containers/126673/versions"
							aria-label="Versions"
						>
							<span
								ng-transclude=""
								className="_md-nav-button-text"
							>
								Versions
							</span>
						</a>
					</li>
					<li
						className="md-nav-item"
						role="presentation"
						data-md-nav-href="#/admin/?accountId=112031&amp;containerId=126673"
						data-name="admin"
					>
						<a
							className="_md-nav-button md-accent md-button md-gtm-theme md-ink-ripple md-unselected"
							ng-transclude=""
							ng-className="ctrl.getNgClassMap()"
							ng-blur="ctrl.setFocused(false)"
							ng-disabled="ctrl.disabled"
							tabIndex="-1"
							role="tab"
							aria-selected="false"
							ng-href="#/admin/?accountId=112031&amp;containerId=126673"
							href="#/admin/?accountId=112031&amp;containerId=126673"
							aria-label="Admin"
						>
							<span
								ng-transclude=""
								className="_md-nav-button-text"
							>
								{' '}
								Admin{' '}
							</span>
						</a>
					</li>
				</ul>
			</nav>

			<main>
				<Component {...pageProps} />
			</main>
		</>
	)
}
export default MyApp
