import '../styles/globals.scss'
import 'normalize.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main>
			<Component {...pageProps} />
		</main>
	)
}
export default MyApp
