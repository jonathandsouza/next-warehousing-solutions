import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://fonts.googleapis.com/css?family=Product+Sans:400|Google+Sans:400,500,700|Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic&amp;subset=cyrillic,cyrillic-ext,latin,greek,latin-ext,vietnamese&display=optional"
						nonce=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Material+Icons&display=optional"
						rel="stylesheet"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
