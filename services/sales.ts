import ISale, { ISaleService } from '../models/sales';
import DateTimeService from './date-time';
import environment from './environment';
import fetchAPI, { fetchDELETE, fetchPATCH, fetchPOST } from './fetch';

const mapper: (resp: any) => ISale = (resp: any) => ({
	id: resp.id,
	createdAt: DateTimeService.mysqlStrToDate(resp.createdAt),
	product: {
		id: resp.productId,
		amountSold: resp.amountSold,
		articles: [],
		name: '',
	},
});

const SalesService: ISaleService = {
	getAllSales() {
		return fetchAPI(environment.getEndPointURL() + 'sales').then(
			(response) => {
				return response.map(mapper);
			}
		);
	},

	getSaleById(id) {
		return fetchAPI(environment.getEndPointURL() + 'sales/' + id).then(
			mapper
		);
	},

	updateSale(sales) {
		return fetchPATCH(
			environment.getEndPointURL() + 'sales/' + sales.id,
			sales
		);
	},

	createSale(product) {
		return fetchPOST(environment.getEndPointURL() + 'sales', {
			productId: product.id,
			amountSold: product.amountSold,
		}).then((resp) => ({
			createdAt: DateTimeService.mysqlStrToDate(resp.createdAt),
			id: resp.id,
			product: {
				id: resp.productId,
				amountSold: resp.amountSold,
				articles: [],
				name: '',
			},
		}));
	},

	deleteSale: function (id: string): Promise<boolean> {
		return fetchDELETE(environment.getEndPointURL() + 'sales/' + id);
	},
};

export default SalesService;
