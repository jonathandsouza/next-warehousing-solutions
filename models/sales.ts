import { IProduct } from './products';

interface ISale {
	id: string;
	createdAt: Date;
	productId: string;
	amountSold: number;
	productDetails?: IProduct;
}

export interface ISaleService {
	getAllSales(): Promise<Array<ISale>>;
	createSale(
		sale: Pick<ISale, 'productId' | 'amountSold' | 'createdAt'>
	): Promise<ISale>;
	getSaleById(id: string): Promise<ISale>;
	updateSale(sale: ISale): Promise<boolean>;
	deleteSale(id: string): Promise<boolean>;
}

export default ISale;
