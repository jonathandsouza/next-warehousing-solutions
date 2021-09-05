import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import ArticlesList from '../components/articles-list/articles-list';

const Articles: NextPage = () => {
	return (
		<>
			<Head>
				<title>Next Warehousing solutions.</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container-fluid">
				<ArticlesList />
			</div>
		</>
	);
};

export default Articles;
