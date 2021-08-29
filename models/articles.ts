interface IArticle {
	id: string
	name: string
	amountInStock: number
}

export interface IArticleService {
	getAllArticles(): Promise<Array<IArticle>>
	createArticle(): Promise<boolean>
	getArticleById(id: string): Promise<IArticle>
	updateArticles(articles: Array<IArticle>): Promise<boolean>
	removeArticleById(id: string): Promise<boolean>
}

export default IArticle
