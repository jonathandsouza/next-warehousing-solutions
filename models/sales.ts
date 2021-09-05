import { IProduct } from './products';

export type ISaleProduct = {
	amountSold: number;
} & IProduct;
interface ISale {
	id: string;
	createdAt: Date;
	product: ISaleProduct;
}

export interface ISaleService {
	getAllSales(): Promise<Array<ISale>>;
	createSale(
		product: Pick<ISaleProduct, 'id' | 'amountSold'>
	): Promise<ISale>;
	getSaleById(id: string): Promise<ISale>;
	updateSale(sale: ISale): Promise<boolean>;
	deleteSale(id: string): Promise<boolean>;
}

export default ISale;
