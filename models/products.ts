import IArticle from './articles'

interface IProduct {
	id: string
	name: string
	articles: Array<IArticle>
}

export interface IProductService {
	getAllProducts(): Promise<Array<IProduct>>
	getProductById(id: string): Promise<IProduct>
	updateProducts(products: Array<IProduct>): Promise<boolean>
	removeProductById(id: string): Promise<boolean>
}
