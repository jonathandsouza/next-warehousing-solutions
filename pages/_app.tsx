import type { AppProps } from 'next/app'
import React from 'react'
import { NavBar } from '../components/nav-bar/nav-bar'

import '../styles/globals.scss'
import '../styles/drawer.scss'
import '../styles/forms.scss'
import 'normalize.css'
import 'react-toastify/dist/ReactToastify.css'

import { MainLoader } from '../components/main-loader/main-loader'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<div style={{ zIndex: 1000 }}>
				<ToastContainer />
			</div>
			<NavBar />
			<main>
				<Component {...pageProps} />
			</main>

			<MainLoader />
		</>
	)
}
export default MyApp
