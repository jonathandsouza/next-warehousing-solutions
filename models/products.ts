import IArticle from './articles';

export type IProductArticle = {
	id: string;
	amountRequired: number;
} & Partial<IArticle>;

export interface IProduct {
	id: string;
	name: string;
	articles: Array<IProductArticle>;
}

export interface IProductService {
	getAllProducts(): Promise<Array<IProduct>>;
	getProductById(id: string): Promise<IProduct>;
	updateProduct(products: IProduct): Promise<boolean>;
	removeProductById(id: string): Promise<boolean>;
	createProduct(
		product: Pick<IProduct, 'name' | 'articles'>
	): Promise<IProduct>;
}
