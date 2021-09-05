import type { AppProps } from 'next/app';
import React from 'react';
import { NavBar } from '../components/nav-bar/nav-bar';

import '../styles/globals.scss';
import '../styles/drawer.scss';
import '../styles/forms.scss';
import '../styles/buttons.scss';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NavBar />
			<main>
				<Component {...pageProps} />
			</main>

			<div style={{ zIndex: 1000 }}>
				<ToastContainer />
			</div>
		</>
	);
}
export default MyApp;
