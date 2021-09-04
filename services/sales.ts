import { ISaleService } from '../models/sales';
import environment from './environment';
import fetchAPI, { fetchDELETE, fetchPATCH, fetchPOST } from './fetch';

const SalesService: ISaleService = {
	getAllSales() {
		return fetchAPI(environment.getEndPointURL() + 'sales');
	},

	getSaleById(id) {
		return fetchAPI(environment.getEndPointURL() + 'sales/' + id);
	},

	updateSale(sales) {
		return fetchPATCH(
			environment.getEndPointURL() + 'sales/' + sales.id,
			sales
		);
	},

	createSale(sales) {
		return fetchPOST(environment.getEndPointURL() + 'sales', sales);
	},

	deleteSale: function (id: string): Promise<boolean> {
		return fetchDELETE(environment.getEndPointURL() + 'sales/' + id);
	},
};

export default SalesService;
