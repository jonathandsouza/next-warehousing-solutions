import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import SalesList from '../components/sales-list/sales-list';

const Sales: NextPage = () => {
	return (
		<>
			<Head>
				<title>Next Warehousing solutions.</title>
				<meta name="description" content="warehouse sales" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container-fluid">
				<SalesList />
			</div>
		</>
	);
};

export default Sales;
