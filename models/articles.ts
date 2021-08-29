interface IArticle {
	id: string
	name: string
	amountInStock: number
}

export interface IArticleService {
	getAllArticles(): Promise<Array<IArticle>>
	createArticle(
		params: Pick<IArticle, 'name' | 'amountInStock'>
	): Promise<IArticle>
	getArticleById(id: string): Promise<IArticle>
	updateArticles(articles: Array<IArticle>): Promise<Array<IArticle>>
	removeArticleById(id: string): Promise<boolean>
}

export default IArticle
