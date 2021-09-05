import { IProductService } from '../models/products';
import environment from './environment';
import fetchAPI, { fetchDELETE, fetchPATCH, fetchPOST } from './fetch';

const ProductService: IProductService = {
	getAllProducts() {
		return fetchAPI(environment.getEndPointURL() + 'products');
	},

	getProductById(id) {
		return fetchAPI(environment.getEndPointURL() + 'products/' + id);
	},

	removeProductById(id) {
		return fetchDELETE(environment.getEndPointURL() + 'products/' + id);
	},

	updateProduct(product) {
		return fetchPATCH(
			environment.getEndPointURL() + 'products/' + product.id,
			product
		);
	},

	createProduct(product) {
		return fetchPOST(environment.getEndPointURL() + 'products', product);
	},
};

export default ProductService;
