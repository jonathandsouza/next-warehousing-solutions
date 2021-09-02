import type { AppProps } from 'next/app'
import React from 'react'
import { NavBar } from '../components/nav-bar/nav-bar'

import '../styles/globals.scss'
import '../styles/drawer.scss'
import '../styles/forms.scss'
import 'normalize.css'

import { MainLoader } from '../components/main-loader/main-loader'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NavBar />
			<main>
				<Component {...pageProps} />
			</main>

			<MainLoader />
		</>
	)
}
export default MyApp
