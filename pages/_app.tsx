import type { AppProps } from 'next/app'
import React from 'react'
import { NavBar } from '../components/nav-bar/nav-bar'

import '../styles/globals.scss'
import 'normalize.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NavBar />
			<main>
				<Component {...pageProps} />
			</main>
		</>
	)
}
export default MyApp
