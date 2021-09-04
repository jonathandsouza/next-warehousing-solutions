interface IArticle {
	id: string;
	name: string;
	amountInStock: number;
}

export interface IArticleService {
	getAllArticles(): Promise<Array<IArticle>>;
	createArticle(
		params: Pick<IArticle, 'name' | 'amountInStock'>
	): Promise<string>;
	getArticleById(id: string): Promise<IArticle>;
	updateArticles(articles: Array<IArticle>): Promise<Array<IArticle>>;
	removeArticleById(id: string): Promise<boolean>;
	getArticleByIds(ids: Array<string>): Promise<Array<IArticle>>;
}

export default IArticle;
